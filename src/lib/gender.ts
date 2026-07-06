import type { Locale } from "./types";
import { t } from "./i18n";

export type Gender = "male" | "female";

export function normalizeGender(value: string): Gender | "" {
  if (value === "male" || value === "female") return value;
  if (value === "男" || value === "Male") return "male";
  if (value === "女" || value === "Female") return "female";
  return "";
}

export function genderLabel(locale: Locale, gender: string): string {
  const normalized = normalizeGender(gender);
  if (normalized === "male") return t(locale, "male");
  if (normalized === "female") return t(locale, "female");
  return gender;
}

export function isFemale(gender: string): boolean {
  return normalizeGender(gender) === "female";
}
