"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { computeDoseResults, doseRadarChartData } from "@/lib/dose/scoring";
import { DOSE_SECTION_ORDER, useDose } from "@/lib/dose/store";
import type { DoseSectionKey } from "@/lib/dose/types";
import Link from "next/link";
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

export default function DoseResultsPage() {
  const router = useRouter();
  const { answers, reset } = useDose();

  const hasAllAnswers = useMemo(() => {
    // 24 questions total
    return Object.values(answers).filter((v) => v !== undefined).length === 24;
  }, [answers]);

  useEffect(() => {
    if (!hasAllAnswers) router.replace("/dose");
  }, [hasAllAnswers, router]);

  const results = useMemo(
    () => (hasAllAnswers ? computeDoseResults(answers) : null),
    [answers, hasAllAnswers],
  );

  const chart = useMemo(
    () => (results ? doseRadarChartData(results.scores) : null),
    [results],
  );

  const data = useMemo(() => {
    if (!chart) return null;
    return {
      labels: chart.labels,
      datasets: [
        {
          label: "Your D.O.S.E Profile",
          data: chart.data,
          borderColor: "rgb(79, 70, 229)",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
          pointBackgroundColor: "rgb(79, 70, 229)",
        },
      ],
    };
  }, [chart]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 6,
          max: 30,
          ticks: { stepSize: 6 },
        },
      },
      plugins: {
        legend: { display: false },
      },
    }),
    [],
  );

  if (!hasAllAnswers || !results || !data) {
    return null;
  }

  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Your D.O.S.E Results
        </h1>
        <p className="text-sm text-muted-foreground">{results.insights.balance}</p>
      </div>

      <Card className="p-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[320px] w-full">
            <Radar data={data} options={options} />
          </div>

          <div className="space-y-4">
            <div className="rounded-md border p-3">
              <div className="text-sm text-muted-foreground">Your Pillar</div>
              <div className="text-lg font-semibold">
                {sectionTitle(results.insights.pillar)}
              </div>
            </div>
            <div className="rounded-md border p-3">
              <div className="text-sm text-muted-foreground">Growth Priority</div>
              <div className="text-lg font-semibold">
                {sectionTitle(results.insights.priority)}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Scores range from 6–30 per area (sum of 6 statements).
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {DOSE_SECTION_ORDER.map((key) => {
          const s = results.scores[key];
          return (
            <Card key={key} className="p-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-lg font-semibold">
                    {sectionTitle(key)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {s.raw}/30 ({s.band})
                  </div>
                </div>
                <div className="text-sm">{s.state}</div>
                <div className="text-sm text-muted-foreground">
                  Patterns: {s.patterns[0]} + {s.patterns[1]}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/dose">Back to start</Link>
        </Button>
        <Button
          className="w-full sm:w-auto"
          onClick={() => {
            reset();
          }}
        >
          Reset answers
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        This tool is for self-reflection and coaching, not medical diagnosis.
      </p>
    </main>
  );
}
