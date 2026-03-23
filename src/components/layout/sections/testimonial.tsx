"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "",
    name: "Nguyễn Văn Khải",
    userName: "Quản lý sản phẩm",
    comment:
      "Dịch vụ trị liệu của Oni Biocare thật tuyệt vời! Chuyên viên rất tận tâm và chu đáo. Tôi cảm thấy thư giãn và khỏe khoắn hơn rất nhiều.",
    rating: 5.0,
  },
  {
    image: "",
    name: "Trần Thị Bích",
    userName: "Chuyên viên phân tích",
    comment:
      "Tôi đã thử nhiều dịch vụ trị liệu nhưng Oni Biocare thực sự khác biệt. Dịch vụ tại nhà rất tiện lợi và chất lượng không hề thua kém spa cao cấp.",
    rating: 4.8,
  },
  {
    image: "",
    name: "Lê Văn Cường",
    userName: "Giám đốc công nghệ",
    comment:
      "Sau nhiều giờ làm việc với máy tính, dịch vụ của Oni Biocare giúp tôi giảm đau vai gáy và cải thiện tập trung. Tôi sẽ tiếp tục sử dụng dịch vụ này.",
    rating: 4.9,
  },
  {
    image: "",
    name: "Phạm Thành Đạt",
    userName: "Nhà khoa học dữ liệu",
    comment:
      "Đội ngũ chuyên viên rất chuyên nghiệp và thân thiện. Họ lắng nghe nhu cầu của tôi và điều chỉnh liệu trình phù hợp. Kết quả vượt quá mong đợi của tôi.",
    rating: 5.0,
  },
  {
    image: "",
    name: "Hoàng Thị Hồng",
    userName: "Quản lý dự án",
    comment:
      "Tôi đã tặng dịch vụ này cho mẹ tôi nhân dịp sinh nhật và bà rất thích. Chuyên viên rất nhẹ nhàng và tận tâm, đặc biệt phù hợp cho người cao tuổi.",
    rating: 5.0,
  },
  {
    image: "",
    name: "Vũ Minh Hoàng",
    userName: "Kỹ sư phần mềm",
    comment:
      "Lịch trình linh hoạt và dịch vụ đúng giờ. Chất lượng dịch vụ luôn ổn định qua nhiều lần sử dụng. Tôi đã giới thiệu Oni Biocare cho nhiều bạn bè và đồng nghiệp.",
    rating: 4.9,
  },
];

const avatarColors = [
  "from-pink-400 to-rose-500",
  "from-purple-400 to-violet-500",
  "from-fuchsia-400 to-pink-500",
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-500",
  "from-pink-500 to-fuchsia-500",
];

export const TestimonialSection = () => {
  useScrollAnimation();

  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      {/* Header */}
      <div className="text-center mb-14 space-y-4 animate-on-scroll">
        <span className="section-label">Đánh giá từ khách hàng</span>
        <h2 className="text-4xl md:text-5xl font-bold">
          Khách hàng nói gì về{" "}
          <span className="shimmer-text">chúng tôi?</span>
        </h2>
        <div className="petal-divider" />
      </div>

      <div className="animate-on-scroll" style={{ transitionDelay: "150ms" }}>
        <Carousel
          opts={{ align: "start" }}
          className="relative w-[88%] sm:w-[92%] lg:max-w-screen-xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviewList.map((review, index) => (
              <CarouselItem
                key={review.name}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="glass-card rounded-2xl h-full border-0 flex flex-col p-6 cursor-default">
                  {/* quote icon */}
                  <div className="mb-4">
                    <Quote className="size-8 text-primary/20 fill-primary/10" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="size-4 star-gold" />
                    ))}
                  </div>

                  {/* Comment */}
                  <CardContent className="p-0 flex-1 text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{review.comment}&rdquo;
                  </CardContent>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <div
                        className={`size-full rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {review.name.split(" ").pop()?.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold leading-tight">
                        {review.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{review.userName}</CardDescription>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-primary/20 text-primary hover:bg-primary/10" />
          <CarouselNext className="border-primary/20 text-primary hover:bg-primary/10" />
        </Carousel>
      </div>
    </section>
  );
};
