"use client";

import { DOSE_SECTIONS, getDoseQuestionsForSection } from "@/lib/dose/questions";
import { useDose } from "@/lib/dose/store";
import type { DoseSectionKey, LikertValue } from "@/lib/dose/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

/* ── Cute pastel palette ─────────────────────────────────────── */
const CUTE_THEMES: Record<
    DoseSectionKey,
    {
        accent: string;
        accentBg: string;
        accentDark: string;
        emoji: string;
        label: string;
        interstitialBg: string;
        brainEmoji: string;
        nextEmoji: string;
    }
> = {
    dopamine: {
        accent: "#F9A8D4",
        accentBg: "#FCE7F3",
        accentDark: "#DB2777",
        emoji: "❤️",
        label: "Dopamine",
        interstitialBg: "#FDF2F8",
        brainEmoji: "🧠",
        nextEmoji: "🧡",
    },
    oxytocin: {
        accent: "#FDBA74",
        accentBg: "#FEF3C7",
        accentDark: "#D97706",
        emoji: "🧡",
        label: "Oxytocin",
        interstitialBg: "#FFFBEB",
        brainEmoji: "🤝",
        nextEmoji: "💚",
    },
    serotonin: {
        accent: "#6EE7B7",
        accentBg: "#D1FAE5",
        accentDark: "#059669",
        emoji: "💚",
        label: "Serotonin",
        interstitialBg: "#F0FDF9",
        brainEmoji: "🌿",
        nextEmoji: "💜",
    },
    endorphins: {
        accent: "#C4B5FD",
        accentBg: "#EDE9FE",
        accentDark: "#7C3AED",
        emoji: "💜",
        label: "Endorphins",
        interstitialBg: "#F5F3FF",
        brainEmoji: "⚡",
        nextEmoji: "🌟",
    },
};

const SCALE: Array<{ value: LikertValue; label: string }> = [
    { value: 1, label: "Không bao giờ" },
    { value: 2, label: "Hiếm khi" },
    { value: 3, label: "Đôi khi" },
    { value: 4, label: "Thường xuyên" },
    { value: 5, label: "Hầu như luôn luôn" },
];

const ENCOURAGEMENTS = [
    "Bắt đầu thật tốt nào ✨",
    "Bạn đang làm rất tốt 💫",
    "Tiếp tục nào! 🌸",
    "Gần xong rồi ❆",
    "Câu cuối 🌟",
];

function isSectionKey(value: string): value is DoseSectionKey {
    return ["dopamine", "oxytocin", "serotonin", "endorphins"].includes(value);
}

export default function CuteDoseQuestionClient({
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

    const qIndex = Number(q);
    if (!Number.isFinite(qIndex) || qIndex < 1 || qIndex > 6) notFound();

    const sectionMeta = DOSE_SECTIONS.find((s) => s.key === sectionKey);
    if (!sectionMeta) notFound();

    const theme = CUTE_THEMES[sectionKey];

    const questions = useMemo(
        () => getDoseQuestionsForSection(sectionKey),
        [sectionKey],
    );
    const question = questions[qIndex - 1];
    if (!question) notFound();

    const selected = answers[question.id];

    // ── Navigation hrefs ──────────────────────────────────────
    const prevHref = useMemo(() => {
        if (qIndex > 1) return `/dose/${sectionKey}/${qIndex - 1}`;
        const pos = activeSections.indexOf(sectionKey);
        if (pos > 0) return `/dose/${activeSections[pos - 1]}/6`;
        return `/dose`;
    }, [qIndex, sectionKey, activeSections]);

    const nextHref = useMemo(() => {
        if (qIndex < 6) return `/dose/${sectionKey}/${qIndex + 1}`;
        const pos = activeSections.indexOf(sectionKey);
        if (pos < activeSections.length - 1)
            return `/dose/${activeSections[pos + 1]}/1`;
        return `/dose/results`;
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
            window.setTimeout(() => router.push(nextHref), 1200);
            return;
        }
        router.push(nextHref);
    };

    /* ── Interstitial ─────────────────────────────────────────── */
    if (showInterstitial) {
        const sectionPos = activeSections.indexOf(sectionKey);
        const isLastSection = sectionPos === activeSections.length - 1;
        const nextSectionKey = !isLastSection
            ? (activeSections[sectionPos + 1] as DoseSectionKey)
            : null;
        const nextTheme = nextSectionKey ? CUTE_THEMES[nextSectionKey] : null;
        const nextSectionMeta = nextSectionKey
            ? DOSE_SECTIONS.find((s) => s.key === nextSectionKey)
            : null;
        const totalSections = activeSections.length;

        return (
            <main
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10"
                style={{ background: theme.interstitialBg }}
            >
                {/* Corner blob decorations */}
                <div
                    className="cute-blob-drift pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${theme.accent}66 0%, transparent 70%)`,
                        filter: "blur(32px)",
                    }}
                />
                <div
                    className="cute-blob-drift pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${theme.accent}44 0%, transparent 70%)`,
                        filter: "blur(40px)",
                        animationDelay: "2s",
                    }}
                />

                {/* Section count label */}
                <div
                    className="mb-8 rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                        background: "#FFFFFF",
                        border: `1.5px solid ${theme.accent}`,
                        color: theme.accentDark,
                    }}
                >
                    Phần {sectionPos + 1} / {totalSections} ✓
                </div>

                {/* Brain / emoji illustration */}
                <div className="cute-float relative mb-6 text-8xl leading-none select-none">
                    {isLastSection ? "🌟" : theme.brainEmoji}
                    {/* Sparkle decorations */}
                    <span
                        className="cute-sparkle absolute -right-4 -top-3 text-2xl"
                        style={{ animationDelay: "0.3s" }}
                    >
                        ✦
                    </span>
                    <span
                        className="cute-sparkle absolute -bottom-2 -left-4 text-xl"
                        style={{ color: theme.accentDark, animationDelay: "0.9s" }}
                    >
                        ✦
                    </span>
                    <span
                        className="cute-sparkle absolute right-2 bottom-0 text-sm"
                        style={{ color: theme.accent, animationDelay: "0.6s" }}
                    >
                        ✦
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="mb-2 text-3xl font-black"
                    style={{
                        color: "#1F2937",
                        fontFamily: "var(--font-cute-nunito, inherit)",
                    }}
                >
                    {isLastSection ? "Hoàn thành rồi! 🎉" : `${theme.label} — xong!`}
                </h2>

                {/* Sub-text */}
                <p
                    className="mb-8 text-sm font-medium"
                    style={{ color: "#6B7280", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                >
                    {isLastSection
                        ? "Đang tổng hợp hồ sơ D.O.S.E của bạn…"
                        : `Bạn đã trả lời cả 6 câu hỏi ✨`}
                </p>

                {/* Section progress dots */}
                <div className="mb-8 flex gap-3">
                    {activeSections.map((k, i) => {
                        const done = i <= sectionPos;
                        const dotTheme = CUTE_THEMES[k as DoseSectionKey];
                        return (
                            <div
                                key={k}
                                className="h-3 w-3 rounded-full border-2 transition-all duration-300"
                                style={{
                                    background: done ? dotTheme.accentDark : "transparent",
                                    borderColor: done ? dotTheme.accentDark : "#D1D5DB",
                                }}
                            />
                        );
                    })}
                </div>

                {/* Continue button */}
                {!isLastSection && nextTheme && (
                    <button
                        type="button"
                        onClick={() => router.push(nextHref)}
                        className="rounded-full px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                        style={{
                            background: "white",
                            color: theme.accentDark,
                            border: `2px solid ${theme.accent}`,
                            fontFamily: "var(--font-cute-nunito, inherit)",
                        }}
                    >
                        Tiếp theo: {nextSectionMeta?.title ?? "Tiếp"} {nextTheme.emoji}
                    </button>
                )}
            </main>
        );
    }

    /* ── Question screen ──────────────────────────────────────── */
    return (
        <main
            className="relative flex min-h-screen flex-col"
            style={{ background: "#FDF8F4" }}
        >
            {/* ── Sticky top bar ────────────────────────────────── */}
            <div
                className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
                style={{
                    background: "rgba(253,248,244,0.92)",
                    backdropFilter: "blur(8px)",
                    borderBottom: `1px solid ${theme.accent}55`,
                }}
            >
                {/* ── Logo link (left) ──────────────────────────────── */}
                <a
                    href="/"
                    className="flex w-28 shrink-0 items-center gap-1.5 transition-opacity hover:opacity-70"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/onibiocare-logo.png"
                        alt="Oni Biocare"
                        width={24}
                        height={24}
                        className="rounded-md"
                    />
                    <span
                        className="text-xs font-bold"
                        style={{ color: "#374151", fontFamily: "var(--font-cute-nunito, inherit)" }}
                    >
                        Oni Biocare
                    </span>
                </a>

                {/* Section badge (centered) */}
                <div className="flex flex-1 justify-center">
                    <span
                        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold"
                        style={{
                            background: theme.accentBg,
                            color: theme.accentDark,
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                        }}
                    >
                        <span>{theme.emoji}</span>
                        <span>{theme.label}</span>
                    </span>
                </div>

                {/* Top-right spacer — matches logo width to keep badge centred */}
                <div className="w-28" />
            </div>

            {/* ── Progress dots ─────────────────────────────────── */}
            <div className="flex justify-center gap-1.5 px-4 pt-4">
                {Array.from({ length: 6 }, (_, i) => (
                    <div
                        key={i}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                            width: i < qIndex ? "24px" : "16px",
                            background: i < qIndex ? theme.accentDark : "#E5E7EB",
                        }}
                    />
                ))}
            </div>

            {/* ── Main content ──────────────────────────────────── */}
            <div className="flex flex-1 flex-col px-5 pt-5 pb-24">
                <div className="mx-auto w-full max-w-md space-y-4">

                    {/* Encouragement chip */}
                    <span
                        className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                            background: "#FEF3C7",
                            color: "#D97706",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                        }}
                    >
                        {ENCOURAGEMENTS[Math.min(qIndex - 1, ENCOURAGEMENTS.length - 1)]}
                    </span>

                    {/* Question text */}
                    <h2
                        className="text-xl font-black leading-snug sm:text-2xl"
                        style={{
                            color: "#111827",
                            fontFamily: "var(--font-cute-nunito, inherit)",
                        }}
                    >
                        {question.prompt}
                    </h2>

                    {/* Helper hint */}
                    <p
                        className="text-xs italic"
                        style={{ color: "#9CA3AF", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                    >
                        Hãy nghĩ về cảm giác này gần đây.
                    </p>

                    {/* Answer options */}
                    <div className="space-y-2.5 pt-1">
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
                                        "cute-option-btn w-full rounded-2xl px-5 py-3.5 text-left font-semibold",
                                    )}
                                    style={
                                        isSelected
                                            ? {
                                                background: theme.accentBg,
                                                border: `2px solid ${theme.accentDark}`,
                                                color: theme.accentDark,
                                                boxShadow: `0 4px 16px ${theme.accent}55`,
                                            }
                                            : {
                                                background: "#FFFFFF",
                                                border: "1.5px solid #E5E7EB",
                                                color: "#374151",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                                            }
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <span style={{ fontFamily: "var(--font-cute-quicksand, inherit)", fontSize: "0.9rem" }}>
                                            {opt.label}
                                        </span>
                                        {isSelected && (
                                            <span
                                                className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"
                                                style={{ background: theme.accentDark }}
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Sticky bottom nav ─────────────────────────────── */}
            <div
                className="fixed bottom-0 left-0 right-0 z-20 px-5 py-4"
                style={{
                    background: "rgba(253,248,244,0.95)",
                    backdropFilter: "blur(8px)",
                    borderTop: `1px solid ${theme.accent}44`,
                }}
            >
                <div className="mx-auto flex max-w-md items-center justify-between gap-3">
                    <Link
                        href={prevHref}
                        className="flex items-center gap-1.5 text-sm font-semibold"
                        style={{
                            color: "#6B7280",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                        }}
                    >
                        ← Quay lại
                    </Link>

                    <button
                        type="button"
                        onClick={onNext}
                        disabled={selected === undefined}
                        className="rounded-full px-7 py-2.5 text-sm font-bold text-white transition-all duration-200 disabled:opacity-40"
                        style={
                            selected !== undefined
                                ? {
                                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                                    boxShadow: `0 4px 16px ${theme.accent}66`,
                                    fontFamily: "var(--font-cute-nunito, inherit)",
                                }
                                : {
                                    background: "#E5E7EB",
                                    color: "#9CA3AF",
                                    fontFamily: "var(--font-cute-nunito, inherit)",
                                }
                        }
                    >
                        Tiếp →
                    </button>
                </div>
            </div>
        </main>
    );
}
