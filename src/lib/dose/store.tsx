"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { DoseAnswers, DoseSectionKey, LikertValue } from "@/lib/dose/types";

type DoseState = {
  answers: DoseAnswers;
  setAnswer: (questionId: string, value: LikertValue) => void;
  reset: () => void;
};

const DoseContext = createContext<DoseState | null>(null);

export function DoseProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<DoseAnswers>({});

  const value = useMemo<DoseState>(
    () => ({
      answers,
      setAnswer: (questionId, v) =>
        setAnswers((prev) => ({ ...prev, [questionId]: v })),
      reset: () => setAnswers({}),
    }),
    [answers],
  );

  return <DoseContext.Provider value={value}>{children}</DoseContext.Provider>;
}

export function useDose() {
  const ctx = useContext(DoseContext);
  if (!ctx) throw new Error("useDose must be used within DoseProvider");
  return ctx;
}

export const DOSE_SECTION_ORDER: DoseSectionKey[] = [
  "dopamine",
  "oxytocin",
  "serotonin",
  "endorphins",
];
