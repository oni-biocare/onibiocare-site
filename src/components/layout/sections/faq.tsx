import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Dịch vụ trị liệu tại nhà của Oni Biocare bao gồm những gì?",
    answer: "Chúng tôi cung cấp các liệu trình giảm đau mỏi xương khớp, thư giãn cơ thể, giảm căng thẳng và cải thiện giấc ngủ, được thiết kế riêng cho từng khách hàng.",
    value: "item-1",
  },
  {
    question: "Chuyên viên trị liệu có được đào tạo chuyên môn không?",
    answer:
      "Đội ngũ chuyên viên của chúng tôi được đào tạo bài bản và có kinh nghiệm, đảm bảo quy trình trị liệu an toàn, hiệu quả và chuyên nghiệp.",
    value: "item-2",
  },
  {
    question:
      "Làm thế nào để đặt lịch hẹn?",
    answer:
      "Bạn có thể đặt lịch qua các trang mạng xã hội, hotline hoặc ứng dụng của Oni Biocare. Chúng tôi linh hoạt trong thời gian để phù hợp với lịch trình của bạn.",
    value: "item-3",
  },
  {
    question: "Chi phí dịch vụ như thế nào?",
    answer: "Dịch vụ của chúng tôi có mức giá cạnh tranh và rõ ràng, không phát sinh chi phí ẩn. Bạn có thể chọn gói dịch vụ phù hợp với nhu cầu và ngân sách.",
    value: "item-4",
  },
  {
    question:
      "Dịch vụ có phù hợp cho người cao tuổi không?",
    answer: "Hoàn toàn phù hợp! Các liệu trình của chúng tôi đặc biệt được thiết kế để hỗ trợ người cao tuổi giảm đau nhức, thư giãn và cải thiện sức khỏe toàn diện.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Câu hỏi thường gặp
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
