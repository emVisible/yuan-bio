"use client";

import type { ReactNode } from "react";
import type { CanvasDocument } from "@/lib/canvas/document";
import { peerRects as getPeerRects } from "@/lib/canvas/visibility";
import { CanvasBlock } from "./CanvasBlock";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export interface CanvasSurfaceProps {
  document: CanvasDocument;
  locale: Locale;
  editable?: boolean;
  flush?: boolean;
  canvasScale?: number;
  visibleIds: string[];
  labelKeyForBlock: (id: string) => string;
  accent: string;
  pageStyle?: React.CSSProperties;
  decorations?: ReactNode;
  renderBlock: (id: string) => ReactNode;
  onBlockChange?: (id: string, rect: import("@/lib/layout-settings").BlockRect) => void;
}

export function CanvasSurface({
  document: doc,
  locale,
  editable,
  flush = false,
  canvasScale = 1,
  visibleIds,
  labelKeyForBlock,
  accent,
  pageStyle,
  decorations,
  renderBlock,
  onBlockChange,
}: CanvasSurfaceProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: doc.pageWidth,
        height: doc.pageHeight,
        ...pageStyle,
      }}
    >
      {decorations}
      {visibleIds.map((id) => {
        const rect = doc.blocks[id];
        if (!rect) return null;
        return (
          <CanvasBlock
            key={id}
            rect={rect}
            document={doc}
            editable={editable}
            flush={flush}
            canvasScale={canvasScale}
            peerRects={doc.preventOverlap ? getPeerRects(doc.blocks, visibleIds, id) : []}
            onChange={onBlockChange ? (r) => onBlockChange(id, r) : undefined}
            label={t(locale, labelKeyForBlock(id))}
            accent={accent}
          >
            {renderBlock(id)}
          </CanvasBlock>
        );
      })}
    </div>
  );
}
