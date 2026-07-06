import type { CardTemplateId } from "./types";

export interface CardTheme {
  id: CardTemplateId;
  bg: string;
  accent: string;
  title: string;
  sub: string;
  label: string;
  badge: string;
  fontFamily: string;
  photoRadius: number;
  photoBorder?: string;
}

export const CARD_THEMES: Record<CardTemplateId, CardTheme> = {
  classic: {
    id: "classic",
    bg: "linear-gradient(165deg, #fff7ed 0%, #fef3c7 40%, #fff1f2 100%)",
    accent: "#b45309",
    title: "#78350f",
    sub: "#78716c",
    label: "#a16207",
    badge: "#92400e",
    fontFamily: "Georgia, serif",
    photoRadius: 16,
    photoBorder: "4px solid #ffffff",
  },
  split: {
    id: "split",
    bg: "#f8fafc",
    accent: "#0f766e",
    title: "#0f172a",
    sub: "#475569",
    label: "#64748b",
    badge: "#0f766e",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 12,
    photoBorder: "1px solid #e2e8f0",
  },
  polaroid: {
    id: "polaroid",
    bg: "linear-gradient(180deg, #e7e5e4 0%, #d6d3d1 100%)",
    accent: "#57534e",
    title: "#1c1917",
    sub: "#57534e",
    label: "#78716c",
    badge: "#44403c",
    fontFamily: "'Segoe Script', 'Apple Chancery', cursive",
    photoRadius: 0,
  },
  bold: {
    id: "bold",
    bg: "linear-gradient(135deg, #831843 0%, #4c0519 100%)",
    accent: "#fda4af",
    title: "#fff1f2",
    sub: "#fecdd3",
    label: "#fb7185",
    badge: "#fda4af",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 999,
    photoBorder: "3px solid #fda4af",
  },
  minimal: {
    id: "minimal",
    bg: "#ffffff",
    accent: "#171717",
    title: "#0a0a0a",
    sub: "#737373",
    label: "#a3a3a3",
    badge: "#525252",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 2,
    photoBorder: "1px solid #e5e5e5",
  },
  banner: {
    id: "banner",
    bg: "#0f172a",
    accent: "#38bdf8",
    title: "#f8fafc",
    sub: "#94a3b8",
    label: "#64748b",
    badge: "#38bdf8",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 8,
  },
  showcase: {
    id: "showcase",
    bg: "#ffffff",
    accent: "#2563eb",
    title: "#0f172a",
    sub: "#475569",
    label: "#64748b",
    badge: "#2563eb",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 999,
    photoBorder: "3px solid #eff6ff",
  },
  stripe: {
    id: "stripe",
    bg: "#ffffff",
    accent: "#6366f1",
    title: "#0f172a",
    sub: "#64748b",
    label: "#94a3b8",
    badge: "#6366f1",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    photoRadius: 8,
    photoBorder: "1px solid #e2e8f0",
  },
  ledger: {
    id: "ledger",
    bg: "#fafaf9",
    accent: "#57534e",
    title: "#1c1917",
    sub: "#78716c",
    label: "#a8a29e",
    badge: "#57534e",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    photoRadius: 0,
    photoBorder: "1px solid #d6d3d1",
  },
};
