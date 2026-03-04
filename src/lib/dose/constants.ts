import type { DoseModeKey, DoseSectionKey } from "./types";

export const DOSE_SECTION_ORDER: DoseSectionKey[] = [
  "dopamine",
  "oxytocin",
  "serotonin",
  "endorphins",
];

/** Maps each selectable mode to the ordered list of sections it includes */
export const DOSE_MODE_SECTIONS: Record<DoseModeKey, DoseSectionKey[]> = {
  dopamine: ["dopamine"],
  oxytocin: ["oxytocin"],
  serotonin: ["serotonin"],
  endorphins: ["endorphins"],
  all: ["dopamine", "oxytocin", "serotonin", "endorphins"],
};

export type DoseModeOption = {
  key: DoseModeKey;
  label: string;
  sublabel: string;
  accentHex: string;
  emoji: string;
};

/** Display metadata for the 5 selectable modes on the intro page */
export const DOSE_MODE_OPTIONS: DoseModeOption[] = [
  {
    key: "dopamine",
    label: "Dopamine",
    sublabel: "Động lực & phần thưởng",
    accentHex: "#E040FB",
    emoji: "⚡",
  },
  {
    key: "oxytocin",
    label: "Oxytocin",
    sublabel: "Kết nối & an toàn",
    accentHex: "#F4436C",
    emoji: "🤝",
  },
  {
    key: "serotonin",
    label: "Serotonin",
    sublabel: "Ổn định & tự tin",
    accentHex: "#34D399",
    emoji: "🌿",
  },
  {
    key: "endorphins",
    label: "Endorphin",
    sublabel: "Giải toả & phục hồi",
    accentHex: "#818CF8",
    emoji: "🏃",
  },
  {
    key: "all",
    label: "Tổng hợp",
    sublabel: "Cả 4 hormones · 24 câu",
    accentHex: "#F59E0B",
    emoji: "✨",
  },
];
