// 版本：3.11.174
import * as PDFJS from "pdfjs-dist";
import * as PDFViewer from "pdfjs-dist/web/pdf_viewer";
import PDFWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
const camps = new URL("/camps", location.href).href;
import sandbox from "pdfjs-dist/build/pdf.sandbox.min.js?url";

import "pdfjs-dist/web/pdf_viewer.css";
import "./index.scss";

PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker;

export async function renderPDFViewer(url: string, root: HTMLDivElement) {
  // 必须设置 root 容器 的 height:100% overflow-y: scroll; 才能使用 PDFViewer 中的超链接跳转
  root.setAttribute(
    "style",
    "position: absolute;left: 50%;transform: translateX(-50%);overflow-y: scroll;height:100%;",
  );

  const CMAP_PACKED = true;

  const ENABLE_XFA = true;
  const SEARCH_FOR = ""; // try "Mozilla";

  const eventBus = new PDFViewer.EventBus();

  // 超链接跳转
  const pdfLinkService = new PDFViewer.PDFLinkService({
    eventBus,
  });

  // 搜索控制器
  const pdfFindController = new PDFViewer.PDFFindController({
    eventBus,
    linkService: pdfLinkService,
  });

  const pdfScriptingManager = new PDFViewer.PDFScriptingManager({
    eventBus,
    sandboxBundleSrc: sandbox,
  });

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
    pdfViewer.currentScaleValue = "page-width" || "auto";

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
