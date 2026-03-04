"use client";

import { DOSE_MODE_OPTIONS } from "@/lib/dose/constants";
import { useDose } from "@/lib/dose/store";
import type { DoseModeKey } from "@/lib/dose/types";

interface DoseModeSelectorProps {
    /** Called when the user picks a mode */
    onSelect?: (mode: DoseModeKey) => void;
}

export function DoseModeSelector({ onSelect }: DoseModeSelectorProps) {
    const { selectedMode, setMode } = useDose();

    const handleSelect = (key: DoseModeKey) => {
        setMode(key);
        onSelect?.(key);
    };

    return (
        <div className="w-full space-y-2">
            {/* Section label */}
            <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "#64748B", fontFamily: "var(--font-dose-mono, monospace)" }}
            >
                Chọn hành trình của bạn
            </p>

            {DOSE_MODE_OPTIONS.map((opt) => {
                const isSelected = selectedMode === opt.key;
                const isAll = opt.key === "all";

                return (
                    <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect(opt.key)}
                        className="w-full rounded-xl px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.98] focus-visible:outline-none"
                        style={{
                            background: isSelected ? opt.accentHex + "1A" : "#1C1C26",
                            border: `2px solid ${isSelected ? opt.accentHex : "#2A2A38"}`,
                        }}
                    >
                        <div className="flex items-center gap-3">
                            {/* Emoji icon */}
                            <div
                                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-lg"
                                style={{
                                    background: isSelected ? opt.accentHex + "33" : "#2A2A38",
                                    border: `1px solid ${isSelected ? opt.accentHex + "66" : "transparent"}`,
                                }}
                            >
                                {opt.emoji}
                            </div>

                            {/* Labels */}
                            <div className="flex flex-1 flex-col gap-0.5">
                                <span
                                    className="text-sm font-bold leading-tight text-white"
                                    style={isAll ? { background: "linear-gradient(90deg, #E040FB, #F4436C, #34D399, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : {}}
                                >
                                    {opt.label}
                                </span>
                                <span className="text-xs" style={{ color: isSelected ? opt.accentHex + "CC" : "#64748B" }}>
                                    {opt.sublabel}
                                </span>
                            </div>

                            {/* Selected check indicator */}
                            {isSelected && (
                                <div
                                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px]"
                                    style={{ background: opt.accentHex, color: "#fff" }}
                                >
                                    ✓
                                </div>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
