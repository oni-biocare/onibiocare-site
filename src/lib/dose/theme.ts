import type { DoseSectionKey } from "./types";

export type DoseTheme = {
  gradient: string;
  accentSolid: string;
  accentRing: string;
  accentBg: string;
  accentText: string;
  buttonGradient: string;
  buttonText: string;
};

export const DOSE_THEMES: Record<DoseSectionKey, DoseTheme> = {
  dopamine: {
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    accentSolid: "bg-pink-500",
    accentRing: "ring-pink-500/40",
    accentBg: "bg-pink-500/10",
    accentText: "text-pink-500",
    buttonGradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    buttonText: "text-white",
  },
  oxytocin: {
    gradient: "from-rose-500 via-red-500 to-amber-400",
    accentSolid: "bg-rose-500",
    accentRing: "ring-rose-500/40",
    accentBg: "bg-rose-500/10",
    accentText: "text-rose-500",
    buttonGradient: "from-rose-500 via-red-500 to-amber-400",
    buttonText: "text-white",
  },
  serotonin: {
    gradient: "from-emerald-400 via-teal-500 to-cyan-400",
    accentSolid: "bg-emerald-500",
    accentRing: "ring-emerald-500/40",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-500",
    buttonGradient: "from-emerald-400 via-teal-500 to-cyan-400",
    buttonText: "text-slate-950",
  },
  endorphins: {
    gradient: "from-indigo-500 via-violet-500 to-sky-400",
    accentSolid: "bg-violet-500",
    accentRing: "ring-violet-500/40",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-500",
    buttonGradient: "from-indigo-500 via-violet-500 to-sky-400",
    buttonText: "text-white",
  },
};
