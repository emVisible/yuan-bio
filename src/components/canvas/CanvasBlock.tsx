"use client";

import { useCallback, useRef, type ReactNode } from "react";
import type { BlockRect } from "@/lib/layout-settings";
import {
  applyBlockChange,
  BLOCK_MIN_H,
  BLOCK_MIN_W,
  rectHeight,
} from "@/lib/canvas/geometry";
import type { CanvasDocument } from "@/lib/canvas/document";

export interface CanvasBlockProps {
  rect: BlockRect;
  document: Pick<
    CanvasDocument,
    | "pageWidth"
    | "pageHeight"
    | "margin"
    | "gridSize"
    | "blockGap"
    | "blockPadding"
    | "handleHeight"
    | "preventOverlap"
    | "resizable"
  >;
  editable?: boolean;
  flush?: boolean;
  canvasScale?: number;
  peerRects?: BlockRect[];
  onChange?: (rect: BlockRect) => void;
  label: string;
  accent: string;
  children: ReactNode;
}

type DragState =
  | { kind: "move"; px: number; py: number; ox: number; oy: number; start: BlockRect }
  | { kind: "resize"; px: number; py: number; start: BlockRect; edge: "se" | "e" | "s" };

export function CanvasBlock({
  rect,
  document: doc,
  editable,
  flush = false,
  canvasScale = 1,
  peerRects = [],
  onChange,
  label,
  accent,
  children,
}: CanvasBlockProps) {
  const interaction = useRef<DragState | null>(null);
  const fixedHeight = rect.h !== undefined;
  const totalH = rectHeight(rect);
  const canResize = Boolean(editable && doc.resizable && fixedHeight);
  const handleH = editable ? doc.handleHeight : 0;
  const pad = flush || !editable ? 0 : doc.blockPadding;
  const contentH = fixedHeight
    ? Math.max(16, totalH - handleH - pad * 2)
    : undefined;

  const tryEmit = useCallback(
    (candidate: BlockRect) => {
      if (!onChange) return;
      if (!fixedHeight) {
        const result = applyBlockChange(
          { ...rect, x: candidate.x, y: candidate.y },
          doc.preventOverlap ? peerRects : [],
          {
            pageWidth: doc.pageWidth,
            pageHeight: doc.pageHeight,
            margin: doc.margin,
            gridSize: doc.gridSize,
            blockGap: doc.preventOverlap ? doc.blockGap : 0,
            preventOverlap: false,
          },
        );
        if (result) onChange({ ...rect, x: result.x, y: result.y });
        return;
      }
      const result = applyBlockChange(candidate, doc.preventOverlap ? peerRects : [], {
        pageWidth: doc.pageWidth,
        pageHeight: doc.pageHeight,
        margin: doc.margin,
        gridSize: doc.gridSize,
        blockGap: doc.blockGap,
        preventOverlap: doc.preventOverlap,
      });
      if (result) onChange(result);
    },
    [doc, fixedHeight, onChange, peerRects, rect],
  );

  const onHandlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!editable || !onChange) return;
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      interaction.current = {
        kind: "move",
        px: e.clientX,
        py: e.clientY,
        ox: rect.x,
        oy: rect.y,
        start: { ...rect, h: fixedHeight ? totalH : undefined },
      };
    },
    [editable, fixedHeight, onChange, rect, totalH],
  );

  const onResizePointerDown = useCallback(
    (e: React.PointerEvent, edge: "se" | "e" | "s") => {
      if (!canResize || !onChange) return;
      e.preventDefault();
      e.stopPropagation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      interaction.current = {
        kind: "resize",
        px: e.clientX,
        py: e.clientY,
        start: { ...rect, h: totalH },
        edge,
      };
    },
    [canResize, onChange, rect, totalH],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const state = interaction.current;
      if (!state || !onChange) return;
      const scale = canvasScale || 1;
      const dx = (e.clientX - state.px) / scale;
      const dy = (e.clientY - state.py) / scale;

      if (state.kind === "move") {
        tryEmit({ ...state.start, x: state.ox + dx, y: state.oy + dy });
        return;
      }

      const start = state.start;
      const startH = rectHeight(start);
      let w = start.w;
      let h = startH;
      if (state.edge === "se" || state.edge === "e") w = start.w + dx;
      if (state.edge === "se" || state.edge === "s") h = startH + dy;
      tryEmit({ ...start, w, h });
    },
    [canvasScale, onChange, tryEmit],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    interaction.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const resizeHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    background: accent,
    borderRadius: 2,
    opacity: 0.85,
    zIndex: 2,
  };

  return (
    <div
      className="absolute box-border"
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: fixedHeight ? totalH : undefined,
        boxSizing: "border-box",
      }}
    >
      {editable && (
        <button
          type="button"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex w-full cursor-grab items-center gap-1 rounded border border-dashed px-1.5 active:cursor-grabbing"
          style={{
            height: doc.handleHeight,
            borderColor: `${accent}66`,
            background: `${accent}12`,
            fontSize: 9,
            color: accent,
            flexShrink: 0,
          }}
        >
          <span aria-hidden>⠿</span>
          <span className="truncate">{label}</span>
        </button>
      )}

      <div
        className="relative box-border"
        style={{
          height: fixedHeight ? contentH : undefined,
          padding: fixedHeight && !flush && editable ? doc.blockPadding : 0,
          boxSizing: "border-box",
          overflow: flush ? "visible" : "hidden",
        }}
      >
        <div
          className={fixedHeight && !flush ? "h-full w-full overflow-hidden" : "h-full w-full"}
          style={flush ? { overflow: "visible" } : undefined}
        >
          {children}
        </div>

        {canResize && (
          <>
            <div
              role="presentation"
              onPointerDown={(e) => onResizePointerDown(e, "e")}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ position: "absolute", top: 0, right: 0, width: 8, height: "100%", cursor: "ew-resize" }}
            />
            <div
              role="presentation"
              onPointerDown={(e) => onResizePointerDown(e, "s")}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ position: "absolute", bottom: 0, left: 0, height: 8, width: "100%", cursor: "ns-resize" }}
            />
            <div
              role="presentation"
              onPointerDown={(e) => onResizePointerDown(e, "se")}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ ...resizeHandleStyle, right: 2, bottom: 2, cursor: "nwse-resize" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export { BLOCK_MIN_W, BLOCK_MIN_H };
