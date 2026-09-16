/** Body of the IIIF viewer page; the element IDs are the contract with tools/iiif-viewer/app.js. */
export function viewerPage() {
  return `<div class="hero session">
<p class="eyebrow">Hands-on tool · Session 1</p>
<h1>From XML to IIIF viewer</h1>
</div>
<section class="controls" aria-label="Open your digital object">
<p class="lead">Select your XML description or generated IIIF manifest and its page images to see them as a digital object in Mirador. The files stay in your browser.</p>
<form id="upload-form">
<div class="inputs">
<label><span>1. Metadata</span><small>metadata.xml or manifest.json</small><input id="metadata" type="file" accept=".xml,.json,application/json,text/xml,application/xml" required></label>
<label><span>2. Page images</span><small>Select all referenced images together</small><input id="images" type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple required></label>
</div>
<div class="actions"><button type="submit" class="button">Open in Mirador</button><button id="demo" type="button" class="button secondary">Try the example</button></div>
</form>
<p id="status" role="status" aria-live="polite">Start with the example, or choose your own files above.</p>
<p class="small rule">Each <code>&lt;page xlink:href="…"/&gt;</code> in the XML must name one of the selected images. The XML order sets the page order, and reloading the page clears the object.</p>
</section>
<section id="result" hidden aria-label="Your object in Mirador">
<div class="result-heading"><h2 id="object-title">Your digital object</h2><p id="page-count"></p></div>
<p id="mapping" class="small"></p>
<div id="mirador"></div>
</section>`;
}
