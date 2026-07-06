export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuanbio.com";
export const SITE_NAME = "YuanBio";
export const SITE_NAME_ZH = "缘简";
/** Default sample avatar (served from /public/avatar.png). */
export const DEFAULT_AVATAR_URL = "/avatar.png";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
