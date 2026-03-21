"use client";

import { useState } from "react";

interface UserInfoModalProps {
    onConfirm: (name: string, phone: string) => void;
    onClose: () => void;
}

const PHONE_RE = /^[0-9]{9,11}$/;

export function UserInfoModal({ onConfirm, onClose }: UserInfoModalProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [touched, setTouched] = useState({ name: false, phone: false });

    const nameErr = touched.name && name.trim().length === 0;
    const phoneErr = touched.phone && !PHONE_RE.test(phone.replace(/\s/g, ""));
    const isValid =
        name.trim().length > 0 && PHONE_RE.test(phone.replace(/\s/g, ""));

    const handleSubmit = () => {
        if (!isValid) {
            setTouched({ name: true, phone: true });
            return;
        }
        onConfirm(name.trim(), phone.trim());
    };

    return (
        /* ── Backdrop ──────────────────────────────────────────── */
        <div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* ── Card ──────────────────────────────────────────── */}
            <div
                className="w-full max-w-md rounded-t-3xl px-6 pb-10 pt-6"
                style={{
                    background: "#FFFFFF",
                    boxShadow: "0 -8px 40px rgba(196,181,253,0.25)",
                    animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
            >
                {/* Drag handle */}
                <div
                    className="mx-auto mb-5 h-1 w-10 rounded-full"
                    style={{ background: "#E5E7EB" }}
                />

                {/* Badge */}
                <div className="mb-4 flex justify-center">
                    <span
                        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
                        style={{
                            background: "#EDE9FE",
                            border: "1.5px solid #C4B5FD",
                            color: "#7C3AED",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                        }}
                    >
                        <span>✦</span>
                        <span>Trước khi bắt đầu</span>
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="mb-1 text-center text-xl font-black"
                    style={{ color: "#111827", fontFamily: "var(--font-cute-nunito, inherit)" }}
                >
                    🌸 Nhập thông tin của bạn
                </h2>
                <p
                    className="mb-6 text-center text-xs"
                    style={{ color: "#9CA3AF", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                >
                    Để lưu và gửi kết quả sau khi hoàn thành
                </p>

                {/* Name input */}
                <div className="mb-4">
                    <label
                        className="mb-1.5 block text-xs font-semibold"
                        style={{ color: "#6B7280", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                    >
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-150"
                        style={{
                            border: nameErr ? "2px solid #F87171" : "1.5px solid #E5E7EB",
                            background: nameErr ? "#FEF2F2" : "#F9FAFB",
                            color: "#111827",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                            boxShadow: nameErr ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                    />
                    {nameErr && (
                        <p className="mt-1 text-[11px]" style={{ color: "#EF4444" }}>
                            Vui lòng nhập họ tên của bạn
                        </p>
                    )}
                </div>

                {/* Phone input */}
                <div className="mb-6">
                    <label
                        className="mb-1.5 block text-xs font-semibold"
                        style={{ color: "#6B7280", fontFamily: "var(--font-cute-quicksand, inherit)" }}
                    >
                        Số điện thoại
                    </label>
                    <input
                        type="tel"
                        placeholder="0901 234 567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                        className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-150"
                        style={{
                            border: phoneErr ? "2px solid #F87171" : "1.5px solid #E5E7EB",
                            background: phoneErr ? "#FEF2F2" : "#F9FAFB",
                            color: "#111827",
                            fontFamily: "var(--font-cute-quicksand, inherit)",
                            boxShadow: phoneErr ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                    />
                    {phoneErr && (
                        <p className="mt-1 text-[11px]" style={{ color: "#EF4444" }}>
                            Số điện thoại không hợp lệ (9–11 chữ số)
                        </p>
                    )}
                </div>

                {/* CTA */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-full py-3.5 text-base font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                    style={{
                        background: "linear-gradient(135deg, #C4B5FD, #7C3AED)",
                        boxShadow: "0 6px 24px rgba(196,181,253,0.45)",
                        fontFamily: "var(--font-cute-nunito, inherit)",
                    }}
                >
                    Bắt đầu hành trình →
                </button>

                {/* Privacy note */}
                <p
                    className="mt-3 text-center text-[10px] leading-relaxed"
                    style={{ color: "#9CA3AF" }}
                >
                    🔒 Thông tin của bạn được bảo mật và chỉ dùng để lưu kết quả
                </p>
            </div>

            {/* Slide-up keyframe */}
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
        </div>
    );
}
