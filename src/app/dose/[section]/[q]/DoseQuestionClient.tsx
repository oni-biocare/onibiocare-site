"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DOSE_SECTIONS, getDoseQuestionsForSection } from "@/lib/dose/questions";
import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import { DOSE_THEMES } from "@/lib/dose/theme";
import { useDose } from "@/lib/dose/store";
import type { DoseSectionKey, LikertValue } from "@/lib/dose/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import { getDoseInterstitialAnimation } from "@/lib/dose/interstitialAnimations";
import { notFound, useRouter } from "next/navigation";

const SCALE: Array<{ value: LikertValue; label: string }> = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Almost always" },
];

function isSectionKey(value: string): value is DoseSectionKey {
  return (
    value === "dopamine" ||
    value === "oxytocin" ||
    value === "serotonin" ||
    value === "endorphins"
  );
}

function helperLine(section: DoseSectionKey) {
  switch (section) {
    case "dopamine":
      return "Think about momentum, focus, and follow-through.";
    case "oxytocin":
      return "Think about closeness, trust, and emotional safety.";
    case "serotonin":
      return "Think about steadiness, confidence, and calm recovery.";
    case "endorphins":
      return "Think about release, reset, and stress relief.";
  }
}

function encouragement(qIndex: number) {
  if (qIndex <= 1) return "Let’s start strong.";
  if (qIndex <= 3) return "Nice—keep going.";
  if (qIndex <= 5) return "You’re on a roll.";
  return "Final one in this section.";
}

export default function DoseQuestionClient({
  section,
  q,
}: {
  section: string;
  q: string;
}) {
  const router = useRouter();
  const { answers, setAnswer } = useDose();

  if (!isSectionKey(section)) notFound();
  const sectionKey = section;

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
    const sectionPos = DOSE_SECTION_ORDER.indexOf(sectionKey);
    if (sectionPos > 0) {
      const prevSection = DOSE_SECTION_ORDER[sectionPos - 1];
      return `/dose/${prevSection}/6`;
    }
    return `/dose`;
  }, [qIndex, sectionKey]);

  const nextHref = useMemo(() => {
    if (qIndex < 6) return `/dose/${sectionKey}/${qIndex + 1}`;
    const sectionPos = DOSE_SECTION_ORDER.indexOf(sectionKey);
    if (sectionPos < DOSE_SECTION_ORDER.length - 1) {
      const nextSection = DOSE_SECTION_ORDER[sectionPos + 1];
      return `/dose/${nextSection}/1`;
    }
    return `/dose/results`;
  }, [qIndex, sectionKey]);

  const nextLabel = useMemo(() => {
    if (qIndex < 6) return "Next";
    const sectionPos = DOSE_SECTION_ORDER.indexOf(sectionKey);
    if (sectionPos < DOSE_SECTION_ORDER.length - 1) {
      const nextSection = DOSE_SECTIONS.find(
        (s) => s.key === DOSE_SECTION_ORDER[sectionPos + 1],
      );
      return `Continue to ${nextSection?.title ?? "Next"}`;
    }
    return "See results";
  }, [qIndex, sectionKey]);

  const progressPct = useMemo(() => (qIndex / 6) * 100, [qIndex]);

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

  if (showInterstitial) {
    const animationData = getDoseInterstitialAnimation(sectionKey);

    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-30",
            "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]",
          )}
        />
        <div className={cn("absolute inset-0 -z-10 ")} />

        <div
          className={cn(
            "relative w-full max-w-md overflow-hidden rounded-3xl",
            "border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl",
            "dark:border-white/10 dark:bg-black/30",
          )}
        >
          <div className={cn("absolute inset-0")} />

          <div className="relative p-6 sm:p-7 text-center">
            <div
              className={cn(
                "mx-auto mb-5 grid h-28 w-28 place-items-center rounded-2xl",
                "bg-white/60 ring-1 ring-black/5",
                "shadow-sm",
                "dark:bg-white/10 dark:ring-white/10",
                "animate-in fade-in zoom-in-95 duration-300",
              )}
              aria-hidden="true"
            >
              <Lottie animationData={animationData} loop autoplay className="h-20 w-20" />
            </div>

            <div className={cn("animate-in fade-in slide-in-from-bottom-2 duration-300", "text-xs font-semibold tracking-wide text-slate-700/80", "dark:text-white/70")}>
              You’re done with this section
            </div>

            <div
              className={cn(
                "animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75",
                "mt-2 text-2xl font-semibold tracking-tight",
                "text-slate-900 dark:text-white", theme.accentText,
              )}
            >
              {sectionMeta.title}
            </div>

            <div
              className={cn(
                "animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100",
                "mt-2 text-sm text-slate-700/90 dark:text-white/80",
              )}
            >
              Saving your answers and taking you to what’s next.
            </div>

            <div className="mt-6">
              <div className={cn("mx-auto h-1.5 w-40 overflow-hidden rounded-full", "bg-black/10 dark:bg-white/15")}>
                <div className={cn("h-full w-full", "animate-[dose-indeterminate_900ms_ease-in-out_infinite]", "bg-black/30 dark:bg-white/40")} />
              </div>
              <style jsx>{`
                @keyframes dose-indeterminate {
                  0% {
                    transform: translateX(-60%);
                  }
                  50% {
                    transform: translateX(0%);
                  }
                  100% {
                    transform: translateX(60%);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-30",
          "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]",
        )}
      />

      <div className="container mx-auto flex min-h-screen max-w-2xl flex-col p-4">
        <div className="ml-1 mt-4 mb-2 text-lg font-semibold leading-snug sm:text-xl text-heading">{qIndex} / 6</div>

        <Card>
          <div className="h-1 w-full overflow-hidden rounded-lg bg-muted">
            <div
              className={cn(
                "h-1 transition-all overflow-hidden duration-500 ease-out bg-primary rounded-lg",
              )}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="p-4 sm:p-6">

            <div className="space-y-6">

              <div className="space-y-2">
                <div className="text-lg font-semibold leading-snug sm:text-xl">
                  {question.prompt}
                </div>
              </div>

              <div className="space-y-3">
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
                        "w-full rounded-md border p-4 text-left",
                        "transition-all duration-200 ease-out",
                        "active:scale-[0.99]",
                        "hover:scale-[1.005]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isSelected
                          ? cn(
                            "border-transparent ring-2",
                            theme.accentRing,
                            theme.accentBg,
                          )
                          : "",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Label className="text-base font-medium">
                          {opt.value}. {opt.label}
                        </Label>

                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <Button variant="outline" asChild className="w-28">
                  <Link href={prevHref}>Back</Link>
                </Button>

                <Button
                  className={cn(
                    "min-w-40 bg-gradient-to-r hover:opacity-95",
                    theme.buttonGradient,
                    theme.buttonText,
                  )}
                  disabled={selected === undefined}
                  onClick={onNext}
                >
                  {nextLabel}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
