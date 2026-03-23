"use client";

import { getSuggestedProducts } from "@/lib/dose/productSuggestions";
import type { Product } from "@/lib/products";
import type { DoseSectionKey } from "@/lib/dose/types";
import Link from "next/link";

/* ── Pastel palette aligned with existing results themes ──────── */
const THEME: Record<
    DoseSectionKey,
    { accent: string; accentBg: string; accentDark: string; emoji: string; label: string }
> = {
    dopamine: { accent: "#F9A8D4", accentBg: "#FCE7F3", accentDark: "#DB2777", emoji: "❤️", label: "Dopamine" },
    oxytocin: { accent: "#FDBA74", accentBg: "#FEF3C7", accentDark: "#D97706", emoji: "🧡", label: "Oxytocin" },
    serotonin: { accent: "#6EE7B7", accentBg: "#D1FAE5", accentDark: "#059669", emoji: "💚", label: "Serotonin" },
    endorphins: { accent: "#C4B5FD", accentBg: "#EDE9FE", accentDark: "#7C3AED", emoji: "💜", label: "Endorphins" },
};

interface Props {
    /** The hormone the user scored lowest on (primary driver) */
    priority: DoseSectionKey;
    /** All products (passed from server, no fs on client) */
    allProducts: Omit<Product, "content">[];
}

export default function DoseProductSuggestions({ priority, allProducts }: Props) {
    const theme = THEME[priority];
    const products = getSuggestedProducts(priority, allProducts);

    if (products.length === 0) return null;

    return (
        <section
            className="mt-8 rounded-3xl p-5"
            style={{
                background: `linear-gradient(145deg, ${theme.accentBg} 0%, #FFFFFF 100%)`,
                border: `1.5px solid ${theme.accent}`,
                boxShadow: `0 8px 32px ${theme.accent}33`,
            }}
        >
            {/* Section header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{theme.emoji}</span>
                    <div>
                        <p
                            className="text-[10px] font-semibold uppercase tracking-widest"
                            style={{ color: theme.accentDark, fontFamily: "var(--font-cute-quicksand, inherit)" }}
                        >
                            Gợi ý dành riêng cho bạn
                        </p>
                        <h2
                            className="text-base font-black leading-tight"
                            style={{ color: "#111827", fontFamily: "var(--font-cute-nunito, inherit)" }}
                        >
                            Hỗ trợ {theme.label} của bạn 🛍️
                        </h2>
                    </div>
                </div>

                <Link
                    href="/products"
                    className="flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-bold transition-opacity hover:opacity-75"
                    style={{
                        background: theme.accentBg,
                        border: `1.5px solid ${theme.accent}`,
                        color: theme.accentDark,
                        fontFamily: "var(--font-cute-quicksand, inherit)",
                    }}
                >
                    Xem tất cả →
                </Link>
            </div>

            {/* Product cards */}
            <div className="space-y-3">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group flex items-center gap-3 rounded-2xl p-3 transition-all duration-200"
                        style={{
                            background: "#FFFFFF",
                            border: `1.5px solid ${theme.accent}55`,
                            boxShadow: `0 2px 8px ${theme.accent}22`,
                        }}
                    >
                        {/* Product image */}
                        {product.coverImage ? (
                            <div
                                className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl"
                                style={{ border: `1.5px solid ${theme.accent}55` }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.coverImage}
                                    alt={product.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <div
                                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
                                style={{ background: theme.accentBg }}
                            >
                                {theme.emoji}
                            </div>
                        )}

                        {/* Product info */}
                        <div className="min-w-0 flex-1">
                            <p
                                className="line-clamp-2 text-sm font-bold leading-snug"
                                style={{ color: "#111827", fontFamily: "var(--font-cute-nunito, inherit)" }}
                            >
                                {product.title}
                            </p>
                            {product.price && (
                                <p
                                    className="mt-0.5 text-xs font-semibold"
                                    style={{ color: theme.accentDark }}
                                >
                                    {product.price}
                                </p>
                            )}
                            <p
                                className="mt-0.5 line-clamp-1 text-[11px]"
                                style={{ color: "#6B7280", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                            >
                                {product.description}
                            </p>
                        </div>

                        {/* Arrow */}
                        <div
                            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-transform duration-200 group-hover:translate-x-0.5"
                            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
                        >
                            →
                        </div>
                    </Link>
                ))}
            </div>

            {/* Tagline */}
            <p
                className="mt-3 text-center text-[10px] leading-relaxed"
                style={{ color: "#9CA3AF", fontFamily: "var(--font-cute-quicksand, inherit)" }}
            >
                Những sản phẩm này được gợi ý dựa trên kết quả D.O.S.E của bạn.
            </p>
        </section>
    );
}
