"""Check course links and optional Markdown/PPTX exports without changing sources.

Run: uv run scripts/check-material-links.py [--source FILE ...] [--live]
Site-owned URLs resolve against the checkout unless --live is given. PDF exports
must return PDF bytes, not a successful HTML login page. Results go to .artifacts.
"""

import argparse
import json
import re
import sys
import zipfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

from lxml import etree, html

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://chpollin.github.io/summer-school-musicology-2026/"
RAW = "https://raw.githubusercontent.com/chpollin/summer-school-musicology-2026/main/"
HEADERS = {
    "User-Agent": "SummerSchoolMaterialCheck/1.0 (https://github.com/chpollin/summer-school-musicology-2026)"
}


def links_from_file(source: Path) -> set[str]:
    if source.suffix == ".pptx":
        links = set()
        with zipfile.ZipFile(source) as archive:
            for name in archive.namelist():
                if name.endswith(".rels"):
                    root = etree.fromstring(archive.read(name))
                    links.update(
                        item.get("Target", "")
                        for item in root
                        if item.get("TargetMode") == "External"
                    )
                elif re.fullmatch(r"ppt/slides/slide\d+\.xml", name):
                    root = etree.fromstring(archive.read(name))
                    for paragraph in root.iter(
                        "{http://schemas.openxmlformats.org/drawingml/2006/main}p"
                    ):
                        text = "".join(paragraph.itertext())
                        links.update(re.findall(r"https?://[^\s<>]+", text))
        return {url for url in links if url.startswith(("https://", "http://"))}
    text = source.read_text(encoding="utf-8")
    if source.suffix == ".html":
        tree = html.fromstring(text)
        return {
            value
            for _, attr, value, _ in tree.iterlinks()
            if attr in {"href", "src"} and value.startswith(("https://", "http://"))
        }
    # Ignore inline code and fenced examples; retain link targets and bare URLs.
    text = re.sub(r"```.*?```|`[^`]*`", "", text, flags=re.S)
    return {
        match.rstrip(".,;)") for match in re.findall(r"https?://[^\s<>\]\"]+", text)
    }


def check_link(url: str, live: bool = False) -> dict:
    hostname = urlsplit(url).hostname or ""
    if hostname in {"localhost", "127.0.0.1", "::1"} or any(
        hostname == domain or hostname.endswith("." + domain)
        for domain in ("example.org", "example.com", "example.net")
    ):
        return {
            "url": url,
            "ok": True,
            "skipped": True,
            "detail": "Local exercise URL or reserved example namespace",
        }
    for prefix in (SITE, RAW):
        if not live and url.startswith(prefix):
            relative = unquote(urlsplit(url).path[len(urlsplit(prefix).path) :])
            candidate = (ROOT / relative).resolve()
            if not candidate.is_relative_to(ROOT):
                return {"url": url, "ok": False, "detail": "Path escapes repository"}
            if candidate.is_dir():
                candidate /= "index.html"
            return {"url": url, "ok": candidate.is_file(), "detail": "checkout"}
    pdf = url.endswith("/export/pdf") or "export?format=pdf" in url
    try:
        with urlopen(Request(url, headers=HEADERS), timeout=35) as response:
            content_type = response.headers.get_content_type()
            prefix = response.read(4096)
            valid = not pdf or (
                content_type == "application/pdf" and prefix.startswith(b"%PDF-")
            )
            login = "accounts.google.com" in response.url
            return {
                "url": url,
                "ok": valid and not login,
                "status": response.status,
                "detail": content_type
                if valid and not login
                else "Expected public content; received login or invalid PDF",
            }
    except HTTPError as error:
        return {
            "url": url,
            "ok": False,
            "status": error.code,
            "detail": str(error.reason),
        }
    except (URLError, TimeoutError, OSError) as error:
        return {"url": url, "ok": False, "detail": str(error)}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, action="append", default=[])
    parser.add_argument(
        "--live",
        action="store_true",
        help="Check deployed site URLs instead of local files",
    )
    parser.add_argument(
        "--exports-only", action="store_true", help="Only the six Google PDF exports"
    )
    args = parser.parse_args()
    sources = [ROOT / "index.html", *args.source]
    urls = set().union(*(links_from_file(source) for source in sources))
    if args.exports_only:
        urls = {
            url
            for url in urls
            if url.endswith("/export/pdf") or "export?format=pdf" in url
        }
    if not urls:
        raise ValueError("No links found in the supplied material files")
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda url: check_link(url, args.live), sorted(urls)))
    for result in results:
        label = (
            "SKIPPED" if result.get("skipped") else "OK" if result["ok"] else "FAILED"
        )
        print(f"[{label}] {result['url']} ({result['detail']})")
    target = ROOT / ".artifacts" / "link-report.json"
    target.parent.mkdir(exist_ok=True)
    target.write_text(
        json.dumps(
            {
                "mode": "live" if args.live else "checkout",
                "sources": [str(p) for p in sources],
                "results": results,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    failures = sum(not result["ok"] for result in results)
    skipped = sum(bool(result.get("skipped")) for result in results)
    print(
        f"[SUMMARY] {len(results)} links, {skipped} examples skipped, {failures} unresolved; {target}"
    )
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
