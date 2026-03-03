import { DOSE_SECTION_ORDER } from "@/lib/dose/constants";
import { DOSE_SECTIONS } from "@/lib/dose/questions";
import Link from "next/link";

const LETTER_COLORS: Record<string, string> = {
  dopamine: "#E040FB",
  oxytocin: "#F4436C",
  serotonin: "#34D399",
  endorphins: "#818CF8",
};

export default function DoseIntroPage() {
  const firstSection = DOSE_SECTION_ORDER[0];

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-6"
      style={{ background: "#0F0F14" }}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-10">

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
        <div className="space-y-3 text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-dose-grotesk, inherit)" }}
          >
            Khám Phá D.O.S.E Của Bạn
          </h1>
          <p className="text-base text-slate-400">
            Kiểm tra thần kinh học trong 3 phút — không cần bằng cấp khoa học.
          </p>
        </div>

        {/* Section pill badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {DOSE_SECTIONS.map((s) => (
            <span
              key={s.key}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: LETTER_COLORS[s.key] + "22",
                color: LETTER_COLORS[s.key],
                border: `1px solid ${LETTER_COLORS[s.key]}44`,
              }}
            >
              {s.title} · {s.subtitle}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/dose/${firstSection}/1`}
          className="w-full rounded-xl py-4 text-center text-base font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ background: LETTER_COLORS["dopamine"] }}
        >
          Bắt đầu →
        </Link>

        <p className="text-center text-xs text-slate-600">
          Chỉ dành cho tự chiêm nghiệm — không phải chẩn đoán y tế.
        </p>
      </div>
    </main>
  );
}
