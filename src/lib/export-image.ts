import { captureElementToCanvas, waitForPreviewPaint } from "./export-capture";

export { waitForPreviewPaint };

/** Export preview DOM as PNG — 2× supersampling, no stretch. */
export async function exportElementToPng(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await captureElementToCanvas(element);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
