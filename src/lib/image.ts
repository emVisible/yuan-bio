const MAX_WIDTH = 800;
const MAX_BYTES = 400_000;
const JPEG_QUALITY = 0.82;

export async function compressImageFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("invalid_type");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("too_large");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas_error");

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let quality = JPEG_QUALITY;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);

  while (dataUrl.length > MAX_BYTES && quality > 0.4) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  return dataUrl;
}
