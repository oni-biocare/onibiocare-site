"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "HeartHandshake",
    title: "Tận tâm",
    description:
      "Chuyên viên được đào tạo bài bản, tận tâm và chuyên nghiệp, luôn lắng nghe và đồng hành cùng bạn trong suốt quá trình trị liệu.",
  },
  {
    icon: "HandHeart",
    title: "An toàn",
    description:
      "Dịch vụ được thực hiện bởi chuyên viên được đào tạo chuyên sâu, đảm bảo quy trình an toàn và hiệu quả ngay tại không gian riêng tư của bạn.",
  },
  {
    icon: "BadgeCheck",
    title: "Tiện lợi",
    description:
      "Không cần di chuyển xa, chúng tôi có mặt tận nơi để tiết kiệm thời gian và mang lại sự thoải mái trong từng bước thực hiện.",
  },
  {
    icon: "BookHeart",
    title: "Cá nhân hóa",
    description:
      "Từng liệu trình được thiết kế riêng dựa trên nhu cầu và tình trạng sức khỏe của từng khách hàng, đảm bảo hiệu quả tối ưu.",
  },
  {
    icon: "Coins",
    title: "Giá cả",
    description:
      "Cung cấp giải pháp trị liệu chất lượng cao với chi phí cạnh tranh, mang lại giá trị lâu dài cho sức khỏe.",
  },
  {
    icon: "Gift",
    title: "Quà tặng",
    description:
      "Dịch vụ là món quà ý nghĩa, giúp bạn thể hiện sự quan tâm đến sức khỏe và hạnh phúc của người thân.",
  },
];

export const FeaturesSection = () => {
  useScrollAnimation();

  return (
    <section
      id="features"
      className="container py-24 sm:py-32 relative overflow-hidden section-glow-left"
    >
      {/* Section header */}
      <div className="text-center mb-14 space-y-4">
        <span className="section-label animate-on-scroll">Giá trị cốt lõi</span>
        <h2
          className="text-4xl md:text-5xl font-bold animate-on-scroll"
          style={{ transitionDelay: "80ms" }}
        >
          Điều gì khiến{" "}
          <span className="shimmer-text">chúng tôi</span> khác biệt?
        </h2>
        <div className="petal-divider" />
        <p
          className="text-lg text-muted-foreground max-w-xl mx-auto animate-on-scroll"
          style={{ transitionDelay: "160ms" }}
        >
          Chúng tôi mang đến dịch vụ trị liệu tại nhà, giúp bạn tận hưởng sự
          an toàn, tiện lợi và thư giãn tối đa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {featureList.map(({ icon, title, description }, index) => (
          <div
            key={title}
            className="animate-on-scroll"
            style={{ transitionDelay: `${200 + index * 80}ms` }}
          >
            <Card className="h-full glass-card rounded-2xl border-0 cursor-pointer group">
              <CardHeader className="flex flex-col items-center pt-8 pb-3">
                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-40 group-hover:opacity-0 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-3.5 rounded-full ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    <Icon
                      name={icon as keyof typeof icons}
                      size={26}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center text-sm leading-relaxed pb-8">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
