import type { Locale } from "./types";

export function visaOptions(locale: Locale): { value: string; label: string }[] {
  if (locale === "zh") {
    return [
      { value: "", label: "请选择（选填）" },
      { value: "美国公民", label: "美国公民" },
      { value: "美国绿卡", label: "美国绿卡" },
      { value: "H1B 工作签", label: "H1B 工作签" },
      { value: "OPT/F1", label: "OPT / F1 学生" },
      { value: "加拿大 PR", label: "加拿大 PR" },
      { value: "澳洲 PR", label: "澳洲 PR" },
      { value: "其他", label: "其他" },
    ];
  }
  return [
    { value: "", label: "Select (optional)" },
    { value: "US Citizen", label: "US Citizen" },
    { value: "US Green Card", label: "US Green Card" },
    { value: "H1B", label: "H1B" },
    { value: "OPT/F1", label: "OPT / F1 Student" },
    { value: "Canada PR", label: "Canada PR" },
    { value: "Australia PR", label: "Australia PR" },
    { value: "Other", label: "Other" },
  ];
}

export function educationOptions(locale: Locale): { value: string; label: string }[] {
  if (locale === "zh") {
    return [
      { value: "", label: "请选择" },
      { value: "高中", label: "高中" },
      { value: "大专", label: "大专" },
      { value: "本科", label: "本科" },
      { value: "硕士", label: "硕士" },
      { value: "博士", label: "博士" },
    ];
  }
  return [
    { value: "", label: "Select" },
    { value: "High School", label: "High School" },
    { value: "Associate", label: "Associate" },
    { value: "Bachelor's", label: "Bachelor's" },
    { value: "Master's", label: "Master's" },
    { value: "PhD", label: "PhD" },
  ];
}

export function incomeOptions(locale: Locale): { value: string; label: string }[] {
  if (locale === "zh") {
    return [
      { value: "", label: "可不填 / 私信再聊" },
      { value: "10万以下", label: "10 万美元以下" },
      { value: "$100k–150k", label: "$10–15 万" },
      { value: "$150k–200k", label: "$15–20 万" },
      { value: "$200k+", label: "$20 万以上" },
    ];
  }
  return [
    { value: "", label: "Optional — discuss privately" },
    { value: "Under $100k", label: "Under $100k" },
    { value: "$100k–150k", label: "$100k–150k" },
    { value: "$150k–200k", label: "$150k–200k" },
    { value: "$200k+", label: "$200k+" },
  ];
}
