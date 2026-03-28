"use client";

import { useCart } from "@/lib/cartStore";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle2, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, clearCart, increaseQty, decreaseQty } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Vui lòng điền đầy đủ Họ và Tên và Số điện thoại.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          items: items.map((i) => ({
            title: i.title,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Server error");
      setSuccess(true);
      clearCart();
    } catch {
      setError("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header gradient strip */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại sản phẩm
        </Link>

        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ShoppingCart className="h-7 w-7 text-primary" />
          Giỏ hàng của bạn
        </h1>
        <p className="text-muted-foreground mb-10">
          Xem lại sản phẩm và điền thông tin để đặt hàng.
        </p>

        {success ? (
          /* ─── Success state ─── */
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
              <CheckCircle2 className="h-14 w-14 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Đặt hàng thành công!</h2>
            <p className="text-muted-foreground max-w-sm">
              Cảm ơn bạn đã tin tưởng ONI Biocare. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4" />
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ─── Left: Cart items ─── */}
            <section className="lg:col-span-3 space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Sản phẩm ({totalItems})
              </h2>

              {items.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Giỏ hàng trống.</p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block text-primary hover:underline text-sm"
                  >
                    Khám phá sản phẩm →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 py-4">
                      {/* Thumbnail */}
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                        {item.coverImage ? (
                          <Image
                            src={item.coverImage}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-2 text-sm leading-snug">
                          {item.title}
                        </p>
                        {item.price && (
                          <p className="text-primary font-semibold text-sm mt-0.5">
                            {item.price}
                          </p>
                        )}
                      </div>

                      {/* Qty stepper */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item.id)}
                          aria-label="Giảm số lượng"
                          className="h-7 w-7 rounded-md border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQty(item.id)}
                          aria-label="Tăng số lượng"
                          className="h-7 w-7 rounded-md border flex items-center justify-center hover:bg-muted transition-colors cursor-pointer text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label="Xóa sản phẩm"
                        className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ─── Right: Order form ─── */}
            <section className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-5">Thông tin đặt hàng</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Họ và Tên */}
                  <div>
                    <label htmlFor="cart-name" className="block text-sm font-medium mb-1.5">
                      Họ và Tên <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="cart-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label htmlFor="cart-phone" className="block text-sm font-medium mb-1.5">
                      Số điện thoại <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="cart-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912 345 678"
                      required
                      className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="cart-email" className="block text-sm font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      id="cart-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                  >
                    {loading ? "Đang gửi..." : "Gửi đơn hàng"}
                  </button>

                  {items.length === 0 && (
                    <p className="text-xs text-center text-muted-foreground">
                      Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt.
                    </p>
                  )}
                </form>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
