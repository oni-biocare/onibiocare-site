import type {
  DoseAnswers,
  DoseBandLabel,
  DoseQuestion,
  DoseResults,
  DoseScore,
  DoseSectionKey,
  DoseScoresBySection,
  LikertValue,
} from "@/lib/dose/types";
import { DOSE_SECTIONS, DOSE_QUESTIONS } from "@/lib/dose/questions";

const SECTION_ORDER: DoseSectionKey[] = [
  "dopamine",
  "oxytocin",
  "serotonin",
  "endorphins",
];

export function reverseScore(value: LikertValue): LikertValue {
  return (6 - value) as LikertValue;
}

export function bandForScore(score: number): DoseBandLabel {
  if (score <= 11) return "Very Low";
  if (score <= 15) return "Low";
  if (score <= 20) return "Moderate";
  if (score <= 25) return "High";
  return "Very High";
}

export function scoreQuestion(q: DoseQuestion, raw: LikertValue): LikertValue {
  return q.reverse ? reverseScore(raw) : raw;
}

export function scoreSection(
  section: DoseSectionKey,
  answers: DoseAnswers,
): number {
  const questions = DOSE_QUESTIONS.filter((q) => q.section === section);
  let sum = 0;

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined) {
      throw new Error(`Missing answer for ${q.id}`);
    }
    sum += scoreQuestion(q, raw);
  }

  return sum;
}

function sectionName(section: DoseSectionKey) {
  const found = DOSE_SECTIONS.find((s) => s.key === section);
  return found?.title ?? section;
}

function traitForSection(section: DoseSectionKey) {
  switch (section) {
    case "dopamine":
      return "động lực và sức mạnh thúc đẩy";
    case "oxytocin":
      return "kết nối và an toàn cảm xúc";
    case "serotonin":
      return "ổn định tâm trạng và tự tin bình thản";
    case "endorphins":
      return "giải toả và phục hồi sau căng thẳng";
  }
}

function copyForSection(section: DoseSectionKey, band: DoseBandLabel) {
  switch (section) {
    case "dopamine": {
      switch (band) {
        case "Very Low":
          return {
            state: "Động lực và cảm giác phần thưởng của bạn đang không được nuôi dưỡng đủ lúc này.",
            patterns: ["Khó bắt đầu", "Tiến bộ không cảm thấy xứng đáng"],
            suggestions: ["Đặt mục tiêu nhỏ mỗi ngày", "Theo dõi tiến trình trực quan"],
          };
        case "Low":
          return {
            state: "Động lực của bạn không ổn định — năng lượng đến rồi lại đi.",
            patterns: ["Động lực đến từng đợt", "Khó duy trì kiên trì"],
            suggestions: ["Lên kế hoạch những bước nhỏ tiếp theo", "Tự thưởng cho những thành tích nhỏ"],
          };
        case "Moderate":
          return {
            state: "Bạn có thể tiến bộ, đặc biệt khi có cấu trúc và thói quen rõ ràng.",
            patterns: ["Nền tảng hoạt động ổn", "Cần lên kế hoạch để đi đúng hướng"],
            suggestions: ["Phân bổ thời gian cho ưu tiên", "Ôn lại mục tiêu hàng tuần"],
          };
        case "High":
          return {
            state: "Bạn tự thúc đẩy bản thân — mục tiêu tiếp thêm năng lượng và giúp bạn kiên trì.",
            patterns: ["Kiên trì tốt", "Được thúc đẩy bởi tiến bộ"],
            suggestions: ["Bảo vệ thời gian tập trung", "Tránh nhận quá nhiều việc"],
          };
        case "Very High":
          return {
            state: "Bạn rất giàu năng lượng về mục tiêu — động lực là tài sản cá nhân mạnh mẽ.",
            patterns: ["Động lực rất mạnh", "Nhạy cảm cao với phần thưởng"],
            suggestions: ["Chú ý nguy cơ kiệt sức", "Lên lịch nghỉ ngơi có chủ đích"],
          };
      }
    }
    case "oxytocin": {
      switch (band) {
        case "Very Low":
          return {
            state: "Kết nối và an toàn cảm xúc đang không được nuôi dưỡng đủ lúc này.",
            patterns: ["Cô đơn hoặc xa cách", "Thời gian giao lưu không giúp xoa dịu"],
            suggestions: ["Liên hệ với một người bạn tin tưởng", "Kết nối nhẹ nhàng, không áp lực"],
          };
        case "Low":
          return {
            state: "Bạn có một số kết nối, nhưng chúng có thể chưa đủ sâu sắc để nuôi dưỡng bạn.",
            patterns: ["Hỗ trợ mỏng manh", "Khó nhận sự giúp đỡ"],
            suggestions: ["Nhờ một sự hỗ trợ nhỏ", "Tạo thói quen kiểm tra định kỳ với nhau"],
          };
        case "Moderate":
          return {
            state: "Bạn có ít nhất một kết nối vững chắc đôi khi có thể giúp đỡ bạn.",
            patterns: ["Có chút an toàn cảm xúc", "Hỗ trợ không ổn định"],
            suggestions: ["Củng cố một mối quan hệ", "Dành nhiều thời gian cùng nhau hơn"],
          };
        case "High":
          return {
            state: "Bạn cảm thấy được hỗ trợ tốt — niềm tin và sự thuộc về đều mạnh mẽ.",
            patterns: ["Các mối quan hệ an toàn về cảm xúc", "Thời gian giao lưu giúp bạn bình tâm"],
            suggestions: ["Bảo vệ ranh giới cá nhân", "Tiếp tục vun đắp các mối quan hệ quan trọng"],
          };
        case "Very High":
          return {
            state: "Bạn có sự kết nối sâu sắc — mối quan hệ là điểm mạnh nhất quán của bạn.",
            patterns: ["Sự gần gũi phong phú", "Mạng lưới hỗ trợ vững chắc"],
            suggestions: ["Tránh cho đi quá mức", "Duy trì ranh giới lành mạnh"],
          };
      }
    }
    case "serotonin": {
      switch (band) {
        case "Very Low":
          return {
            state: "Sự ổn định tâm trạng cảm thấy nặng nề — những vòng xoáy tiêu cực có thể thường xuyên xảy ra.",
            patterns: ["Tự tin thấp", "Khó tự xoa dịu bản thân"],
            suggestions: ["Thói quen xoa dịu đơn giản", "Tìm kiếm hỗ trợ nếu cần"],
          };
        case "Low":
          return {
            state: "Sự cân bằng của bạn mong manh — tâm trạng phụ thuộc nhiều vào hoàn cảnh.",
            patterns: ["Tâm trạng nhạy cảm với căng thẳng", "Sự tự tin không ổn định"],
            suggestions: ["Thói quen bình ổn hàng ngày", "Giảm các tác nhân gây suy nghĩ lặp lại"],
          };
        case "Moderate":
          return {
            state: "Bạn nhìn chung ổn; việc phục hồi sau căng thẳng cần một chút nỗ lực.",
            patterns: ["Khá ổn định", "Cần làm mới một cách có chủ đích"],
            suggestions: ["Ngủ đủ giấc và tiếp xúc ánh sáng", "Duy trì thói quen nhất quán"],
          };
        case "High":
          return {
            state: "Bạn bình tĩnh và tự tin — tâm trạng nền tảng của bạn ổn định.",
            patterns: ["Tư duy kiên cường", "Tự điều tiết tốt"],
            suggestions: ["Giữ những gì đang hiệu quả", "Hỗ trợ người khác mà không cạn kiệt bản thân"],
          };
        case "Very High":
          return {
            state: "Bạn rất vững vàng — sự ổn định nội tâm là tài sản nhất quán của bạn.",
            patterns: ["Sự vững chắc mạnh mẽ", "Phục hồi nhanh"],
            suggestions: ["Duy trì thói quen của bạn", "Đừng bỏ bê việc nghỉ ngơi"],
          };
      }
    }
    case "endorphins": {
      switch (band) {
        case "Very Low":
          return {
            state: "Căng thẳng có thể tích tụ trong cơ thể — sự giải toả và giảm nhẹ cảm thấy hạn chế.",
            patterns: ["Căng thẳng kéo dài", "Khó làm mới bản thân"],
            suggestions: ["Vận động nhẹ nhàng", "Thêm tiếng cười và sự nhẹ nhõm"],
          };
        case "Low":
          return {
            state: "Đôi khi bạn có thể tìm thấy sự giải toả, nhưng chưa ổn định.",
            patterns: ["Ít công cụ làm mới", "Giải toả căng thẳng không ổn định"],
            suggestions: ["Chọn một thói quen làm mới", "Đi bộ ngắn hoặc giãn cơ"],
          };
        case "Moderate":
          return {
            state: "Bạn có thể phục hồi với sự cố ý — sự giải toả chưa hoàn toàn tự động.",
            patterns: ["Có khả năng phục hồi nhất định", "Cần lối thoát có chủ đích"],
            suggestions: ["Lên lịch vận động", "Xây dựng nghi thức làm mới bản thân"],
          };
        case "High":
          return {
            state: "Bạn có bộ đệm tốt cho căng thẳng — sự giải toả và niềm vui diễn ra đều đặn.",
            patterns: ["Giải toả đều đặn", "Lối thoát làm mới lành mạnh"],
            suggestions: ["Duy trì các lối thoát ổn định", "Cân bằng cường độ"],
          };
        case "Very High":
          return {
            state: "Bạn kiên cường và nhẹ nhõm — khả năng phục hồi là điểm mạnh nhất quán.",
            patterns: ["Phản ứng giải toả mạnh", "Khả năng phục hồi cao"],
            suggestions: ["Tránh dùng cường độ cao làm cách đối phó", "Duy trì sự đa dạng"],
          };
      }
    }
  }
}

export function computeDoseScores(answers: DoseAnswers): DoseScoresBySection {
  const scores = {} as DoseScoresBySection;

  for (const section of SECTION_ORDER) {
    const raw = scoreSection(section, answers);
    const band = bandForScore(raw);
    const copy = copyForSection(section, band);

    scores[section] = {
      raw,
      band,
      state: copy.state,
      patterns: copy.patterns as [string, string],
      suggestions: copy.suggestions,
    } satisfies DoseScore;
  }

  return scores;
}

export function pickPillar(scores: DoseScoresBySection): DoseSectionKey {
  let best = SECTION_ORDER[0];
  for (const section of SECTION_ORDER) {
    if (scores[section].raw > scores[best].raw) best = section;
  }
  return best;
}

export function pickPriority(scores: DoseScoresBySection): DoseSectionKey {
  let worst = SECTION_ORDER[0];
  for (const section of SECTION_ORDER) {
    if (scores[section].raw < scores[worst].raw) worst = section;
  }
  return worst;
}

export function balanceInsight(
  pillar: DoseSectionKey,
  priority: DoseSectionKey,
): string {
  const pillarName = sectionName(pillar);
  const priorityName = sectionName(priority);
  const pillarTrait = traitForSection(pillar);
  const priorityTrait = traitForSection(priority);

  if (pillar === priority) {
    return `Hồ sơ của bạn khá cân bằng trên cả bốn lĩnh vực. Hãy tiếp tục duy trì thói quen để củng cố ${pillarTrait}.`;
  }

  return `Bạn mạnh hơn ở ${pillarName} (${pillarTrait}), nhưng thấp hơn ở ${priorityName} (${priorityTrait}). Hãy tập trung vào những thói quen nhỏ để phát triển ${priorityTrait} trong khi bảo vệ ${pillarTrait} của bạn.`;
}

export function computeDoseResults(answers: DoseAnswers): DoseResults {
  const scores = computeDoseScores(answers);
  const pillar = pickPillar(scores);
  const priority = pickPriority(scores);

  return {
    scores,
    insights: {
      pillar,
      priority,
      balance: balanceInsight(pillar, priority),
    },
  };
}

export function doseRadarChartData(scores: DoseScoresBySection) {
  const labels = DOSE_SECTIONS.map((s) => s.title);
  const data = SECTION_ORDER.map((k) => scores[k].raw);
  const normalized = SECTION_ORDER.map((k) =>
    Math.round(((scores[k].raw - 6) / 24) * 100),
  );

  return { labels, data, normalized };
}
