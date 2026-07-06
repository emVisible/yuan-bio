import type { ContactEntry, ContactPreset, Locale } from "./types";
import { t } from "./i18n";

export const CONTACT_PRESETS: ContactPreset[] = [
  "wechat",
  "email",
  "phone",
  "whatsapp",
  "line",
  "instagram",
  "telegram",
  "custom",
];

export function contactPresetLabel(locale: Locale, preset: ContactPreset): string {
  return t(locale, `contact_${preset}`);
}

export function contactDisplayLabel(locale: Locale, entry: ContactEntry): string {
  if (entry.preset === "custom") {
    return entry.customLabel?.trim() || t(locale, "contact_custom");
  }
  return contactPresetLabel(locale, entry.preset);
}

export function newContactId(): string {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export function emptyContact(preset: ContactPreset = "email"): ContactEntry {
  return { id: newContactId(), preset, value: "" };
}

export function filledContacts(entries: ContactEntry[]): ContactEntry[] {
  return entries.filter((e) => e.value?.trim());
}

/** Migrate legacy wechat/email/phone fields */
export function migrateContacts(data: {
  contacts?: ContactEntry[];
  wechat?: string;
  email?: string;
  phone?: string;
}): ContactEntry[] {
  if (data.contacts?.length) return data.contacts;
  const out: ContactEntry[] = [];
  if (data.wechat?.trim()) {
    out.push({ id: newContactId(), preset: "wechat", value: data.wechat.trim() });
  }
  if (data.email?.trim()) {
    out.push({ id: newContactId(), preset: "email", value: data.email.trim() });
  }
  if (data.phone?.trim()) {
    out.push({ id: newContactId(), preset: "phone", value: data.phone.trim() });
  }
  return out;
}
