"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Google AdSense unit. Not placed on /create to keep the editor focused.
 * Set NEXT_PUBLIC_ADSENSE_CLIENT and slot-specific NEXT_PUBLIC_ADSENSE_SLOT_* env vars.
 */
export function AdSlot({
  slot,
  className = "",
  format = "auto",
}: {
  slot: string;
  className?: string;
  format?: "auto" | "horizontal" | "rectangle";
}) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!clientId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blockers or script not loaded yet
    }
  }, [clientId]);

  if (!clientId) return null;

  return (
    <div className={`my-6 overflow-hidden ${className}`} data-ad-slot={slot}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={format === "auto" ? "true" : "false"}
      />
    </div>
  );
}
