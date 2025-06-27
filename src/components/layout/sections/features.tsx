import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

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
  }, {
    icon: "HandHeart",
    title: "An toàn",
    description:
      "Dịch vụ được thực hiện bởi chuyên viên được đào tạo chuyên sâu, đảm bảo quy trình an toàn và hiệu quả ngay tại không gian riêng tư của bạn..",
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
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Giá trị
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Điều gì khiến chúng tôi khác biệt?
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Chúng tôi mang đến dịch vụ trị liệu tại nhà, giúp bạn tận hưởng sự an toàn, tiện lợi và thư giãn tối đa.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
