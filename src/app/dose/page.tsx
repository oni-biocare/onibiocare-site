"use client";

import { DOSE_MODE_OPTIONS, DOSE_MODE_SECTIONS } from "@/lib/dose/constants";
import { useDose } from "@/lib/dose/store";
import type { DoseModeKey } from "@/lib/dose/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserInfoModal } from "./UserInfoModal";

/* ── Cute theme per hormone / "all" ─────────────────────────── */
const CUTE_MODE_COLORS: Record<
    string,
    { accent: string; accentBg: string; accentDark: string }
> = {
    dopamine: { accent: "#F9A8D4", accentBg: "#FCE7F3", accentDark: "#DB2777" },
    oxytocin: { accent: "#FDBA74", accentBg: "#FEF3C7", accentDark: "#D97706" },
    serotonin: { accent: "#6EE7B7", accentBg: "#D1FAE5", accentDark: "#059669" },
    endorphins: { accent: "#C4B5FD", accentBg: "#EDE9FE", accentDark: "#7C3AED" },
    all: { accent: "#C4B5FD", accentBg: "#F3F0FF", accentDark: "#6D28D9" },
};

const LETTER_COLORS = ["#F9A8D4", "#FDBA74", "#6EE7B7", "#C4B5FD"];
const LETTERS = ["D", ".", "O", ".", "S", ".", "E"];

export default function CuteDoseIntroPage() {
    const router = useRouter();
    const { selectedMode, setMode, setUserInfo } = useDose();
    const [showModal, setShowModal] = useState(false);

    const handleStart = () => {
        if (!selectedMode) return;
        setShowModal(true);
    };

    const handleConfirm = (name: string, phone: string) => {
        if (!selectedMode) return;
        setUserInfo(name, phone);
        setShowModal(false);
        const firstSection = DOSE_MODE_SECTIONS[selectedMode][0];
        router.push(`/dose/${firstSection}/1`);
    };

    const activeColors = selectedMode ? CUTE_MODE_COLORS[selectedMode] : null;

    return (
        <main
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10"
            style={{ background: "#FDF8F4" }}
        >
            {/* ── Top logo bar ─────────────────────────────────────── */}
            <div
                className="absolute left-0 right-0 top-0 flex items-center px-4 py-3"
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

            {/* ── Blurred pastel blob decorations ─────────────────── */}
            <div
                className="cute-blob-drift pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-60"
                style={{
                    background: "radial-gradient(circle, #FBCFE8 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                className="cute-blob-drift pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-50"
                style={{
                    background: "radial-gradient(circle, #DDD6FE 0%, transparent 70%)",
                    filter: "blur(48px)",
                    animationDelay: "2.5s",
                }}
            />
            <div
                className="cute-blob-drift pointer-events-none absolute bottom-1/3 -left-10 h-48 w-48 rounded-full opacity-40"
                style={{
                    background: "radial-gradient(circle, #A7F3D0 0%, transparent 70%)",
                    filter: "blur(36px)",
                    animationDelay: "1.2s",
                }}
            />

            {/* ── Main content ─────────────────────────────────────── */}
            <div className="relative z-10 flex w-full max-w-xs flex-col items-center gap-5 text-center">

                {/* Top badge */}
                <div
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #DDD6FE",
                        color: "#7C3AED",
                        boxShadow: "0 2px 8px rgba(196,181,253,0.25)",
                    }}
                >
                    <span>✦</span>
                    <span style={{ fontFamily: "var(--font-cute-quicksand, inherit)" }}>
                        Kiểm tra sức khoẻ
                    </span>
                </div>

                {/* ── D.O.S.E wordmark ─────────────────────────────── */}
                <div
                    className="flex items-baseline gap-0"
                    style={{ fontFamily: "var(--font-cute-nunito, inherit)" }}
                >
                    {LETTERS.map((char, i) => {
                        if (char === ".") {
                            return (
                                <span key={i} className="mx-0.5 text-4xl font-black" style={{ color: "#D1D5DB" }}>
                                    .
                                </span>
                            );
                        }
                        const colorIdx = Math.floor(i / 2);
                        const color = LETTER_COLORS[colorIdx];
                        return (
                            <span
                                key={i}
                                className="cute-float inline-block text-6xl font-black leading-none"
                                style={{ color, animationDelay: `${colorIdx * 0.25}s` }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Subtitle */}
                <h1
                    className="text-xl font-bold"
                    style={{ color: "#1F2937", fontFamily: "var(--font-cute-nunito, inherit)" }}
                >
                    Khám phá hormone hạnh phúc của bạn
                </h1>

                {/* ── Mode selector ─────────────────────────────────── */}
                <div className="w-full space-y-2 text-left">
                    <p
                        className="mb-1 text-[11px] font-semibold uppercase tracking-widest"
                        style={{ color: "#9CA3AF", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                    >
                        Chọn hành trình của bạn
                    </p>

                    {DOSE_MODE_OPTIONS.map((opt) => {
                        const isSelected = selectedMode === opt.key;
                        const colors = CUTE_MODE_COLORS[opt.key];
                        const isAll = opt.key === "all";

                        return (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => setMode(opt.key as DoseModeKey)}
                                className="cute-option-btn w-full rounded-2xl px-4 py-3 text-left"
                                style={
                                    isSelected
                                        ? {
                                            background: colors.accentBg,
                                            border: `2px solid ${colors.accentDark}`,
                                            boxShadow: `0 4px 16px ${colors.accent}55`,
                                        }
                                        : {
                                            background: "#FFFFFF",
                                            border: "1.5px solid #E5E7EB",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                                        }
                                }
                            >
                                <div className="flex items-center gap-3">
                                    {/* Emoji icon */}
                                    <div
                                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200"
                                        style={{
                                            background: isSelected ? colors.accentBg : "#F9FAFB",
                                            border: `1.5px solid ${isSelected ? colors.accent : "#E5E7EB"}`,
                                        }}
                                    >
                                        {opt.emoji}
                                    </div>

                                    {/* Labels */}
                                    <div className="flex flex-1 flex-col gap-0">
                                        <span
                                            className="text-sm font-bold leading-tight"
                                            style={
                                                isAll && isSelected
                                                    ? {
                                                        background:
                                                            "linear-gradient(90deg, #F9A8D4, #FDBA74, #6EE7B7, #C4B5FD)",
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        fontFamily: "var(--font-cute-nunito, inherit)",
                                                    }
                                                    : {
                                                        color: isSelected ? colors.accentDark : "#374151",
                                                        fontFamily: "var(--font-cute-nunito, inherit)",
                                                    }
                                            }
                                        >
                                            {opt.label}
                                        </span>
                                        <span
                                            className="text-xs"
                                            style={{
                                                color: isSelected ? colors.accentDark + "BB" : "#9CA3AF",
                                                fontFamily: "var(--font-cute-quicksand, inherit)",
                                            }}
                                        >
                                            {opt.sublabel}
                                        </span>
                                    </div>

                                    {/* Checkmark */}
                                    {isSelected && (
                                        <div
                                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                            style={{ background: colors.accentDark }}
                                        >
                                            ✓
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* CTA */}
                <button
                    type="button"
                    onClick={handleStart}
                    disabled={!selectedMode}
                    className="w-full rounded-full py-3.5 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-30"
                    style={
                        activeColors
                            ? {
                                background: `linear-gradient(135deg, ${activeColors.accent}, ${activeColors.accentDark})`,
                                boxShadow: `0 6px 24px ${activeColors.accent}66`,
                                fontFamily: "var(--font-cute-nunito, inherit)",
                            }
                            : {
                                background: "linear-gradient(135deg, #C084FC, #A78BFA)",
                                boxShadow: "0 6px 24px rgba(167,139,250,0.4)",
                                fontFamily: "var(--font-cute-nunito, inherit)",
                            }
                    }
                >
                    {selectedMode ? "Bắt đầu →" : "Chọn hành trình trước nhé"}
                </button>

                {/* Sparkle accents */}
                <div
                    className="cute-sparkle pointer-events-none absolute -right-2 top-8 text-2xl"
                    style={{ animationDelay: "0.4s" }}
                >✦</div>
                <div
                    className="cute-sparkle pointer-events-none absolute -left-4 bottom-16 text-xl"
                    style={{ color: "#FDBA74", animationDelay: "1.1s" }}
                >✦</div>
                <div
                    className="cute-sparkle pointer-events-none absolute right-8 bottom-8 text-sm"
                    style={{ color: "#6EE7B7", animationDelay: "0.7s" }}
                >✦</div>
            </div>

            {/* Disclaimer */}
            <p
                className="absolute bottom-5 left-1/2 w-full max-w-xs -translate-x-1/2 px-6 text-center text-[10px] leading-relaxed"
                style={{ color: "#9CA3AF" }}
            >
                Chỉ dành cho tự chiêm nghiệm — không phải chẩn đoán y tế. Câu trả lời của bạn hoàn toàn riêng tư.
            </p>

            {/* User info modal */}
            {showModal && (
                <UserInfoModal
                    onConfirm={handleConfirm}
                    onClose={() => setShowModal(false)}
                />
            )}
        </main>
    );
}
