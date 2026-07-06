/** Which optional blocks appear on the card (header / basic info is always shown). */
export interface CardElementPrefs {
  photo: boolean;
  about: boolean;
  contact: boolean;
}

export const DEFAULT_CARD_ELEMENT_PREFS: CardElementPrefs = {
  photo: false,
  about: false,
  contact: false,
};
