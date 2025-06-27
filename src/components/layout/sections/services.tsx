import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  {
    title: "Dịch vụ trị liệu",
    description:
      "Chúng tôi cung cấp các liệu trình giảm đau mỏi xương khớp, thư giãn cơ thể, giảm căng thẳng và cải thiện giấc ngủ, được thiết kế riêng cho từng khách hàng.",
    pro: 1,
  },
  {
    title: "Sản phẩm",
    description:
      "Sản phẩm hỗ trợ, giúp cải thiện tình trạng sức khỏe, tăng cường sức đề kháng, nâng cao chất lượng cuộc sống.",
    pro: 0,
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Sản phẩm & Dịch vụ
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Hạnh phúc của bạn là ưu tiên hàng đầu của chúng tôi
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Chúng tôi giúp bạn tận hưởng sự an toàn, tiện lợi và thư giãn tối đa qua những sản phẩm và dịch vụ của mình!
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              ĐẶC BIỆT
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
