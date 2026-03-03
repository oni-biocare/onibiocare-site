import type { DoseQuestion, DoseSectionKey } from "@/lib/dose/types";

export const DOSE_SECTIONS: Array<{
  key: DoseSectionKey;
  title: string;
  subtitle: string;
}> = [
    {
      key: "dopamine",
      title: "Dopamine",
      subtitle: "Động lực, phần thưởng, sự tập trung",
    },
    {
      key: "oxytocin",
      title: "Oxytocin",
      subtitle: "Kết nối, tin tưởng, an toàn",
    },
    {
      key: "serotonin",
      title: "Serotonin",
      subtitle: "Ổn định tâm trạng, tự tin bình thản",
    },
    {
      key: "endorphins",
      title: "Endorphins",
      subtitle: "Giải toả căng thẳng, phục hồi, kiên cường",
    },
  ];

export const DOSE_QUESTIONS: DoseQuestion[] = [
  {
    id: "dopamine_1",
    section: "dopamine",
    orderInSection: 1,
    prompt: "Tôi cảm thấy rõ ràng sự hứng khởi khi bắt đầu một mục tiêu hoặc dự án mới.",
  },
  {
    id: "dopamine_2",
    section: "dopamine",
    orderInSection: 2,
    prompt: "Tôi có thể duy trì sự tập trung vào các công việc quan trọng mà không cần nhắc nhở liên tục.",
  },
  {
    id: "dopamine_3",
    section: "dopamine",
    orderInSection: 3,
    prompt: "Hoàn thành dù chỉ những việc nhỏ cũng mang lại cho tôi cảm giác thỏa mãn về sự tiến bộ.",
  },
  {
    id: "dopamine_4",
    section: "dopamine",
    orderInSection: 4,
    prompt: "Tôi cảm thấy có động lực để nâng cao kỹ năng hoặc học điều gì đó mới.",
  },
  {
    id: "dopamine_5",
    section: "dopamine",
    orderInSection: 5,
    prompt: "Tôi có xu hướng thực hiện đúng những kế hoạch mình đã đặt ra.",
  },
  {
    id: "dopamine_6",
    section: "dopamine",
    orderInSection: 6,
    reverse: true,
    prompt: "Tôi thường cảm thấy thờ ơ ngay cả khi những điều tốt đẹp xảy ra.",
  },

  {
    id: "oxytocin_1",
    section: "oxytocin",
    orderInSection: 1,
    prompt: "Tôi cảm thấy gần gũi về mặt cảm xúc với ít nhất một người trong cuộc sống.",
  },
  {
    id: "oxytocin_2",
    section: "oxytocin",
    orderInSection: 2,
    prompt: "Tôi cảm thấy an toàn khi là chính mình bên những người tôi tin tưởng.",
  },
  {
    id: "oxytocin_3",
    section: "oxytocin",
    orderInSection: 3,
    prompt: "Tôi dễ dàng cho đi hoặc nhận sự hỗ trợ trong các mối quan hệ.",
  },
  {
    id: "oxytocin_4",
    section: "oxytocin",
    orderInSection: 4,
    prompt: "Thời gian giao lưu tích cực (nói chuyện, chia sẻ, ở bên nhau) khiến tôi cảm thấy bình tâm hơn.",
  },
  {
    id: "oxytocin_5",
    section: "oxytocin",
    orderInSection: 5,
    prompt: "Tôi thường xuyên cảm nhận được sự ấm áp và tình cảm (từ người thân hoặc thú cưng).",
  },
  {
    id: "oxytocin_6",
    section: "oxytocin",
    orderInSection: 6,
    reverse: true,
    prompt: "Tôi thường cảm thấy xa cách với người khác dù đang ở bên họ.",
  },

  {
    id: "serotonin_1",
    section: "serotonin",
    orderInSection: 1,
    prompt: "Tâm trạng của tôi nhìn chung ổn định trong suốt cả ngày.",
  },
  {
    id: "serotonin_2",
    section: "serotonin",
    orderInSection: 2,
    prompt: "Tôi cảm thấy hài lòng với cuộc sống nói chung, dù nó không hoàn hảo.",
  },
  {
    id: "serotonin_3",
    section: "serotonin",
    orderInSection: 3,
    prompt: "Tôi tự tin vào khả năng của mình khi đối mặt với những thách thức thông thường.",
  },
  {
    id: "serotonin_4",
    section: "serotonin",
    orderInSection: 4,
    prompt: "Tôi có thể tự xoa dịu bản thân sau khi căng thẳng mà không gặp quá nhiều khó khăn.",
  },
  {
    id: "serotonin_5",
    section: "serotonin",
    orderInSection: 5,
    prompt: "Tôi cảm thấy được tôn trọng hoặc đánh giá cao trong ít nhất một cộng đồng (công việc, gia đình, bạn bè).",
  },
  {
    id: "serotonin_6",
    section: "serotonin",
    orderInSection: 6,
    reverse: true,
    prompt: "Tôi thường rơi vào vòng xoáy của những suy nghĩ tiêu cực khó dừng lại.",
  },

  {
    id: "endorphins_1",
    section: "endorphins",
    orderInSection: 1,
    prompt: "Sau khi vận động thể chất, tôi nhận thấy tâm trạng mình cải thiện (dù chỉ một chút).",
  },
  {
    id: "endorphins_2",
    section: "endorphins",
    orderInSection: 2,
    prompt: "Tôi thường xuyên có những khoảnh khắc cười thật sự hoặc cảm giác nhẹ nhõm trong tuần.",
  },
  {
    id: "endorphins_3",
    section: "endorphins",
    orderInSection: 3,
    prompt: "Khi căng thẳng, tôi có ít nhất một hoạt động lành mạnh giúp tôi \"làm mới\" bản thân.",
  },
  {
    id: "endorphins_4",
    section: "endorphins",
    orderInSection: 4,
    prompt: "Tôi có thể chịu đựng sự khó chịu (nỗ lực, mệt mỏi, áp lực) mà không ngay lập tức bỏ cuộc.",
  },
  {
    id: "endorphins_5",
    section: "endorphins",
    orderInSection: 5,
    prompt: "Tôi thường cảm thấy thoải mái hoặc nhẹ nhõm sau khi làm điều gì đó thử thách.",
  },
  {
    id: "endorphins_6",
    section: "endorphins",
    orderInSection: 6,
    reverse: true,
    prompt: "Hầu hết các ngày, tôi cảm thấy căng thẳng về thể chất hoặc luôn trong trạng thái bồn chồn.",
  },
];

export function getDoseQuestionsForSection(section: DoseSectionKey) {
  return DOSE_QUESTIONS.filter((q) => q.section === section).sort(
    (a, b) => a.orderInSection - b.orderInSection,
  );
}
