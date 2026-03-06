"use client";

import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { computeDoseResults, doseRadarChartData } from "@/lib/dose/scoring";
import { useDose } from "@/lib/dose/store";
import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import { DOSE_THEMES } from "@/lib/dose/theme";
import type { DoseSectionKey } from "@/lib/dose/types";
import Link from "next/link";
import { DoseSnowfall } from "./DoseSnowfall";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

function sectionTitle(section: DoseSectionKey) {
  const found = DOSE_SECTIONS.find((s) => s.key === section);
  return found?.title ?? section;
}

function BandBadge({ band, accentHex }: { band: string; accentHex: string }) {
  const BAND_VI: Record<string, string> = {
    "Very Low": "Rất thấp",
    "Low": "Thấp",
    "Moderate": "Trung bình",
    "High": "Cao",
    "Very High": "Rất cao",
  };
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
      style={{
        background: accentHex + "44",
        color: accentHex,
        border: `1px solid ${accentHex}66`,
        boxShadow: `0 0 6px ${accentHex}33`,
      }}
    >
      {BAND_VI[band] ?? band}
    </span>
  );
}

export default function DoseResultsPage() {
  const router = useRouter();
  const { answers, reset, activeSections } = useDose();

  // Require all 6 answers per active section
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

  const chart = useMemo(
    () => (results ? doseRadarChartData(results.scores) : null),
    [results],
  );

  const pillarTheme = results ? DOSE_THEMES[results.insights.pillar] : null;
  const priorityTheme = results ? DOSE_THEMES[results.insights.priority] : null;

  const data = useMemo(() => {
    if (!chart || !pillarTheme) return null;
    return {
      labels: chart.labels,
      datasets: [
        {
          label: "Hồ sơ D.O.S.E của bạn",
          data: chart.data,
          borderColor: pillarTheme.accentHex,
          backgroundColor: pillarTheme.accentHex + "33",
          pointBackgroundColor: pillarTheme.accentHex,
          pointBorderColor: "#0D0D18",
          pointRadius: 5,
          borderWidth: 2,
        },
      ],
    };
  }, [chart, pillarTheme]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 6,
          max: 30,
          ticks: {
            stepSize: 6,
            color: "#475569",
            backdropColor: "transparent",
            font: { size: 10 },
          },
          grid: { color: "rgba(255,255,255,0.07)" },
          angleLines: { color: "rgba(255,255,255,0.07)" },
          pointLabels: {
            color: "#94A3B8",
            font: { size: 12, weight: "bold" as const },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#18182A",
          borderColor: "#252540",
          borderWidth: 1,
          titleColor: "#F8FAFC",
          bodyColor: "#94A3B8",
        },
      },
    }),
    [],
  );

  const isSingleMode = activeSections.length === 1;

  if (!hasAllAnswers || !results || !pillarTheme || !priorityTheme) {
    return null;
  }
  // Radar chart data only required for multi-section mode
  if (!isSingleMode && !data) return null;

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${pillarTheme.accentHex}22 0%, #0D0D18 55%)`,
      }}
    >
      {/* Snowfall particle layer — sits behind all content */}
      <DoseSnowfall accentHex={pillarTheme.accentHex} count={55} />
      {/* ── Hero banner ─────────────────────────────────────── */}
      <div
        className="border-b px-4 py-8"
        style={{
          borderColor: pillarTheme.accentHex + "44",
          background: `linear-gradient(180deg, ${pillarTheme.accentHex}10 0%, transparent 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {isSingleMode
              ? `Kết Quả ${sectionTitle(activeSections[0])}`
              : "Hồ Sơ D.O.S.E Của Bạn"}
          </div>
          <h1
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
          >
            {results.insights.balance}
          </h1>

          {/* Pillar + Priority stats */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div
              className="flex flex-col gap-1 rounded-xl px-4 py-3"
              style={{
                background: "#18182A",
                borderLeft: `3px solid ${pillarTheme.accentHex}`,
                boxShadow: `inset 0 0 40px ${pillarTheme.accentHex}18`,
              }}
            >
              <span className="text-xs text-slate-500">
                {isSingleMode ? "Kết Quả" : "Điểm Mạnh"}
              </span>
              <span className="text-lg font-bold" style={{ color: pillarTheme.accentHex, textShadow: `0 0 12px ${pillarTheme.accentHex}88` }}>
                {sectionTitle(results.insights.pillar)}
              </span>
            </div>
            {/* Only show the Priority box in multi-section / Tổng hợp mode */}
            {!isSingleMode && (
              <div
                className="flex flex-col gap-1 rounded-xl px-4 py-3"
                style={{
                  background: "#18182A",
                  borderLeft: `3px solid ${priorityTheme.accentHex}`,
                  boxShadow: `inset 0 0 40px ${priorityTheme.accentHex}18`,
                }}
              >
                <span className="text-xs text-slate-500">Ưu Tiên Phát Triển</span>
                <span className="text-lg font-bold" style={{ color: priorityTheme.accentHex, textShadow: `0 0 12px ${priorityTheme.accentHex}88` }}>
                  {sectionTitle(results.insights.priority)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 p-4 pb-12">

        {/* ── Radar chart — only shown for multi-section modes ──── */}
        {activeSections.length > 1 && (
          <div
            className="rounded-2xl p-4"
            style={{
              background: "#18182A",
              border: `1px solid ${pillarTheme.accentHex}33`,
              boxShadow: `0 0 24px ${pillarTheme.accentHex}22`,
            }}
          >
            <div className="h-[300px] w-full sm:h-[360px]">
              <Radar data={data!} options={options} />
            </div>
            <p className="mt-2 text-center text-xs text-slate-600">
              Điểm từ 6–30 mỗi lĩnh vực (tổng của 6 câu hỏi)
            </p>
          </div>
        )}

        {/* ── Section score cards 2×2 ─────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-2">
          {activeSections.map((key: DoseSectionKey) => {
            const s = results.scores[key];
            const t = DOSE_THEMES[key];
            return (
              <div
                key={key}
                className="rounded-2xl p-4"
                style={{
                  background: "#18182A",
                  border: `1.5px solid ${t.accentHex}55`,
                  boxShadow: `0 0 20px ${t.accentHex}22, inset 0 0 30px ${t.accentHex}08`,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span
                    className="text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
                  >
                    {sectionTitle(key)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-dose-mono, monospace)",
                        color: t.accentHex,
                        textShadow: `0 0 8px ${t.accentHex}88`,
                      }}
                    >
                      {s.raw}/30
                    </span>
                    <BandBadge band={s.band} accentHex={t.accentHex} />
                  </div>
                </div>

                <p className="mb-3 text-sm text-slate-300">{s.state}</p>

                {/* Pattern chips — skip empty placeholders */}
                {s.patterns.some((p: string) => p.length > 0) && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {s.patterns.filter((p: string) => p.length > 0).map((p: string) => (
                      <span
                        key={p}
                        className="rounded px-2 py-0.5 text-[11px] font-medium"
                        style={{
                          background: t.accentHex + "22",
                          color: t.accentHex + "DD",
                          border: `1px solid ${t.accentHex}44`,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {s.suggestions && (
                  <ul className="space-y-0.5 text-xs text-slate-400">
                    {s.suggestions.map((sug: string) => (
                      <li key={sug} className="flex items-start gap-1.5">
                        <span style={{ color: t.accentHex }}>›</span>
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
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            href="/dose"
            className="w-full rounded-xl py-3 text-center text-sm font-semibold text-slate-300 transition-colors hover:text-white sm:w-auto sm:px-6"
            style={{
              background: "#252540",
              border: "1px solid #303060",
            }}
          >
            ← Quay lại đầu
          </Link>
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-80 sm:w-auto sm:px-6"
            style={{
              background: `linear-gradient(135deg, ${pillarTheme.accentHex}EE, ${pillarTheme.accentHex}AA)`,
              boxShadow: `0 0 20px ${pillarTheme.accentHex}77`,
            }}
          >
            Làm lại bài kiểm tra
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Công cụ này chỉ dành cho tự chiêm nghiệm và hướng dẫn, không phải chẩn đoán y tế.
        </p>
      </div>
    </main>
  );
}
