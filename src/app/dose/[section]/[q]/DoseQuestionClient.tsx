"use client";

import { DOSE_SECTIONS, getDoseQuestionsForSection } from "@/lib/dose/questions";
import { DOSE_THEMES } from "@/lib/dose/theme";
import { useDose } from "@/lib/dose/store";
import type { DoseSectionKey, LikertValue } from "@/lib/dose/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import { getDoseInterstitialAnimation } from "@/lib/dose/interstitialAnimations";
import { DoseSnowfall } from "../../results/DoseSnowfall";
import { notFound, useRouter } from "next/navigation";

const SCALE: Array<{ value: LikertValue; label: string; emoji: string }> = [
  { value: 1, label: "Không bao giờ", emoji: "😶" },
  { value: 2, label: "Hiếm khi", emoji: "😕" },
  { value: 3, label: "Đôi khi", emoji: "😐" },
  { value: 4, label: "Thường xuyên", emoji: "🙂" },
  { value: 5, label: "Hầu như luôn luôn", emoji: "🌟" },
];

function isSectionKey(value: string): value is DoseSectionKey {
  return (
    value === "dopamine" ||
    value === "oxytocin" ||
    value === "serotonin" ||
    value === "endorphins"
  );
}

function sectionLabel(section: DoseSectionKey) {
  const found = DOSE_SECTIONS.find((s) => s.key === section);
  return found?.title ?? section;
}

function helperLine(section: DoseSectionKey) {
  switch (section) {
    case "dopamine": return "Hãy nghĩ về động lực, sự tập trung và khả năng kiên trì.";
    case "oxytocin": return "Hãy nghĩ về sự gần gũi, tin tưởng và an toàn cảm xúc.";
    case "serotonin": return "Hãy nghĩ về sự ổn định, tự tin và khả năng bình phục bình thản.";
    case "endorphins": return "Hãy nghĩ về sự giải toả, làm mới và giảm căng thẳng.";
  }
}

function encouragement(qIndex: number) {
  if (qIndex <= 1) return "Bắt đầu thật tốt nào.";
  if (qIndex <= 3) return "Tốt lắm — tiếp tục thôi.";
  if (qIndex <= 5) return "Bạn đang rất tốt đấy.";
  return "Câu cuối của phần này.";
}

export default function DoseQuestionClient({
  section,
  q,
}: {
  section: string;
  q: string;
}) {
  const router = useRouter();
  const { answers, setAnswer, activeSections } = useDose();

  if (!isSectionKey(section)) notFound();
  const sectionKey = section;

  // Guard: if this section is not in the active mode, redirect to /dose
  // (handles direct URL navigation while a single-hormone mode is selected)
  // We can't call hooks conditionally, so we do the check after hooks.

  const theme = DOSE_THEMES[sectionKey];

  const qIndex = Number(q);
  if (!Number.isFinite(qIndex) || qIndex < 1 || qIndex > 6) notFound();

  const sectionMeta = DOSE_SECTIONS.find((s) => s.key === sectionKey);
  if (!sectionMeta) notFound();

  const questions = useMemo(
    () => getDoseQuestionsForSection(sectionKey),
    [sectionKey],
  );
  const question = questions[qIndex - 1];
  if (!question) notFound();

  const selected = answers[question.id];

  const prevHref = useMemo(() => {
    if (qIndex > 1) return `/dose/${sectionKey}/${qIndex - 1}`;
    const sectionPos = activeSections.indexOf(sectionKey);
    if (sectionPos > 0) {
      const prevSection = activeSections[sectionPos - 1];
      return `/dose/${prevSection}/6`;
    }
    return `/dose`;
  }, [qIndex, sectionKey, activeSections]);

  const nextHref = useMemo(() => {
    if (qIndex < 6) return `/dose/${sectionKey}/${qIndex + 1}`;
    const sectionPos = activeSections.indexOf(sectionKey);
    if (sectionPos < activeSections.length - 1) {
      const nextSection = activeSections[sectionPos + 1];
      return `/dose/${nextSection}/1`;
    }
    return `/dose/results`;
  }, [qIndex, sectionKey, activeSections]);

  const nextLabel = useMemo(() => {
    if (qIndex < 6) return "Tiếp →";
    const sectionPos = activeSections.indexOf(sectionKey);
    if (sectionPos < activeSections.length - 1) {
      const nextSection = DOSE_SECTIONS.find(
        (s) => s.key === activeSections[sectionPos + 1],
      );
      return `${nextSection?.title ?? "Tiếp"} →`;
    }
    return "Xem Kết Quả →";
  }, [qIndex, sectionKey, activeSections]);

  const [showInterstitial, setShowInterstitial] = useState(false);

  useEffect(() => {
    setShowInterstitial(false);
  }, [sectionKey, qIndex]);

  const onNext = () => {
    if (selected === undefined) return;
    if (qIndex === 6) {
      setShowInterstitial(true);
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(15);
      }
      window.setTimeout(() => router.push(nextHref), 900);
      return;
    }
    router.push(nextHref);
  };

  /* ─── Interstitial ─────────────────────────────────────── */
  if (showInterstitial) {
    const sectionPos = activeSections.indexOf(sectionKey);
    const isLastSection = sectionPos === activeSections.length - 1;

    // Use NEXT section's identity for the animation preview
    const nextSectionKey = !isLastSection
      ? activeSections[sectionPos + 1]
      : null;
    const nextTheme = nextSectionKey ? DOSE_THEMES[nextSectionKey] : null;
    const nextSectionMeta = nextSectionKey
      ? DOSE_SECTIONS.find((s) => s.key === nextSectionKey)
      : null;
    const animationData = nextSectionKey
      ? getDoseInterstitialAnimation(nextSectionKey)
      : getDoseInterstitialAnimation(sectionKey);

    const displayAccent = nextTheme?.accentHex ?? theme.accentHex;

    return (
      <main
        className="relative flex min-h-screen items-center justify-center p-6"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${displayAccent}18 0%, #0D0D18 60%)`,
        }}
      >
        <DoseSnowfall accentHex={displayAccent} count={40} />
        <div
          className="w-full max-w-sm rounded-2xl p-8 text-center"
          style={{
            background: "#18182A",
            border: `2px solid ${displayAccent}55`,
            boxShadow: `0 0 40px ${displayAccent}33, 0 0 12px ${displayAccent}22 inset`,
          }}
        >
          {/* Animation icon — themed to the NEXT section */}
          <div
            className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-xl dose-glow-pulse"
            style={{
              background: `radial-gradient(circle, ${displayAccent}44, ${displayAccent}18)`,
              border: `1px solid ${displayAccent}66`,
              boxShadow: `0 0 20px ${displayAccent}44`,
            }}
          >
            {isLastSection ? (
              /* Final section: star completion icon */
              <span className="text-5xl">🌟</span>
            ) : (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="h-16 w-16"
              />
            )}
          </div>

          {/* "Section complete" label */}
          <div
            className="mb-1 text-xs font-semibold uppercase tracking-widest"
            style={{ color: theme.accentHex }}
          >
            {sectionMeta.title} · Xong ✓
          </div>

          {/* Next section teaser OR results CTA */}
          {isLastSection ? (
            <>
              <div
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
              >
                Bạn đã hoàn thành!
              </div>
              <div className="mt-2 text-sm text-slate-400">
                Đang tổng hợp hồ sơ D.O.S.E của bạn…
              </div>
            </>
          ) : (
            <>
              <div className="mb-0.5 text-xs text-slate-500">Tiếp theo</div>
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-dose-grotesk, inherit)",
                  color: displayAccent,
                  textShadow: `0 0 20px ${displayAccent}88`,
                }}
              >
                {nextSectionMeta?.title}
              </div>
              <div className="mt-1 text-sm text-slate-400">
                {nextSectionMeta?.subtitle}
              </div>
            </>
          )}

          {/* Segmented section progress bar — only active sections */}
          <div className="mt-6 flex gap-1 justify-center">
            {activeSections.map((k, i) => {
              const done = i <= sectionPos;
              const isNext = i === sectionPos + 1;
              return (
                <div
                  key={k}
                  className="h-1.5 flex-1 rounded-full transition-colors duration-500"
                  style={{
                    background: done
                      ? theme.accentHex
                      : isNext
                        ? displayAccent + "55"
                        : "#252540",
                    boxShadow: done ? `0 0 6px ${theme.accentHex}88` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    );
  }


  /* ─── Question screen ───────────────────────────────────── */
  return (
    <main
      className="relative flex min-h-screen flex-col"
      style={{
        background: `radial-gradient(ellipse 90% 40% at 50% 0%, ${theme.accentHex}18 0%, #0D0D18 50%)`,
      }}
    >
      <DoseSnowfall accentHex={theme.accentHex} count={40} />
      {/* ── Sticky top bar ────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 border-b px-4 py-3 backdrop-blur-sm"
        style={{
          background: "#0D0D18CC",
          borderColor: theme.accentHex + "44",
        }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <span
            className="rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: theme.accentHex + "33",
              color: theme.accentHex,
              border: `1px solid ${theme.accentHex}55`,
              boxShadow: `0 0 8px ${theme.accentHex}33`,
            }}
          >
            {sectionLabel(sectionKey)}
          </span>

          <span
            className="text-xs text-slate-500"
            style={{ fontFamily: "var(--font-dose-mono, monospace)" }}
          >
            Câu {qIndex} / 6
          </span>
        </div>
      </div>

      {/* ── Segmented progress bar ────────────────────────── */}
      <div className="px-4 pt-3">
        <div className="mx-auto flex max-w-2xl gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{
                background: i < qIndex ? theme.accentHex : "#252540",
                boxShadow: i < qIndex ? `0 0 8px ${theme.accentHex}88` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center p-4 pb-0">
        <div className="w-full max-w-2xl space-y-6 pt-4">
          <p className="text-xs italic text-slate-500">{helperLine(sectionKey)}</p>

          <span
            className="inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
            style={{
              background: theme.accentHex + "22",
              color: theme.accentHex + "CC",
              border: `1px solid ${theme.accentHex}33`,
            }}
          >
            {encouragement(qIndex)}
          </span>

          <h2
            className="text-xl font-bold leading-snug text-white sm:text-2xl"
            style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
          >
            {question.prompt}
          </h2>

          {/* Answer options */}
          <div className="space-y-2.5">
            {SCALE.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setAnswer(question.id, opt.value);
                    if (typeof window !== "undefined" && "vibrate" in navigator) {
                      navigator.vibrate(10);
                    }
                  }}
                  className={cn(
                    "w-full rounded-xl px-4 py-3.5 text-left transition-all duration-200",
                    "active:scale-[0.97] focus-visible:outline-none",
                  )}
                  style={
                    isSelected
                      ? {
                        background: `linear-gradient(135deg, ${theme.accentHex}EE, ${theme.accentHex}BB)`,
                        color: theme.badgeBtnTextClass === "text-slate-950" ? "#0F0F14" : "#fff",
                        boxShadow: `0 0 20px ${theme.accentHex}66, 0 0 6px ${theme.accentHex}44 inset`,
                        border: `1px solid ${theme.accentHex}`,
                      }
                      : {
                        background: "#252540",
                        color: "#CBD5E1",
                        borderLeft: `3px solid ${theme.accentHex}33`,
                        border: `1px solid #252540`,
                      }
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-lg leading-none transition-transform duration-200"
                      style={{ transform: isSelected ? "scale(1.2)" : "scale(1)" }}
                    >
                      {opt.emoji}
                    </span>
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{
                          fontFamily: "var(--font-dose-mono, monospace)",
                          opacity: 0.6,
                        }}
                      >
                        {opt.value}
                      </span>
                      <span className="ml-2 text-sm font-medium">{opt.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Sticky bottom nav ─────────────────────────────── */}
      <div
        className="sticky bottom-0 border-t px-4 py-4 backdrop-blur-sm"
        style={{ background: "#0D0D18CC", borderColor: theme.accentHex + "33" }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Link
            href={prevHref}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-white"
            style={{ background: "#252540", border: "1px solid #303060" }}
            aria-label="Quay lại"
          >
            ←
          </Link>

          <button
            type="button"
            onClick={onNext}
            disabled={selected === undefined}
            className="flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-30"
            style={{
              background: selected !== undefined
                ? `linear-gradient(135deg, ${theme.accentHex}EE, ${theme.accentHex}AA)`
                : "#252540",
              color: theme.badgeBtnTextClass === "text-slate-950" ? "#0F0F14" : "#fff",
              boxShadow: selected !== undefined ? `0 0 18px ${theme.accentHex}66` : "none",
            }}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
