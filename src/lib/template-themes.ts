import type { ResumeTemplateId } from "./types";

export interface TemplateTheme {
  id: ResumeTemplateId;
  pageBg: string;
  innerBorder?: string;
  innerPadding?: number;
  sidebarBg?: string;
  frameBorder?: string;
  frameInner?: string;
  accent: string;
  title: string;
  sub: string;
  label: string;
  value: string;
  sectionBorder: string;
  sectionBg: string;
  quoteBorder: string;
  fontFamily: string;
  headerAlign?: "left" | "center";
  photoRadius: number;
  photoShadow: string;
}

export const RESUME_THEMES: Record<ResumeTemplateId, TemplateTheme> = {
  minimal: {
    id: "minimal",
    pageBg: "#ffffff",
    accent: "#171717",
    title: "#0a0a0a",
    sub: "#737373",
    label: "#a3a3a3",
    value: "#262626",
    sectionBorder: "#f5f5f5",
    sectionBg: "transparent",
    quoteBorder: "#e5e5e5",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 4,
    photoShadow: "none",
  },
  traditional: {
    id: "traditional",
    pageBg: "#fffbf7",
    innerBorder: "#e8c4c4",
    innerPadding: 28,
    accent: "#8B1E1E",
    title: "#6B1515",
    sub: "#57534e",
    label: "#991b1b",
    value: "#44403c",
    sectionBorder: "#fecaca",
    sectionBg: "#fffafa",
    quoteBorder: "#dc2626",
    fontFamily: "Georgia, 'Times New Roman', serif",
    headerAlign: "center",
    photoRadius: 2,
    photoShadow: "0 4px 12px rgba(139,30,30,0.12)",
  },
  modern: {
    id: "modern",
    pageBg: "linear-gradient(155deg, #0c1222 0%, #1e1b4b 42%, #831843 100%)",
    accent: "#c084fc",
    title: "#fafafa",
    sub: "#cbd5e1",
    label: "#94a3b8",
    value: "#e2e8f0",
    sectionBorder: "rgba(255,255,255,0.1)",
    sectionBg: "rgba(255,255,255,0.05)",
    quoteBorder: "#a78bfa",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 12,
    photoShadow: "0 8px 24px rgba(0,0,0,0.35)",
  },
  elegant: {
    id: "elegant",
    pageBg: "#faf9f7",
    accent: "#78716c",
    title: "#1c1917",
    sub: "#78716c",
    label: "#a8a29e",
    value: "#44403c",
    sectionBorder: "#e7e5e4",
    sectionBg: "#ffffff",
    quoteBorder: "#d6d3d1",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    headerAlign: "center",
    photoRadius: 999,
    photoShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  sidebar: {
    id: "sidebar",
    pageBg: "#f7f2e8",
    frameBorder: "#8b7355",
    frameInner: "#c4a574",
    accent: "#8b2500",
    title: "#2c1810",
    sub: "#5c4033",
    label: "#8b4513",
    value: "#3d2914",
    sectionBorder: "#d4c4a8",
    sectionBg: "transparent",
    quoteBorder: "#8b2500",
    fontFamily: "'STKaiti', 'KaiTi', 'SimSun', Georgia, serif",
    headerAlign: "center",
    photoRadius: 4,
    photoShadow: "0 4px 16px rgba(44,24,16,0.12)",
  },
  magazine: {
    id: "magazine",
    pageBg: "#fafaf9",
    accent: "#e11d48",
    title: "#ffffff",
    sub: "#d6d3d1",
    label: "#a8a29e",
    value: "#292524",
    sectionBorder: "#e5e5e5",
    sectionBg: "#ffffff",
    quoteBorder: "#e11d48",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 4,
    photoShadow: "none",
  },
  timeline: {
    id: "timeline",
    pageBg: "#ffffff",
    accent: "#0d9488",
    title: "#0f172a",
    sub: "#64748b",
    label: "#14b8a6",
    value: "#334155",
    sectionBorder: "#e2e8f0",
    sectionBg: "#f0fdfa",
    quoteBorder: "#0d9488",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 6,
    photoShadow: "none",
  },
  corporate: {
    id: "corporate",
    pageBg: "#f8fafc",
    accent: "#0ea5e9",
    title: "#ffffff",
    sub: "#cbd5e1",
    label: "#64748b",
    value: "#1e293b",
    sectionBorder: "#e2e8f0",
    sectionBg: "#ffffff",
    quoteBorder: "#0ea5e9",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 4,
    photoShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  warm: {
    id: "warm",
    pageBg: "#fffbf7",
    accent: "#ea580c",
    title: "#1c1917",
    sub: "#78716c",
    label: "#c2410c",
    value: "#44403c",
    sectionBorder: "#fed7aa",
    sectionBg: "#ffffff",
    quoteBorder: "#fb923c",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headerAlign: "left",
    photoRadius: 16,
    photoShadow: "0 4px 16px rgba(234,88,12,0.15)",
  },
};

/** @deprecated */
export const THEMES = RESUME_THEMES;
