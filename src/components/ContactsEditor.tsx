"use client";

import type { ContactEntry, ContactPreset, Locale } from "@/lib/types";
import { CONTACT_PRESETS, contactPresetLabel, emptyContact, newContactId } from "@/lib/contacts";
import { t } from "@/lib/i18n";
import { Button, SelectField, TextInput } from "./ui/Field";

interface ContactsEditorProps {
  locale: Locale;
  contacts: ContactEntry[];
  onChange: (contacts: ContactEntry[]) => void;
}

export function ContactsEditor({ locale, contacts, onChange }: ContactsEditorProps) {
  const list = contacts.length ? contacts : [emptyContact("email")];

  const update = (id: string, patch: Partial<ContactEntry>) => {
    onChange(list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const remove = (id: string) => {
    const next = list.filter((c) => c.id !== id);
    onChange(next.length ? next : [emptyContact("email")]);
  };

  const add = () => {
    onChange([...list, emptyContact("email")]);
  };

  return (
    <div className="space-y-3 sm:col-span-2">
      {list.map((entry) => (
        <div key={entry.id} className="flex flex-wrap items-end gap-2 rounded-lg border border-stone-100 bg-stone-50/50 p-3">
          <div className="min-w-[120px] flex-1">
            <SelectField
              label={t(locale, "contactType")}
              value={entry.preset}
              onChange={(v) => {
                const preset = v as ContactPreset;
                update(entry.id, { preset, customLabel: preset === "custom" ? entry.customLabel : undefined });
              }}
              options={CONTACT_PRESETS.map((p) => ({
                value: p,
                label: contactPresetLabel(locale, p),
              }))}
            />
          </div>
          {entry.preset === "custom" && (
            <div className="min-w-[100px] flex-1">
              <TextInput
                label={t(locale, "contactCustomLabel")}
                value={entry.customLabel ?? ""}
                onChange={(e) => update(entry.id, { customLabel: e.target.value })}
                placeholder={t(locale, "contactCustomPlaceholder")}
              />
            </div>
          )}
          <div className="min-w-[140px] flex-[2]">
            <TextInput
              label={t(locale, "contactValue")}
              value={entry.value}
              onChange={(e) => update(entry.id, { value: e.target.value })}
            />
          </div>
          {list.length > 1 && (
            <Button
              variant="ghost"
              onClick={() => remove(entry.id)}
              className="mb-0.5 px-2"
              aria-label={t(locale, "removeContact")}
            >
              ×
            </Button>
          )}
        </div>
      ))}
      <Button variant="ghost" onClick={add} className="px-0 text-rose-600 hover:text-rose-700">
        + {t(locale, "addContact")}
      </Button>
    </div>
  );
}

export function ensureContacts(contacts: ContactEntry[]): ContactEntry[] {
  if (contacts.length) return contacts;
  return [{ ...emptyContact("email"), id: newContactId() }];
}
