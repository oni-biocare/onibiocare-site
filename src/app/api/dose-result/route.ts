import { DOSE_QUESTIONS } from "@/lib/dose/questions";
import { DOSE_SECTIONS } from "@/lib/dose/questions";
import { NextResponse } from "next/server";

const SCALE_LABELS: Record<number, string> = {
    1: "Không bao giờ",
    2: "Hiếm khi",
    3: "Đôi khi",
    4: "Thường xuyên",
    5: "Hầu như luôn luôn",
};

const BAND_VI: Record<string, string> = {
    "Very Low": "Rất thấp",
    Low: "Thấp",
    Moderate: "Trung bình",
    High: "Cao",
    "Very High": "Rất cao",
};

const SECTION_EMOJI: Record<string, string> = {
    dopamine: "❤️",
    oxytocin: "🧡",
    serotonin: "💚",
    endorphins: "💜",
};

interface ScoreEntry {
    raw: number;
    band: string;
    state: string;
}

interface InsightsEntry {
    pillar: string;
    priority: string;
    balance: string;
}

interface RequestBody {
    name: string;
    phone: string;
    mode: string;
    answers: Record<string, number>;
    scores: Record<string, ScoreEntry>;
    insights: InsightsEntry;
    activeSections: string[];
    suggestedProductNames?: string[];
}

function esc(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function buildTelegramMessage(body: RequestBody): string {
    const { name, phone, mode, answers, scores, insights, activeSections, suggestedProductNames } = body;

    const modeLabel: Record<string, string> = {
        all: "Toàn bộ D.O.S.E",
        dopamine: "Dopamine ❤️",
        oxytocin: "Oxytocin 🧡",
        serotonin: "Serotonin 💚",
        endorphins: "Endorphins 💜",
    };

    const lines: string[] = [];

    lines.push("🌸 <b>Kết quả D.O.S.E mới</b>");
    lines.push("");
    lines.push(`👤 <b>Tên:</b> ${esc(name)}`);
    lines.push(`📞 <b>SĐT:</b> ${esc(phone)}`);
    lines.push(`🎯 <b>Hành trình:</b> ${esc(modeLabel[mode] ?? mode)}`);
    lines.push("");

    // ── Section scores ─────────────────────────────────────────
    lines.push("📊 <b>Tổng điểm:</b>");
    for (const sKey of activeSections) {
        const s = scores[sKey];
        if (!s) continue;
        const emoji = SECTION_EMOJI[sKey] ?? "•";
        const bandVi = BAND_VI[s.band] ?? s.band;
        const sLabel = sKey.charAt(0).toUpperCase() + sKey.slice(1);
        lines.push(`${emoji} <b>${sLabel}:</b> ${s.raw}/30 — ${esc(bandVi)}`);
    }

    // ── Per-question breakdown ─────────────────────────────────
    for (const sKey of activeSections) {
        const sectionMeta = DOSE_SECTIONS.find((s) => s.key === sKey);
        const sectionTitle = sectionMeta?.title ?? sKey;
        const emoji = SECTION_EMOJI[sKey] ?? "•";

        lines.push("");
        lines.push(`${emoji} <b>${esc(sectionTitle)} — Chi tiết từng câu:</b>`);

        const sectionQuestions = DOSE_QUESTIONS
            .filter((q) => q.section === sKey)
            .sort((a, b) => a.orderInSection - b.orderInSection);

        for (const q of sectionQuestions) {
            const ans = answers[q.id];
            const ansLabel = ans !== undefined
                ? `${ans} — ${SCALE_LABELS[ans] ?? "?"}`
                : "Chưa trả lời";
            const reverseTag = q.reverse ? " <i>(đảo ngược)</i>" : "";
            lines.push(`  ${q.orderInSection}. ${esc(q.prompt)}${reverseTag}`);
            lines.push(`     → <b>${esc(ansLabel)}</b>`);
        }
    }

    // ── Insights ───────────────────────────────────────────────
    lines.push("");
    lines.push("✨ <b>Nhận xét tổng quan:</b>");
    lines.push(`✦ Điểm mạnh: <b>${esc(insights.pillar)}</b>`);
    if (activeSections.length > 1) {
        lines.push(`⬆️ Ưu tiên phát triển: <b>${esc(insights.priority)}</b>`);
    }
    lines.push(`💬 ${esc(insights.balance)}`);

    // ── Product Suggestions ────────────────────────────────────
    if (suggestedProductNames && suggestedProductNames.length > 0) {
        lines.push("");
        lines.push("🛍️ <b>Sản phẩm được gợi ý:</b>");
        suggestedProductNames.forEach((name, i) => {
            lines.push(`  ${i + 1}. ${esc(name)}`);
        });
    }

    return lines.join("\n");
}


export async function POST(request: Request) {
    try {
        const body = (await request.json()) as RequestBody;

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("[dose-result] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
            return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
        }

        const text = buildTelegramMessage(body);

        const res = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "HTML",
                }),
            },
        );

        if (!res.ok) {
            const errText = await res.text();
            console.error("[dose-result] Telegram API error:", errText);
            return NextResponse.json({ error: "Telegram send failed" }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[dose-result] Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
