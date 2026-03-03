import type { DoseSectionKey } from "./types";

export type DoseTheme = {
  accentHex: string;
  accentTextClass: string;
  badgeBtnTextClass: string; // text color on filled accent bg
};

export const DOSE_THEMES: Record<DoseSectionKey, DoseTheme> = {
  dopamine: {
    accentHex: "#E040FB",
    accentTextClass: "text-fuchsia-400",
    badgeBtnTextClass: "text-white",
  },
  oxytocin: {
    accentHex: "#F4436C",
    accentTextClass: "text-rose-400",
    badgeBtnTextClass: "text-white",
  },
  serotonin: {
    accentHex: "#34D399",
    accentTextClass: "text-emerald-400",
    badgeBtnTextClass: "text-slate-950",
  },
  endorphins: {
    accentHex: "#818CF8",
    accentTextClass: "text-indigo-400",
    badgeBtnTextClass: "text-white",
  },
};
