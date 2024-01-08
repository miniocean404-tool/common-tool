// 版本：3.11.174
import * as PDFJS from "pdfjs-dist";
import * as PDFViewer from "pdfjs-dist/web/pdf_viewer";
import PDFWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
const camps = new URL("/camps", location.href).href;
import sandbox from "pdfjs-dist/build/pdf.sandbox.min.js?url";

import "pdfjs-dist/web/pdf_viewer.css";
import "./index.scss";

PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker;

export async function renderPDFViewer(url: string) {
  const CMAP_PACKED = true;

  const ENABLE_XFA = true;
  const SEARCH_FOR = ""; // try "Mozilla";

  const eventBus = new PDFViewer.EventBus();
  const pdfLinkService = new PDFViewer.PDFLinkService({
    eventBus,
  });
  const pdfFindController = new PDFViewer.PDFFindController({
    eventBus,
    linkService: pdfLinkService,
  });

  const pdfScriptingManager = new PDFViewer.PDFScriptingManager({
    eventBus,
    sandboxBundleSrc: sandbox,
  });

  const root: HTMLDivElement = document.querySelector(".container")!;
  root.setAttribute("style", "position: absolute;left: 50%;transform: translateX(-50%);");

  const pdfViewer = new PDFViewer.PDFViewer({
    container: root,
    eventBus,
    linkService: pdfLinkService,
    findController: pdfFindController,
    scriptingManager: pdfScriptingManager,
    removePageBorders: true,
  });
  pdfLinkService.setViewer(pdfViewer);
  pdfScriptingManager.setViewer(pdfViewer);

  eventBus.on("pagesinit", function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = "auto";

    // We can try searching for things.
    if (SEARCH_FOR) {
      eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
    }
  });

  const loadingTask = PDFJS.getDocument({
    url,
    cMapUrl: camps,
    cMapPacked: CMAP_PACKED,
    enableXfa: ENABLE_XFA,
  });

  const pdfDocument = await loadingTask.promise;

  pdfViewer.setDocument(pdfDocument);
  pdfLinkService.setDocument(pdfDocument, null);
}
