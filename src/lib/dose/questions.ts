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
    prompt: "Bạn có thường bị cuốn vào cảm giác “phải bắt đầu cái gì đó mới” khi thấy người khác thành công hoặc có trend hot không?",
  },
  {
    id: "dopamine_2",
    section: "dopamine",
    orderInSection: 2,
    prompt: "Bạn có thường cực kỳ hứng thú lúc lên kế hoạch, nhưng khi bắt tay làm thật thì lại nhanh tụt mood không?",
  },
  {
    id: "dopamine_3",
    section: "dopamine",
    orderInSection: 3,
    prompt: "Bạn có thường xuyên bỏ dở việc đang làm chỉ vì thấy một thứ khác “có vẻ thú vị hơn” không?",
  },
  {
    id: "dopamine_4",
    section: "dopamine",
    orderInSection: 4,
    prompt: "Khi cảm thấy chán hoặc trống rỗng, bạn có thường vô thức lướt điện thoại, mua sắm hoặc tìm gì đó để “đỡ thấy chán” không?",
  },
  {
    id: "dopamine_5",
    section: "dopamine",
    orderInSection: 5,
    prompt: "Bạn có thường thấy khó theo đuổi một mục tiêu lâu dài nếu không còn cảm giác hứng thú ban đầu không?",
  },
  {
    id: "dopamine_6",
    section: "dopamine",
    orderInSection: 6,
    reverse: true,
    prompt: "Bạn có thường cảm thấy mình “có năng lượng hơn hẳn” khi có thứ gì đó mới mẻ, và dễ tụt mood khi mọi thứ trở nên quen thuộc không?",
  },

  {
    id: "oxytocin_1",
    section: "oxytocin",
    orderInSection: 1,
    prompt: "Bạn có thường cảm thấy cô đơn ngay cả khi vẫn đang nói chuyện với người khác không?",
  },
  {
    id: "oxytocin_2",
    section: "oxytocin",
    orderInSection: 2,
    prompt: "Bạn có thường ngại mở lòng hoặc chia sẻ thật cảm xúc của mình với người khác không?",
  },
  {
    id: "oxytocin_3",
    section: "oxytocin",
    orderInSection: 3,
    prompt: "Bạn có thường cảm thấy các mối quan hệ của mình “hời hợt”, khó gắn bó lâu dài không?",
  },
  {
    id: "oxytocin_4",
    section: "oxytocin",
    orderInSection: 4,
    prompt: "Khi buồn hoặc stress, bạn có thường tự chịu một mình thay vì tìm ai đó để chia sẻ không?",
  },
  {
    id: "oxytocin_5",
    section: "oxytocin",
    orderInSection: 5,
    prompt: "Bạn có thường cảm thấy thiếu sự quan tâm, dù xung quanh vẫn có người không?",
  },
  {
    id: "oxytocin_6",
    section: "oxytocin",
    orderInSection: 6,
    reverse: true,
    prompt: "Bạn có thường cảm thấy khó tin tưởng người khác hoàn toàn không?",
  },

  {
    id: "serotonin_1",
    section: "serotonin",
    orderInSection: 1,
    prompt: "Bạn có thường cảm thấy mình “kém hơn người khác” khi lướt mạng xã hội không?",
  },
  {
    id: "serotonin_2",
    section: "serotonin",
    orderInSection: 2,
    prompt: "Bạn có thường cần người khác công nhận thì mới thấy mình có giá trị không?",
  },
  {
    id: "serotonin_3",
    section: "serotonin",
    orderInSection: 3,
    prompt: "Bạn có thường tụt mood dù không có lý do rõ ràng không?",
  },
  {
    id: "serotonin_4",
    section: "serotonin",
    orderInSection: 4,
    prompt: "Bạn có thường tự nghi ngờ bản thân, ngay cả khi mình đang làm khá tốt không?",
  },
  {
    id: "serotonin_5",
    section: "serotonin",
    orderInSection: 5,
    prompt: "Bạn có thường cảm thấy cuộc sống của mình “không đủ thú vị hoặc ý nghĩa” không?",
  },
  {
    id: "serotonin_6",
    section: "serotonin",
    orderInSection: 6,
    reverse: true,
    prompt: "Bạn có thường so sánh bản thân với người khác và cảm thấy thua kém không?",
  },

  {
    id: "endorphins_1",
    section: "endorphins",
    orderInSection: 1,
    prompt: "Bạn có thường cảm thấy căng thẳng tích tụ nhưng không biết xả bằng cách nào không?",
  },
  {
    id: "endorphins_2",
    section: "endorphins",
    orderInSection: 2,
    prompt: "Bạn có thường cảm thấy mệt mỏi, nặng nề dù không làm gì quá sức không?",
  },
  {
    id: "endorphins_3",
    section: "endorphins",
    orderInSection: 3,
    prompt: "Bạn có thường chọn lướt điện thoại, ăn uống hoặc nằm ì thay vì vận động khi stress không?",
  },
  {
    id: "endorphins_4",
    section: "endorphins",
    orderInSection: 4,
    prompt: "Bạn có thường khó cảm thấy “nhẹ người thật sự” sau một ngày dài không?",
  },
  {
    id: "endorphins_5",
    section: "endorphins",
    orderInSection: 5,
    prompt: "Bạn có thường cảm thấy cơ thể bị “bí”, không thoải mái, dễ căng cứng (vai, cổ, lưng…) không?",
  },
  {
    id: "endorphins_6",
    section: "endorphins",
    orderInSection: 6,
    reverse: true,
    prompt: "Bạn có thường cảm thấy khó thật sự “cười thoải mái” hoặc tận hưởng niềm vui một cách trọn vẹn không?",
  },
];

export function getDoseQuestionsForSection(section: DoseSectionKey) {
  return DOSE_QUESTIONS.filter((q) => q.section === section).sort(
    (a, b) => a.orderInSection - b.orderInSection,
  );
}
