"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const stats = [
  { value: "500+", label: "Khách hàng hài lòng" },
  { value: "6+", label: "Năm kinh nghiệm" },
  { value: "98%", label: "Phản hồi tích cực" },
];

export const HeroSection = () => {
  useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient background blobs */}
      <div
        className="blob w-[480px] h-[480px] top-[-80px] right-[-120px] opacity-25"
        style={{ background: "#1E88E5" }}
      />
      <div
        className="blob w-[400px] h-[400px] bottom-[-60px] left-[-80px] opacity-15"
        style={{ background: "#12C37D" }}
      />
      <div
        className="blob w-[280px] h-[280px] top-1/3 left-1/3 opacity-10"
        style={{ background: "#FCBE11" }}
      />

      {/* Decorative petal pattern */}
      <div className="absolute top-24 left-8 text-primary/10 pointer-events-none select-none hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-28 md:py-36">
          {/* Left content */}
          <div className="space-y-8 animate-on-scroll">
            {/* Overline badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="size-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Dịch Vụ Cao Cấp Tại Nhà
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
                Hãy để{" "}
                <span className="shimmer-text">Oni Biocare</span>
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground">
                chăm sóc bạn
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
              Chúng tôi mang đến những liệu trình thư giãn, phục hồi và làm đẹp
              đẳng cấp — tại không gian riêng tư của bạn. Tiết kiệm thời gian,
              tận hưởng trọn vẹn.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#contact">
                <button className="btn-premium flex items-center gap-2 w-full sm:w-auto justify-center">
                  Đặt lịch ngay
                  <ArrowRight className="size-4" />
                </button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all w-full sm:w-auto px-6"
                >
                  Khám phá dịch vụ
                </Button>
              </Link>
            </div>

            {/* Social proof mini stats */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {["T", "N", "H", "V"].map((letter, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#12C37D] flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="size-3.5 star-gold" />
                  ))}
                </div>
                <span className="font-medium text-foreground ml-1">5.0</span>
                <span className="text-muted-foreground">• 500+ đánh giá</span>
              </div>
            </div>
          </div>

          {/* Right — visual panel */}
          <div
            className="relative animate-on-scroll"
            style={{ transitionDelay: "200ms" }}
          >
            {/* Hero image card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              <img
                src="/images/banner/web_banner.png"
                alt="Oni Biocare — Dịch vụ trị liệu cao cấp tại nhà"
                className="w-full h-[460px] object-cover"
                onError={(e) => {
                  // fallback gradient
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E88E5]/20 via-transparent to-transparent" />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-8 top-1/4 glass-card rounded-2xl px-4 py-3 shadow-lg animate-float hidden md:block">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground font-medium">Khách hàng tin yêu</div>
            </div>

            <div
              className="absolute -right-6 bottom-1/4 glass-card rounded-2xl px-4 py-3 shadow-lg animate-float hidden md:block"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="size-3 star-gold" />)}
              </div>
              <div className="text-sm font-bold text-foreground">Đánh giá 5 sao</div>
              <div className="text-xs text-muted-foreground">Từ 98% khách hàng</div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="grid grid-cols-3 gap-4 pb-20 animate-on-scroll" style={{ transitionDelay: "400ms" }}>
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold shimmer-text">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
