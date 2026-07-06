import type { BiodataFormData, Locale } from "./types";
import { newContactId } from "./contacts";
import { DEFAULT_AVATAR_URL } from "./site";

const SAMPLE_ZH: BiodataFormData = {
  name: "林晓晨",
  gender: "male",
  birthYear: "1994",
  height: "178cm",
  city: "旧金山",
  country: "美国",
  hometown: "上海",
  languages: "中文、英文",
  visaStatus: "美国绿卡",
  education: "硕士",
  school: "UC Berkeley",
  occupation: "软件工程师",
  employer: "科技公司",
  incomeRange: "$150k–200k",
  parents: "父亲退休教师，母亲企业职员，均在国内",
  siblings: "独生子女",
  aboutMe:
    "在湾区工作多年，性格稳重、重视沟通与家庭。周末喜欢 hiking、做饭和看纪录片。希望找一位真诚、有共同生活目标的人，一起规划未来。",
  hobbies: "徒步、烹饪、摄影、阅读",
  partnerExpectations:
    "年龄相仿（±3岁），性格温和，有稳定事业或明确规划；重视感情与家庭；若也在湾区或愿意在加州长期发展则更佳。",
  contacts: [
    { id: newContactId(), preset: "wechat", value: "示例_请修改" },
    { id: newContactId(), preset: "email", value: "example@email.com" },
  ],
  photoDataUrl: DEFAULT_AVATAR_URL,
};

const SAMPLE_EN: BiodataFormData = {
  name: "Alex Lin",
  gender: "male",
  birthYear: "1994",
  height: "178cm / 5'10\"",
  city: "San Francisco",
  country: "USA",
  hometown: "Shanghai, China",
  languages: "Mandarin, English",
  visaStatus: "US Green Card",
  education: "Master's",
  school: "UC Berkeley",
  occupation: "Software Engineer",
  employer: "Tech company",
  incomeRange: "$150k–200k",
  parents: "Father (retired teacher), mother (corporate); both in China",
  siblings: "Only child",
  aboutMe:
    "Based in the Bay Area for several years. Steady, family-oriented, and value open communication. Weekends: hiking, cooking, documentaries. Seeking a genuine partner to build a future together.",
  hobbies: "Hiking, cooking, photography, reading",
  partnerExpectations:
    "Similar age (±3 years), kind and emotionally mature, stable career or clear goals; values family; ideally in the Bay Area or open to California long-term.",
  contacts: [
    { id: newContactId(), preset: "email", value: "example@email.com" },
    { id: newContactId(), preset: "whatsapp", value: "+1 555 000 0000" },
  ],
  photoDataUrl: DEFAULT_AVATAR_URL,
};

export function getSampleBiodata(locale: Locale): BiodataFormData {
  return locale === "zh" ? { ...SAMPLE_ZH, contacts: SAMPLE_ZH.contacts.map((c) => ({ ...c, id: newContactId() })) } : { ...SAMPLE_EN, contacts: SAMPLE_EN.contacts.map((c) => ({ ...c, id: newContactId() })) };
}

export function isEmptyBiodata(data: BiodataFormData): boolean {
  return !data.name?.trim();
}
