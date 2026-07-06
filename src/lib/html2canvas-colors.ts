/** html2canvas 1.x cannot parse lab()/oklch()/lch() — Tailwind CSS 4 emits these. */

const UNSUPPORTED_COLOR_FN = /(?:lab|oklch|lch|color-mix)\(/i;

function normalizeCssColor(value: string, doc: Document): string {
  if (!value || value === "transparent" || value === "none") return value;
  if (!UNSUPPORTED_COLOR_FN.test(value)) return value;

  const canvas = doc.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";

  try {
    ctx.fillStyle = "#000000";
    ctx.fillStyle = value;
    const normalized = ctx.fillStyle;
    if (typeof normalized === "string" && !UNSUPPORTED_COLOR_FN.test(normalized)) {
      return normalized;
    }
  } catch {
    // fall through
  }
  return "#000000";
}

function hasUnsupportedColor(value: string | null | undefined): boolean {
  return Boolean(value && value !== "none" && UNSUPPORTED_COLOR_FN.test(value));
}

/**
 * Walk a cloned DOM tree and replace modern color functions with hex/rgb
 * that html2canvas can parse.
 */
export function fixModernColorsForHtml2Canvas(root: HTMLElement, doc: Document): void {
  const view = doc.defaultView;
  if (!view) return;

  const colorProps = [
    "color",
    "background-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "outline-color",
    "text-decoration-color",
    "caret-color",
  ] as const;

  const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];

  for (const el of nodes) {
    const computed = view.getComputedStyle(el);

    for (const prop of colorProps) {
      const raw = computed.getPropertyValue(prop);
      if (hasUnsupportedColor(raw)) {
        el.style.setProperty(prop, normalizeCssColor(raw, doc));
      }
    }

    const bgColor = computed.backgroundColor;
    if (hasUnsupportedColor(bgColor)) {
      el.style.backgroundColor = normalizeCssColor(bgColor, doc);
    }

    const bgImage = computed.backgroundImage;
    if (hasUnsupportedColor(bgImage)) {
      el.style.backgroundImage = "none";
      const solid =
        bgColor && bgColor !== "rgba(0, 0, 0, 0)" && !hasUnsupportedColor(bgColor)
          ? bgColor
          : normalizeCssColor(bgColor || "#ffffff", doc);
      el.style.backgroundColor = solid;
    }

    if (hasUnsupportedColor(computed.boxShadow)) {
      el.style.boxShadow = "none";
    }

    if (hasUnsupportedColor(computed.textShadow)) {
      el.style.textShadow = "none";
    }

    // Tailwind ring-* uses box-shadow; outline may also contain lab()
    if (hasUnsupportedColor(computed.outlineColor)) {
      el.style.outlineColor = normalizeCssColor(computed.outlineColor, doc);
    }
  }
}
