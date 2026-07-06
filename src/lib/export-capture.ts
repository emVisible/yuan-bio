import html2canvas from "html2canvas";
import { fixModernColorsForHtml2Canvas } from "./html2canvas-colors";

const CAPTURE_SCALE = 2;

function parseBorderRadiusPx(raw: string, boxW: number, boxH: number): number {
  const value = raw.trim();
  if (!value || value === "0" || value === "0px") return 0;
  if (value.endsWith("%")) {
    const pct = parseFloat(value);
    if (!Number.isFinite(pct)) return 0;
    return (Math.min(boxW, boxH) / 2) * (pct / 100);
  }
  const px = parseFloat(value);
  if (!Number.isFinite(px)) return 0;
  const cap = Math.min(boxW, boxH) / 2;
  if (px >= 999) return cap;
  return Math.min(px, cap);
}

function readElementSize(el: HTMLElement): { w: number; h: number } {
  const w = Math.round(el.offsetWidth) || Math.round(el.getBoundingClientRect().width);
  const h = Math.round(el.offsetHeight) || Math.round(el.getBoundingClientRect().height);
  return { w, h };
}

function readRadiusFromElement(el: HTMLElement, boxW: number, boxH: number): number {
  if (el.style.borderRadius) return parseBorderRadiusPx(el.style.borderRadius, boxW, boxH);
  const computed = window.getComputedStyle(el).borderRadius;
  return parseBorderRadiusPx(computed, boxW, boxH);
}

function copyPhotoChrome(from: HTMLElement, to: HTMLCanvasElement, radius: number): void {
  if (radius > 0) to.style.borderRadius = `${radius}px`;
  if (from.style.border) to.style.border = from.style.border;
  else {
    const border = window.getComputedStyle(from).border;
    if (border && border !== "none" && !border.startsWith("0px")) to.style.border = border;
  }
  if (from.style.boxShadow) to.style.boxShadow = from.style.boxShadow;
  else {
    const shadow = window.getComputedStyle(from).boxShadow;
    if (shadow && shadow !== "none") to.style.boxShadow = shadow;
  }
}

function photoExportFrame(img: HTMLImageElement): HTMLElement {
  const parent = img.parentElement;
  if (parent?.tagName === "DIV" && parent.dataset.exportPhoto === "true") return parent;
  return img;
}

function clipRoundRect(ctx: CanvasRenderingContext2D, w: number, h: number, radius: number): void {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(w, 0, w, h, r);
  ctx.arcTo(w, h, 0, h, r);
  ctx.arcTo(0, h, 0, 0, r);
  ctx.arcTo(0, 0, w, 0, r);
  ctx.closePath();
  ctx.clip();
}

function readBorderRadius(img: HTMLImageElement, boxW: number, boxH: number): number {
  const frame = photoExportFrame(img);
  if (frame !== img) return readRadiusFromElement(frame, boxW, boxH);
  return readRadiusFromElement(img, boxW, boxH);
}

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

/** Read logical pixel size — never use offset* when transform is on an ancestor. */
export function getExportSize(element: HTMLElement): { width: number; height: number } {
  const width = Number(element.dataset.exportWidth);
  const height = Number(element.dataset.exportHeight);
  if (width > 0 && height > 0) return { width, height };
  const styleW = parseInt(element.style.width, 10);
  const styleH = parseInt(element.style.height, 10);
  if (styleW > 0 && styleH > 0) return { width: styleW, height: styleH };
  throw new Error("invalid_element_size");
}

function prepareCloneTree(root: HTMLElement, width: number, height: number): void {
  root.style.boxSizing = "border-box";
  root.style.overflow = "hidden";
  root.style.width = `${width}px`;
  root.style.height = `${height}px`;
  root.style.minWidth = `${width}px`;
  root.style.minHeight = `${height}px`;
  root.style.maxWidth = `${width}px`;
  root.style.maxHeight = `${height}px`;
  root.style.transform = "none";
  root.style.transformOrigin = "top left";
}

function pinExportPhotoFrames(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>("[data-export-photo]").forEach((frame) => {
    const { w, h } = readElementSize(frame);
    if (w > 0 && h > 0) {
      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
      frame.style.flexShrink = "0";
    }
    const img = frame.querySelector("img");
    if (img) {
      const inner = readElementSize(img);
      if (inner.w > 0 && inner.h > 0) {
        img.style.width = `${inner.w}px`;
        img.style.height = `${inner.h}px`;
      }
    }
  });
}
function rasterizeImagesForExport(root: HTMLElement): void {
  root.querySelectorAll("img").forEach((node) => {
    const img = node as HTMLImageElement;
    if (!img.complete || img.naturalWidth <= 0) return;

    const frame = photoExportFrame(img);
    const { w, h } = readElementSize(frame);
    if (!w || !h) return;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = w / h;
    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (imgRatio > boxRatio) {
      sw = img.naturalHeight * boxRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / boxRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    const radius = readBorderRadius(img, w, h);

    if (radius > 0) {
      ctx.save();
      clipRoundRect(ctx, w, h, radius);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);

    if (radius > 0) ctx.restore();

    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.style.display = "block";
    canvas.style.flexShrink = "0";
    copyPhotoChrome(frame, canvas, radius);

    if (frame !== img) {
      frame.replaceWith(canvas);
    } else {
      img.replaceWith(canvas);
    }
  });
}

/** Crop or letterbox canvas to exact logical dimensions — prevents PDF/image stretch. */
function normalizeCanvasToSize(
  canvas: HTMLCanvasElement,
  logicalW: number,
  logicalH: number,
  transparent = false,
): HTMLCanvasElement {
  const targetW = Math.round(logicalW * CAPTURE_SCALE);
  const targetH = Math.round(logicalH * CAPTURE_SCALE);

  if (canvas.width === targetW && canvas.height === targetH) return canvas;

  const out = document.createElement("canvas");
  out.width = targetW;
  out.height = targetH;
  const ctx = out.getContext("2d");
  if (!ctx) return canvas;

  if (!transparent) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetW, targetH);
  }

  const srcRatio = canvas.width / canvas.height;
  const dstRatio = targetW / targetH;

  let drawW: number;
  let drawH: number;
  let dx: number;
  let dy: number;

  if (srcRatio > dstRatio) {
    drawW = targetW;
    drawH = Math.round(targetW / srcRatio);
    dx = 0;
    dy = Math.round((targetH - drawH) / 2);
  } else {
    drawH = targetH;
    drawW = Math.round(targetH * srcRatio);
    dx = Math.round((targetW - drawW) / 2);
    dy = 0;
  }

  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, dx, dy, drawW, drawH);
  return out;
}

/** Clone at native size without CSS transform — avoids vertical stretch in html2canvas. */
export async function captureElementToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const { width, height } = getExportSize(element);

  const mount = document.createElement("div");
  mount.setAttribute("aria-hidden", "true");
  mount.style.cssText = `position:fixed;left:-100000px;top:0;width:${width}px;height:${height}px;overflow:hidden;opacity:1;pointer-events:none;z-index:-1;`;

  const clone = element.cloneNode(true) as HTMLElement;
  prepareCloneTree(clone, width, height);

  mount.appendChild(clone);
  document.body.appendChild(mount);

  try {
    await waitForImages(clone);
    await nextFrame();

    let canvas = await html2canvas(clone, {
      scale: CAPTURE_SCALE,
      useCORS: true,
      allowTaint: true,
      backgroundColor: element.dataset.exportBg === "transparent" ? null : "#ffffff",
      logging: false,
      onclone: (doc, el) => {
        fixModernColorsForHtml2Canvas(el, doc);
        prepareCloneTree(el, width, height);
        pinExportPhotoFrames(el);
        rasterizeImagesForExport(el);
      },
    });

    if (canvas.width === 0 || canvas.height === 0) throw new Error("empty_canvas");
    const transparent = element.dataset.exportBg === "transparent";
    canvas = normalizeCanvasToSize(canvas, width, height, transparent);
    return canvas;
  } finally {
    mount.remove();
  }
}

export function canvasLogicalSize(canvas: HTMLCanvasElement): { width: number; height: number } {
  return {
    width: canvas.width / CAPTURE_SCALE,
    height: canvas.height / CAPTURE_SCALE,
  };
}

export async function waitForPreviewPaint(): Promise<void> {
  await nextFrame();
}
