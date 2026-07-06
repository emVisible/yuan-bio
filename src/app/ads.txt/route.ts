import { NextResponse } from "next/server";

/** Required for Google AdSense site verification */
export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.replace("ca-pub-", "");
  const line = publisherId
    ? `google.com, pub-${publisherId}, DIRECT, f08c47fec0942fa0`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT to enable ads.txt";

  return new NextResponse(line, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
