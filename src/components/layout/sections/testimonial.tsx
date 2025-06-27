"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { LuInstagram } from "react-icons/lu";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Nguyễn Văn Khải",
    userName: "Quản lý sản phẩm",
    comment:
      "Dịch vụ trị liệu của Oni Biocare thật tuyệt vời! Chuyên viên rất tận tâm và chu đáo. Tôi cảm thấy thư giãn và khỏe khoắn hơn rất nhiều.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Trần Thị Bích",
    userName: "Chuyên viên phân tích",
    comment:
      "Tôi đã thử nhiều dịch vụ trị liệu nhưng Oni Biocare thực sự khác biệt. Dịch vụ tại nhà rất tiện lợi và chất lượng không hề thua kém spa cao cấp.",
    rating: 4.8,
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Lê Văn Cường",
    userName: "Giám đốc công nghệ",
    comment:
      "Sau nhiều giờ làm việc với máy tính, dịch vụ của Oni Biocare giúp tôi giảm đau vai gáy và cải thiện tập trung. Tôi sẽ tiếp tục sử dụng dịch vụ này.",
    rating: 4.9,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Phạm Thành Đạt",
    userName: "Nhà khoa học dữ liệu",
    comment:
      "Đội ngũ chuyên viên rất chuyên nghiệp và thân thiện. Họ lắng nghe nhu cầu của tôi và điều chỉnh liệu trình phù hợp. Kết quả vượt quá mong đợi của tôi.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Hoàng Thị Hồng",
    userName: "Quản lý dự án",
    comment:
      "Tôi đã tặng dịch vụ này cho mẹ tôi nhân dịp sinh nhật và bà rất thích. Chuyên viên rất nhẹ nhàng và tận tâm, đặc biệt phù hợp cho người cao tuổi.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Vũ Minh Hoàng",
    userName: "Kỹ sư phần mềm",
    comment:
      "Lịch trình linh hoạt và dịch vụ đúng giờ. Chất lượng dịch vụ luôn ổn định qua nhiều lần sử dụng. Tôi đã giới thiệu Oni Biocare cho nhiều bạn bè và đồng nghiệp.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Đánh giá
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Khách hàng nói gì về chúng tôi?
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-subheading/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-subheading text-subheading" />
                    <Star className="size-4 fill-subheading text-subheading" />
                    <Star className="size-4 fill-subheading text-subheading" />
                    <Star className="size-4 fill-subheading text-subheading" />
                    <Star className="size-4 fill-subheading text-subheading" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      {/* <AvatarImage
                        src={review.image}
                        alt={review.name}
                      /> */}
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
