import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, items } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("[order] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const productLines =
      Array.isArray(items) && items.length > 0
        ? items
            .map((p: { title: string; price?: string; quantity?: number }) => {
              const qty = p.quantity && p.quantity > 1 ? ` x${p.quantity}` : "";
              return `  • ${p.title}${p.price ? ` — ${p.price}` : ""}${qty}`;
            })
            .join("\n")
        : "  (không có sản phẩm)";

    const text = [
      "🛒 *Đơn hàng mới từ ONI Biocare*",
      "",
      `👤 *Họ và Tên:* ${name}`,
      `📞 *Số điện thoại:* ${phone}`,
      `📧 *Email:* ${email || "(không có)"}`,
      "",
      "📦 *Sản phẩm:*",
      productLines,
    ].join("\n");

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[order] Telegram error:", err);
      return NextResponse.json({ error: "Telegram send failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[order] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
