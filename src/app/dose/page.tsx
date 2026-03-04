"use client";

import { DOSE_MODE_SECTIONS } from "@/lib/dose/constants";
import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { useDose } from "@/lib/dose/store";
import { DoseModeSelector } from "./DoseModeSelector";
import { useRouter } from "next/navigation";

const LETTER_COLORS: Record<string, string> = {
  dopamine: "#E040FB",
  oxytocin: "#F4436C",
  serotonin: "#34D399",
  endorphins: "#818CF8",
};

export default function DoseIntroPage() {
  const { selectedMode } = useDose();
  const router = useRouter();

  const handleStart = () => {
    if (!selectedMode) return;
    const firstSection = DOSE_MODE_SECTIONS[selectedMode][0];
    router.push(`/dose/${firstSection}/1`);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{ background: "#0F0F14" }}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-8">

        {/* D·O·S·E wordmark — colour-blocked letters */}
        <div className="flex gap-3">
          {DOSE_SECTIONS.map((s) => (
            <div
              key={s.key}
              className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
              style={{ background: LETTER_COLORS[s.key] }}
            >
              {s.key[0].toUpperCase()}
            </div>
          ))}
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
          >
            Khám Phá D.O.S.E Của Bạn
          </h1>
          <p className="text-base text-slate-400">
            Kiểm tra thần kinh học trong vài phút — không cần bằng cấp khoa học.
          </p>
        </div>

        {/* Mode selection menu */}
        <DoseModeSelector />

        {/* CTA — disabled until a mode is chosen */}
        <button
          type="button"
          onClick={handleStart}
          disabled={!selectedMode}
          className="w-full rounded-xl py-4 text-center text-base font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            background: selectedMode
              ? (LETTER_COLORS[selectedMode] ?? "#F59E0B")
              : "#2A2A38",
          }}
        >
          {selectedMode ? "Bắt đầu →" : "Chọn hành trình trước nhé"}
        </button>

        <p className="text-center text-xs text-slate-600">
          Chỉ dành cho tự chiêm nghiệm — không phải chẩn đoán y tế.
        </p>
      </div>
    </main>
  );
}
