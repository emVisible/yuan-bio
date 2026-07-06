import type { Metadata } from "next";
import SharePageClient from "./SharePageClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SharePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  return <SharePageClient params={params} />;
}
