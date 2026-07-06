import type { BlockId } from "@/lib/layout-settings";

const LABEL_KEYS: Record<BlockId, string> = {
  header: "basicInfo",
  photo: "photo",
  details: "educationCareer",
  background: "background",
  family: "family",
  about: "aboutMe",
  partner: "partnerExpectations",
  contact: "contact",
};

const CARD_LABEL_KEYS: Record<string, string> = {
  photo: "photo",
  header: "basicInfo",
  body: "aboutMe",
  contact: "contact",
};

export function resumeBlockLabelKey(id: string): string {
  return LABEL_KEYS[id as BlockId] ?? id;
}

export function cardBlockLabelKey(id: string): string {
  return CARD_LABEL_KEYS[id] ?? id;
}
