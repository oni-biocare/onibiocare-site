"use client";

import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { computeDoseResults } from "@/lib/dose/scoring";
import { useDose } from "@/lib/dose/store";
import type { DoseSectionKey } from "@/lib/dose/types";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ── Cute pastel palette for results ────────────────────────── */
const CUTE_RESULT_THEMES: Record<
    DoseSectionKey,
    { accent: string; accentBg: string; accentDark: string; emoji: string; label: string }
> = {
    dopamine: {
        accent: "#F9A8D4",
        accentBg: "#FCE7F3",
        accentDark: "#DB2777",
        emoji: "❤️",
        label: "Dopamine",
    },
    oxytocin: {
        accent: "#FDBA74",
        accentBg: "#FEF3C7",
        accentDark: "#D97706",
        emoji: "🧡",
        label: "Oxytocin",
    },
    serotonin: {
        accent: "#6EE7B7",
        accentBg: "#D1FAE5",
        accentDark: "#059669",
        emoji: "💚",
        label: "Serotonin",
    },
    endorphins: {
        accent: "#C4B5FD",
        accentBg: "#EDE9FE",
        accentDark: "#7C3AED",
        emoji: "💜",
        label: "Endorphins",
    },
};

const BAND_LABELS: Record<string, string> = {
    "Very Low": "Rất thấp",
    "Low": "Thấp",
    "Moderate": "Trung bình",
    "High": "Cao",
    "Very High": "Rất cao",
};

function sectionTitle(section: DoseSectionKey) {
    const found = DOSE_SECTIONS.find((s) => s.key === section);
    return found?.title ?? section;
}

export default function CuteDoseResultsPage() {
    const router = useRouter();
    const { answers, reset, activeSections, userName, userPhone, selectedMode } = useDose();
    const [sentToast, setSentToast] = useState(false);
    const hasSent = useRef(false);

    const requiredCount = activeSections.length * 6;
    const hasAllAnswers = useMemo(
        () => Object.values(answers).filter((v) => v !== undefined).length === requiredCount,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [answers, requiredCount],
    );

    useEffect(() => {
        if (!hasAllAnswers) router.replace("/dose");
    }, [hasAllAnswers, router]);

    const results = useMemo(
        () => (hasAllAnswers ? computeDoseResults(answers, activeSections) : null),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [answers, hasAllAnswers],
    );

    // ── Send results to Telegram once ──────────────────────────
    useEffect(() => {
        if (!hasAllAnswers || !results || hasSent.current) return;
        hasSent.current = true;

        fetch("/api/dose-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: userName || "(Ẩn danh)",
                phone: userPhone || "—",
                mode: selectedMode ?? "all",
                answers,
                scores: results.scores,
                insights: results.insights,
                activeSections,
            }),
        })
            .then((r) => { if (r.ok) setSentToast(true); })
            .catch(() => { /* silent */ });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasAllAnswers, results]);

    if (!hasAllAnswers || !results) return null;

    const pillarTheme = CUTE_RESULT_THEMES[results.insights.pillar];
    const priorityTheme = CUTE_RESULT_THEMES[results.insights.priority];

    return (
        <main
            className="relative min-h-screen overflow-hidden"
            style={{ background: "#FDF8F4" }}
        >
            {/* ── Top logo bar ─────────────────────────────────────── */}
            <div
                className="sticky top-0 z-10 flex items-center px-4 py-3"
                style={{
                    background: "rgba(253,248,244,0.92)",
                    backdropFilter: "blur(8px)",
                    borderBottom: "1px solid rgba(196,181,253,0.25)",
                }}
            >
                <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/onibiocare-logo.png" alt="Oni Biocare" width={24} height={24} className="rounded-md" />
                    <span className="text-sm font-bold" style={{ color: "#374151", fontFamily: "var(--font-cute-nunito, inherit)" }}>
                        Oni Biocare
                    </span>
                </a>
            </div>

            {/* Pastel blob decorations */}
            <div
                className="cute-blob-drift pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60"
                style={{
                    background: `radial-gradient(circle, ${pillarTheme.accent}88 0%, transparent 70%)`,
                    filter: "blur(48px)",
                }}
            />
            <div
                className="cute-blob-drift pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full opacity-40"
                style={{
                    background: `radial-gradient(circle, ${priorityTheme.accent}66 0%, transparent 70%)`,
                    filter: "blur(48px)",
                    animationDelay: "3s",
                }}
            />

            <div className="relative z-10 mx-auto max-w-md px-5 pb-16 pt-8">

                {/* ── Header ─────────────────────────────────────────── */}
                <div className="mb-8 text-center">
                    <div
                        className="mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
                        style={{ background: pillarTheme.accentBg, color: pillarTheme.accentDark }}
                    >
                        <span>✦</span>
                        <span style={{ fontFamily: "var(--font-cute-quicksand, inherit)" }}>
                            Hồ sơ D.O.S.E của bạn
                        </span>
                    </div>
                    <h1
                        className="text-2xl font-black leading-snug"
                        style={{
                            color: "#111827",
                            fontFamily: "var(--font-cute-nunito, inherit)",
                        }}
                    >
                        {results.insights.balance}
                    </h1>
                </div>

                {/* ── Pillar + Priority highlight cards ──────────────── */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                    <div
                        className="rounded-2xl p-4 text-center"
                        style={{
                            background: pillarTheme.accentBg,
                            border: `2px solid ${pillarTheme.accent}`,
                        }}
                    >
                        <div className="mb-1 text-2xl">{pillarTheme.emoji}</div>
                        <div
                            className="text-xs font-semibold uppercase tracking-wide"
                            style={{ color: pillarTheme.accentDark, fontFamily: "var(--font-cute-quicksand, inherit)" }}
                        >
                            Điểm mạnh
                        </div>
                        <div
                            className="mt-0.5 text-base font-black"
                            style={{ color: pillarTheme.accentDark, fontFamily: "var(--font-cute-nunito, inherit)" }}
                        >
                            {sectionTitle(results.insights.pillar)}
                        </div>
                    </div>

                    {activeSections.length > 1 && (
                        <div
                            className="rounded-2xl p-4 text-center"
                            style={{
                                background: priorityTheme.accentBg,
                                border: `2px solid ${priorityTheme.accent}`,
                            }}
                        >
                            <div className="mb-1 text-2xl">{priorityTheme.emoji}</div>
                            <div
                                className="text-xs font-semibold uppercase tracking-wide"
                                style={{ color: priorityTheme.accentDark, fontFamily: "var(--font-cute-quicksand, inherit)" }}
                            >
                                Ưu tiên phát triển
                            </div>
                            <div
                                className="mt-0.5 text-base font-black"
                                style={{ color: priorityTheme.accentDark, fontFamily: "var(--font-cute-nunito, inherit)" }}
                            >
                                {sectionTitle(results.insights.priority)}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Score cards ────────────────────────────────────── */}
                <div className="space-y-3">
                    {activeSections.map((key: DoseSectionKey) => {
                        const s = results.scores[key];
                        const t = CUTE_RESULT_THEMES[key];
                        const pct = Math.round(((s.raw - 6) / 24) * 100);

                        return (
                            <div
                                key={key}
                                className="rounded-2xl p-4"
                                style={{
                                    background: "#FFFFFF",
                                    border: `1.5px solid ${t.accent}`,
                                    boxShadow: `0 4px 16px ${t.accent}33`,
                                }}
                            >
                                {/* Header row */}
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{t.emoji}</span>
                                        <span
                                            className="text-base font-black"
                                            style={{ color: "#111827", fontFamily: "var(--font-cute-nunito, inherit)" }}
                                        >
                                            {t.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-sm font-bold"
                                            style={{ color: t.accentDark, fontFamily: "var(--font-cute-nunito, inherit)" }}
                                        >
                                            {s.raw}/30
                                        </span>
                                        <span
                                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                                            style={{
                                                background: t.accentBg,
                                                color: t.accentDark,
                                                fontFamily: "var(--font-cute-quicksand, inherit)",
                                            }}
                                        >
                                            {BAND_LABELS[s.band] ?? s.band}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div
                                    className="mb-3 h-2.5 w-full overflow-hidden rounded-full"
                                    style={{ background: t.accentBg }}
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{
                                            width: `${Math.max(pct, 4)}%`,
                                            background: `linear-gradient(90deg, ${t.accent}, ${t.accentDark})`,
                                        }}
                                    />
                                </div>

                                {/* State description */}
                                <p
                                    className="mb-2 text-sm"
                                    style={{ color: "#374151", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                                >
                                    {s.state}
                                </p>

                                {/* Pattern chips */}
                                {s.patterns.some((p: string) => p.length > 0) && (
                                    <div className="mb-2 flex flex-wrap gap-1.5">
                                        {s.patterns
                                            .filter((p: string) => p.length > 0)
                                            .map((p: string) => (
                                                <span
                                                    key={p}
                                                    className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                                                    style={{
                                                        background: t.accentBg,
                                                        color: t.accentDark,
                                                        fontFamily: "var(--font-cute-quicksand, inherit)",
                                                    }}
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                    </div>
                                )}

                                {/* Suggestions */}
                                {s.suggestions && s.suggestions.length > 0 && (
                                    <ul className="space-y-0.5">
                                        {s.suggestions.map((sug: string) => (
                                            <li
                                                key={sug}
                                                className="flex items-start gap-1.5 text-xs"
                                                style={{ color: "#6B7280", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                                            >
                                                <span style={{ color: t.accentDark, flexShrink: 0 }}>›</span>
                                                {sug}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── CTAs ────────────────────────────────────────────── */}
                <div className="mt-6 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            void (typeof window !== "undefined" && (window.location.href = "/dose"));
                        }}
                        className="w-full rounded-full py-3.5 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                        style={{
                            background: `linear-gradient(135deg, ${pillarTheme.accent}, ${pillarTheme.accentDark})`,
                            boxShadow: `0 6px 20px ${pillarTheme.accent}66`,
                            fontFamily: "var(--font-cute-nunito, inherit)",
                        }}
                    >
                        Làm lại bài kiểm tra ✨
                    </button>

                    <Link
                        href="/dose"
                        className="w-full rounded-full border-2 py-3 text-center text-sm font-bold transition-all duration-200 hover:opacity-80"
                        style={{
                            borderColor: "#E5E7EB",
                            color: "#6B7280",
                            background: "#FFFFFF",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                        }}
                    >
                        ← Quay lại đầu
                    </Link>
                </div>

                <p
                    className="mt-6 text-center text-[10px] leading-relaxed"
                    style={{ color: "#9CA3AF" }}
                >
                    Chỉ dành cho tự chiêm nghiệm — không phải chẩn đoán y tế. Câu trả lời của bạn hoàn toàn riêng tư.
                </p>
            </div>

            {/* ── Telegram sent toast ──────────────────────────────── */}
            {sentToast && (
                <div
                    className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
                    style={{
                        background: "linear-gradient(135deg, #6EE7B7, #059669)",
                        boxShadow: "0 4px 20px rgba(110,231,183,0.45)",
                        fontFamily: "var(--font-cute-quicksand, inherit)",
                        animation: "cute-pop 0.3s ease-out",
                    }}
                >
                    <span>✓</span>
                    <span>Kết quả đã gửi thành công!</span>
                </div>
            )}
        </main>
    );
}
