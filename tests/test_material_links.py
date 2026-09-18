"""Exercise exported teaching links and the Google login-page failure case."""

import importlib.util
from email.message import Message
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    "links", ROOT / "scripts/check-material-links.py"
)
links = importlib.util.module_from_spec(spec)
spec.loader.exec_module(links)


def test_legacy_source_image_resolves_in_checkout() -> None:
    result = links.check_link(links.RAW + "downloads/schulnachricht.jpg")
    assert result["ok"]


@pytest.mark.parametrize("url", ["http://example.org/alice", "http://localhost:8000"])
def test_teaching_namespaces_are_not_availability_claims(url: str) -> None:
    assert links.check_link(url)["skipped"]


def test_200_html_is_not_a_pdf(monkeypatch: pytest.MonkeyPatch) -> None:
    class Response:
        status = 200
        url = "https://docs.google.com/presentation/d/example/export/pdf"
        headers = Message()
        headers["Content-Type"] = "text/html"

        def __enter__(self):
            return self

        def __exit__(self, *_):
            pass

        def read(self, _):
            return b"<html><title>Sign in</title></html>"

    monkeypatch.setattr(links, "urlopen", lambda *_args, **_kwargs: Response())
    assert not links.check_link(Response.url)["ok"]
