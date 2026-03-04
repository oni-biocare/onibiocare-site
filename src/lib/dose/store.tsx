"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { DoseAnswers, DoseModeKey, DoseSectionKey, LikertValue } from "@/lib/dose/types";
import { DOSE_MODE_SECTIONS, DOSE_SECTION_ORDER } from "@/lib/dose/constants";

type DoseState = {
  answers: DoseAnswers;
  setAnswer: (questionId: string, value: LikertValue) => void;
  reset: () => void;
  /** The mode the user selected on the intro page (null = not yet selected) */
  selectedMode: DoseModeKey | null;
  setMode: (mode: DoseModeKey) => void;
  /** Ordered list of sections active for the current mode */
  activeSections: DoseSectionKey[];
};

const DoseContext = createContext<DoseState | null>(null);

export function DoseProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<DoseAnswers>({});
  const [selectedMode, setSelectedMode] = useState<DoseModeKey | null>(null);

  const activeSections = useMemo<DoseSectionKey[]>(
    () => (selectedMode ? DOSE_MODE_SECTIONS[selectedMode] : DOSE_SECTION_ORDER),
    [selectedMode],
  );

  const value = useMemo<DoseState>(
    () => ({
      answers,
      setAnswer: (questionId, v) =>
        setAnswers((prev) => ({ ...prev, [questionId]: v })),
      reset: () => {
        setAnswers({});
        setSelectedMode(null);
      },
      selectedMode,
      setMode: (mode) => {
        setSelectedMode(mode);
        setAnswers({});
      },
      activeSections,
    }),
    [answers, selectedMode, activeSections],
  );

  return <DoseContext.Provider value={value}>{children}</DoseContext.Provider>;
}

export function useDose() {
  const ctx = useContext(DoseContext);
  if (!ctx) throw new Error("useDose must be used within DoseProvider");
  return ctx;
}
