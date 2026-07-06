import { jsPDF } from "jspdf";
import { captureElementToCanvas, canvasLogicalSize, getExportSize } from "./export-capture";

/** Export preview DOM as PDF — exact pixel dimensions, no stretch. */
export async function exportElementToPdf(element: HTMLElement, filename: string): Promise<void> {
  const { width, height } = getExportSize(element);
  const canvas = await captureElementToCanvas(element);
  const imgData = canvas.toDataURL("image/png");
  const logical = canvasLogicalSize(canvas);

  const pageW = logical.width;
  const pageH = logical.height;

  const pdf = new jsPDF({
    orientation: pageW >= pageH ? "landscape" : "portrait",
    unit: "px",
    format: [pageW, pageH],
    compress: true,
  });

  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH, undefined, "FAST");
  pdf.save(filename);
}
