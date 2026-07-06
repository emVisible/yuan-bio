const DEFAULT_SITE_URL = "https://yuanbio.com";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);
export const SITE_NAME = "YuanBio";
export const SITE_NAME_ZH = "缘简";
/** Default sample avatar (served from /public/avatar.png). */
export const DEFAULT_AVATAR_URL = "/avatar.png";

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
