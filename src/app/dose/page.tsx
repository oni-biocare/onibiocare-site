"use client";

import { DOSE_MODE_SECTIONS } from "@/lib/dose/constants";
import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { useDose } from "@/lib/dose/store";
import { DoseModeSelector } from "./DoseModeSelector";
import { DoseSnowfall } from "./results/DoseSnowfall";
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

  const activeColor = selectedMode ? (LETTER_COLORS[selectedMode] ?? "#F59E0B") : null;

  // Snow color: active mode accent, or a soft violet when nothing is selected
  const snowColor = activeColor ?? "#A78BFA";

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center p-6"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${snowColor}18 0%, #0D0D18 55%, #0D0D18 100%)`,
      }}
    >
      {/* Snowfall — tinted with the selected hormone colour */}
      <DoseSnowfall accentHex={snowColor} count={45} />
      <div className="flex w-full max-w-sm flex-col items-center gap-8">

        {/* D·O·S·E wordmark — colour-blocked letters with glow */}
        <div className="flex gap-3">
          {DOSE_SECTIONS.map((s) => {
            const color = LETTER_COLORS[s.key];
            return (
              <div
                key={s.key}
                className="dose-float flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${color}DD, ${color}99)`,
                  boxShadow: `0 0 28px ${color}99, 0 0 6px ${color}55 inset`,
                  animationDelay: `${DOSE_SECTIONS.indexOf(s) * 0.3}s`,
                }}
              >
                {s.key[0].toUpperCase()}
              </div>
            );
          })}
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
          >
            Khám Phá D.O.S.E Của Bạn
          </h1>
          <p className="text-base text-slate-300">
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
          style={activeColor ? {
            background: `linear-gradient(135deg, ${activeColor}DD, ${activeColor}99)`,
            boxShadow: `0 0 24px ${activeColor}77, 0 2px 8px ${activeColor}44`,
          } : {
            background: "#252540",
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
