"use client";

import { useState } from "react";
import type { BiodataFormData, Locale } from "@/lib/types";
import { t } from "@/lib/i18n";
import { normalizeGender } from "@/lib/gender";
import { compressImageFile } from "@/lib/image";
import { educationOptions, incomeOptions, visaOptions } from "@/lib/form-options";
import { useToast } from "./ToastProvider";
import { ContactsEditor } from "./ContactsEditor";
import {
  Button,
  FileUploadButton,
  Panel,
  SelectField,
  TextArea,
  TextInput,
} from "./ui/Field";

interface BiodataFormProps {
  data: BiodataFormData;
  locale: Locale;
  onChange: (patch: Partial<BiodataFormData>) => void;
}

function CollapsibleSection({
  title,
  hint,
  defaultOpen = true,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-stone-200/80 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:px-5"
      >
        <div>
          <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-stone-500">{hint}</p>}
        </div>
        <span className="mt-0.5 text-stone-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="grid gap-4 border-t border-stone-100 px-4 pb-5 pt-4 sm:grid-cols-2 sm:px-5">
          {children}
        </div>
      )}
    </section>
  );
}

export function BiodataForm({ data, locale, onChange }: BiodataFormProps) {
  const { showToast } = useToast();
  const [photoLoading, setPhotoLoading] = useState(false);
  const genderValue = normalizeGender(data.gender);
  const isZh = locale === "zh";

  const handlePhoto = async (file: File | null) => {
    if (!file) {
      onChange({ photoDataUrl: "" });
      return;
    }
    setPhotoLoading(true);
    try {
      onChange({ photoDataUrl: await compressImageFile(file) });
    } catch (e) {
      const key = e instanceof Error && e.message === "too_large" ? "photoTooLarge" : "photoInvalid";
      showToast(t(locale, key), "error");
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Panel
        title={t(locale, "photo")}
        hint={`${t(locale, "photoHint")} ${t(locale, "photoPrivacyHint")}`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <FileUploadButton
            label={photoLoading ? t(locale, "loading") : t(locale, "uploadPhoto")}
            loading={photoLoading}
            onFile={handlePhoto}
          />
          {data.photoDataUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.photoDataUrl}
                alt=""
                className="h-24 w-24 rounded-xl object-cover ring-1 ring-stone-200"
              />
              <Button variant="ghost" onClick={() => onChange({ photoDataUrl: "" })}>
                {t(locale, "removePhoto")}
              </Button>
            </>
          )}
        </div>
      </Panel>

      <CollapsibleSection title={t(locale, "basicInfo")}>
        <TextInput
          label={t(locale, "name")}
          placeholder={isZh ? "如：林晓晨 Alex" : "e.g. Alex Lin / 林晓晨"}
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          required
          className="sm:col-span-2"
        />
        <SelectField
          label={t(locale, "gender")}
          value={genderValue}
          onChange={(v) => onChange({ gender: v })}
          options={[
            { value: "", label: "—" },
            { value: "male", label: t(locale, "male") },
            { value: "female", label: t(locale, "female") },
          ]}
        />
        <TextInput
          label={t(locale, "birthYear")}
          value={data.birthYear}
          onChange={(e) => onChange({ birthYear: e.target.value })}
          placeholder="1994"
        />
        <TextInput
          label={t(locale, "height")}
          value={data.height}
          onChange={(e) => onChange({ height: e.target.value })}
          placeholder={isZh ? "178cm" : "5'10\" / 178cm"}
        />
        <TextInput
          label={t(locale, "city")}
          placeholder={isZh ? "如：旧金山、温哥华、悉尼" : "e.g. San Francisco, Vancouver"}
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
        <TextInput
          label={t(locale, "country")}
          value={data.country}
          onChange={(e) => onChange({ country: e.target.value })}
          placeholder={isZh ? "美国" : "USA"}
        />
        <ContactsEditor
          locale={locale}
          contacts={data.contacts}
          onChange={(contacts) => onChange({ contacts })}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title={t(locale, "educationCareer")}
        hint={isZh ? "不用写太细，行业和方向即可" : "Industry and role — no need for full resume"}
      >
        <SelectField
          label={t(locale, "education")}
          value={data.education}
          onChange={(v) => onChange({ education: v })}
          options={educationOptions(locale)}
        />
        <TextInput
          label={t(locale, "school")}
          value={data.school}
          onChange={(e) => onChange({ school: e.target.value })}
          placeholder={isZh ? "如：UC Berkeley" : "e.g. UC Berkeley"}
        />
        <TextInput
          label={t(locale, "occupation")}
          value={data.occupation}
          onChange={(e) => onChange({ occupation: e.target.value })}
          placeholder={isZh ? "软件工程师" : "Software Engineer"}
          className="sm:col-span-2"
        />
        <SelectField
          label={t(locale, "incomeRange")}
          value={data.incomeRange}
          onChange={(v) => onChange({ incomeRange: v })}
          options={incomeOptions(locale)}
          className="sm:col-span-2"
        />
      </CollapsibleSection>

      <CollapsibleSection title={t(locale, "background")} defaultOpen={false}>
        <TextInput
          label={t(locale, "hometown")}
          placeholder={isZh ? "如：上海、广州" : "e.g. Shanghai, Guangzhou"}
          value={data.hometown}
          onChange={(e) => onChange({ hometown: e.target.value })}
        />
        <TextInput
          label={t(locale, "languages")}
          value={data.languages}
          onChange={(e) => onChange({ languages: e.target.value })}
          placeholder={isZh ? "中文、英文" : "Mandarin, English"}
        />
        <SelectField
          label={t(locale, "visaStatus")}
          value={data.visaStatus}
          onChange={(v) => onChange({ visaStatus: v })}
          options={visaOptions(locale)}
          className="sm:col-span-2"
        />
      </CollapsibleSection>

      <CollapsibleSection
        title={t(locale, "family")}
        hint={isZh ? "父母职业、是否独生子女等" : "Parents' background, siblings, etc."}
        defaultOpen={false}
      >
        <TextArea
          label={t(locale, "parents")}
          placeholder={isZh ? "父母职业、退休情况等" : "Parents' occupations, retirement status, etc."}
          value={data.parents}
          onChange={(e) => onChange({ parents: e.target.value })}
          className="sm:col-span-2"
        />
        <TextInput
          label={t(locale, "siblings")}
          value={data.siblings}
          onChange={(e) => onChange({ siblings: e.target.value })}
          placeholder={isZh ? "独生子女 / 有一妹" : "Only child / one younger sister"}
          className="sm:col-span-2"
        />
      </CollapsibleSection>

      <CollapsibleSection
        title={t(locale, "personal")}
        hint={isZh ? "真诚简洁即可，各 3–5 行够用" : "Keep it genuine — 3–5 lines each is enough"}
      >
        <TextArea
          label={t(locale, "aboutMe")}
          placeholder={isZh ? "性格、生活方式、对未来的想法…" : "Personality, lifestyle, what you're looking for…"}
          value={data.aboutMe}
          onChange={(e) => onChange({ aboutMe: e.target.value })}
          className="sm:col-span-2"
        />
        <TextInput
          label={t(locale, "hobbies")}
          placeholder={isZh ? "徒步、烹饪、摄影…" : "Hiking, cooking, photography…"}
          value={data.hobbies}
          onChange={(e) => onChange({ hobbies: e.target.value })}
          className="sm:col-span-2"
        />
        <TextArea
          label={t(locale, "partnerExpectations")}
          placeholder={isZh ? "年龄、性格、地域等期望…" : "Age range, values, location preferences…"}
          value={data.partnerExpectations}
          onChange={(e) => onChange({ partnerExpectations: e.target.value })}
          className="sm:col-span-2"
        />
      </CollapsibleSection>
    </div>
  );
}
