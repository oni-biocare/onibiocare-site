"use client";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ServiceProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const serviceList: ServiceProps[] = [
  {
    icon: <Sparkles className="size-6 text-primary" />,
    tag: "Nổi bật",
    title: "Dịch vụ trị liệu",
    description:
      "Các liệu trình chuyên nghiệp giảm đau mỏi xương khớp, thư giãn cơ thể sâu, giảm căng thẳng và cải thiện giấc ngủ — được thiết kế riêng cho từng khách hàng.",
    features: ["Trị liệu tại nhà", "Chuyên viên được cấp chứng chỉ", "Liệu trình cá nhân hóa"],
    highlighted: true,
  },
  {
    icon: <Leaf className="size-6 text-accent" />,
    tag: "Chăm sóc",
    title: "Sản phẩm",
    description:
      "Sản phẩm hỗ trợ sức khỏe cao cấp, giúp cải thiện tình trạng cơ thể, tăng cường sức đề kháng và nâng cao chất lượng cuộc sống mỗi ngày.",
    features: ["Nguyên liệu tự nhiên", "Kiểm định chất lượng", "Tư vấn sử dụng"],
    highlighted: false,
  },
];

export const ServicesSection = () => {
  useScrollAnimation();

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, hsl(210 40% 97%) 0%, hsl(156 30% 96%) 100%)",
      }}
    >
      {/* decorative blobs */}
      <div
        className="blob w-[320px] h-[320px] top-0 right-0 opacity-15"
        style={{ background: "#1E88E5" }}
      />
      <div
        className="blob w-[240px] h-[240px] bottom-0 left-0 opacity-12"
        style={{ background: "#12C37D" }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <span className="section-label animate-on-scroll">Sản phẩm &amp; Dịch vụ</span>
          <h2
            className="text-4xl md:text-5xl font-bold animate-on-scroll"
            style={{ transitionDelay: "80ms" }}
          >
            Hạnh phúc của bạn là{" "}
            <span className="shimmer-text">ưu tiên</span>
          </h2>
          <div className="petal-divider" />
          <p
            className="text-lg text-muted-foreground max-w-xl mx-auto animate-on-scroll"
            style={{ transitionDelay: "160ms" }}
          >
            Tận hưởng sự thư giãn tuyệt đối với những giải pháp chăm sóc toàn diện từ Oni Biocare.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {serviceList.map(({ icon, tag, title, description, features, highlighted }, index) => (
            <div
              key={title}
              className="animate-on-scroll"
              style={{ transitionDelay: `${240 + index * 120}ms` }}
            >
              <div
                className={`relative rounded-3xl p-8 h-full flex flex-col cursor-pointer transition-all duration-300 group
                  ${highlighted
                    ? "bg-gradient-to-br from-[#1E88E5] to-[#12C37D] text-white shadow-2xl hover:shadow-[#1E88E5]/40 hover:-translate-y-1"
                    : "glass-card"
                  }
                `}
              >
                {/* Tag */}
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1 rounded-full w-fit
                    ${highlighted ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}
                  `}
                >
                  {icon}
                  {tag}
                </span>

                <h3
                  className={`text-2xl font-bold mb-3 ${highlighted ? "text-white" : "text-foreground"}`}
                >
                  {title}
                </h3>
                <p
                  className={`leading-relaxed mb-6 text-sm flex-1 ${highlighted ? "text-white/85" : "text-muted-foreground"}`}
                >
                  {description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div
                        className={`size-1.5 rounded-full flex-shrink-0 ${highlighted ? "bg-white" : "bg-primary"}`}
                      />
                      <span className={highlighted ? "text-white/90" : "text-muted-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <Link
                  href="/products"
                  className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all
                    ${highlighted ? "text-white" : "text-primary"}
                  `}
                >
                  Tìm hiểu thêm
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
