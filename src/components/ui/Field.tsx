"use client";

import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-lg border border-stone-200 bg-stone-50/80 px-3 py-2.5 text-sm text-stone-900 shadow-sm transition placeholder:text-stone-400 hover:border-stone-300 focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-100";

export function FieldLabel({
  children,
  hint,
  required,
}: {
  children: ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <span className="mb-1.5 block">
      <span className="text-sm font-medium text-stone-800">
        {children}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {hint && <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">{hint}</span>}
    </span>
  );
}

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; required?: boolean }
>(function TextInput({ label, hint, required, className = "", ...props }, ref) {
  const field = <input ref={ref} className={`${inputClass} ${className}`} {...props} />;
  if (!label) return field;
  return (
    <label className="block">
      <FieldLabel hint={hint} required={required}>
        {label}
      </FieldLabel>
      {field}
    </label>
  );
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; required?: boolean }
>(function TextArea({ label, hint, required, className = "", rows = 4, ...props }, ref) {
  const field = <textarea ref={ref} rows={rows} className={`${inputClass} resize-y min-h-[5rem] ${className}`} {...props} />;
  if (!label) return field;
  return (
    <label className="block">
      <FieldLabel hint={hint} required={required}>
        {label}
      </FieldLabel>
      {field}
    </label>
  );
});

export function SelectField({
  label,
  hint,
  value,
  onChange,
  options,
  className = "",
}: {
  label?: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value">) {
  const field = (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-9 ${className}`}
      >
        {options.map((o) => (
          <option key={o.value || "empty"} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden>
        ▾
      </span>
    </div>
  );
  if (!label) return field;
  return (
    <label className="block">
      <FieldLabel hint={hint}>{label}</FieldLabel>
      {field}
    </label>
  );
}

export function RangeField({
  label,
  value,
  min,
  max,
  onChange,
  accent = "rose",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  accent?: "rose" | "violet";
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-stone-700">
      <span className="w-16 shrink-0 text-xs text-stone-500">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-1 flex-1 appearance-none rounded-full bg-stone-200 ${accent === "violet" ? "accent-violet-600" : "accent-rose-600"}`}
      />
      <span className="w-8 text-right text-xs tabular-nums text-stone-600">{value}</span>
    </label>
  );
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  accent = "rose",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  accent?: "rose" | "violet" | "neutral";
}) {
  const active =
    accent === "violet"
      ? "bg-white text-violet-800 shadow-sm"
      : accent === "neutral"
        ? "bg-white text-stone-900 shadow-sm"
        : "bg-white text-rose-800 shadow-sm";

  return (
    <div className="flex rounded-lg border border-stone-200 bg-stone-100/80 p-0.5 text-sm">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`flex-1 rounded-md px-2 py-2 font-medium transition ${
            value === opt.id ? active : "text-stone-600 hover:text-stone-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Panel({ title, hint, children, action }: { title: string; hint?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-stone-500">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

const btnBase =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50";

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles =
    variant === "primary"
      ? "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-300"
      : variant === "ghost"
        ? "text-stone-600 hover:bg-stone-100 hover:text-rose-600 focus:ring-stone-200"
        : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 focus:ring-stone-200";
  return <button type="button" className={`${btnBase} ${styles} ${className}`} {...props} />;
}

export function FileUploadButton({
  label,
  loading,
  disabled,
  onFile,
  accept = "image/jpeg,image/png,image/webp",
}: {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onFile: (file: File | null) => void;
  accept?: string;
}) {
  return (
    <label
      className={`${btnBase} cursor-pointer border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 focus-within:ring-2 focus-within:ring-rose-100 ${disabled ? "pointer-events-none opacity-50" : ""}`}
    >
      {loading ? "…" : label}
      <input
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled || loading}
        onChange={(e) => {
          onFile(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />
    </label>
  );
}
