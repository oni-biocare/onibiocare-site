"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Dịch vụ trị liệu tại nhà của Oni Biocare bao gồm những gì?",
    answer:
      "Chúng tôi cung cấp các liệu trình giảm đau mỏi xương khớp, thư giãn cơ thể, giảm căng thẳng và cải thiện giấc ngủ, được thiết kế riêng cho từng khách hàng.",
    value: "item-1",
  },
  {
    question: "Chuyên viên trị liệu có được đào tạo chuyên môn không?",
    answer:
      "Đội ngũ chuyên viên của chúng tôi được đào tạo bài bản và có kinh nghiệm, đảm bảo quy trình trị liệu an toàn, hiệu quả và chuyên nghiệp.",
    value: "item-2",
  },
  {
    question: "Làm thế nào để đặt lịch hẹn?",
    answer:
      "Bạn có thể đặt lịch qua các trang mạng xã hội, hotline hoặc điền vào form liên hệ trên website. Chúng tôi linh hoạt trong thời gian để phù hợp với lịch trình của bạn.",
    value: "item-3",
  },
  {
    question: "Chi phí dịch vụ như thế nào?",
    answer:
      "Dịch vụ của chúng tôi có mức giá cạnh tranh và rõ ràng, không phát sinh chi phí ẩn. Bạn có thể chọn gói dịch vụ phù hợp với nhu cầu và ngân sách.",
    value: "item-4",
  },
  {
    question: "Dịch vụ có phù hợp cho người cao tuổi không?",
    answer:
      "Hoàn toàn phù hợp! Các liệu trình của chúng tôi đặc biệt được thiết kế để hỗ trợ người cao tuổi giảm đau nhức, thư giãn và cải thiện sức khỏe toàn diện.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  useScrollAnimation();

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(210 40% 97%) 0%, hsl(156 30% 96%) 100%)",
      }}
    >
      {/* Decorative blob */}
      <div
        className="blob w-[300px] h-[300px] top-1/2 right-[-60px] opacity-12 -translate-y-1/2"
        style={{ background: "#1E88E5" }}
      />

      <div className="container md:w-[720px] relative z-10">
        <div className="text-center mb-12 space-y-4 animate-on-scroll">
          <span className="section-label">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Câu hỏi <span className="shimmer-text">thường gặp</span>
          </h2>
          <div className="petal-divider" />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQList.map(({ question, answer, value }, index) => (
            <AccordionItem
              key={value}
              value={value}
              className="animate-on-scroll glass-card rounded-2xl border-0 px-6 data-[state=open]:border-primary/30"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5 hover:text-primary transition-colors cursor-pointer">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
