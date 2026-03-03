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
      return "momentum and drive";
    case "oxytocin":
      return "connection and emotional safety";
    case "serotonin":
      return "mood stability and calm confidence";
    case "endorphins":
      return "release and stress recovery";
  }
}

function copyForSection(section: DoseSectionKey, band: DoseBandLabel) {
  // State summaries aligned to docs/dose-requirement.md
  switch (section) {
    case "dopamine": {
      switch (band) {
        case "Very Low":
          return {
            state: "Your drive and reward feeling are under-supported right now.",
            patterns: ["Hard to start", "Progress doesn’t feel rewarding"],
            suggestions: ["Daily micro-goals", "Visible progress tracking"],
          };
        case "Low":
          return {
            state: "Your motivation is inconsistent—momentum comes and goes.",
            patterns: ["Bursts of motivation", "Hard to sustain follow-through"],
            suggestions: ["Plan tiny next steps", "Reward small wins"],
          };
        case "Moderate":
          return {
            state: "You can make progress, especially with structure and routines.",
            patterns: ["Functional baseline", "Needs planning to stay on track"],
            suggestions: ["Time-block priorities", "Weekly goal review"],
          };
        case "High":
          return {
            state: "You’re self-driven—goals energize you and support follow-through.",
            patterns: ["Good follow-through", "Motivated by progress"],
            suggestions: ["Protect focus time", "Avoid overcommitting"],
          };
        case "Very High":
          return {
            state: "You’re highly goal-charged—drive is a strong personal asset.",
            patterns: ["Very strong momentum", "High reward sensitivity"],
            suggestions: ["Watch burnout", "Schedule deliberate rest"],
          };
      }
    }
    case "oxytocin": {
      switch (band) {
        case "Very Low":
          return {
            state: "Connection and emotional safety feel under-supported right now.",
            patterns: ["Loneliness or disconnection", "Social time doesn’t soothe"],
            suggestions: ["Reach out to one safe person", "Low-pressure connection"],
          };
        case "Low":
          return {
            state: "You have some connections, but they may not feel deeply nourishing.",
            patterns: ["Thin support", "Difficulty receiving help"],
            suggestions: ["Ask for one small support", "Create regular check-ins"],
          };
        case "Moderate":
          return {
            state: "You have at least one anchor connection that helps sometimes.",
            patterns: ["Some emotional safety", "Support is inconsistent"],
            suggestions: ["Strengthen one bond", "More shared time"],
          };
        case "High":
          return {
            state: "You feel well-supported—trust and belonging are strong.",
            patterns: ["Emotionally safe bonds", "Social time calms you"],
            suggestions: ["Protect boundaries", "Keep nurturing key relationships"],
          };
        case "Very High":
          return {
            state: "You’re deeply bonded—connection is a consistent strength.",
            patterns: ["Rich closeness", "Strong support network"],
            suggestions: ["Avoid overgiving", "Maintain healthy boundaries"],
          };
      }
    }
    case "serotonin": {
      switch (band) {
        case "Very Low":
          return {
            state: "Mood stability feels heavy—negative spirals may be common.",
            patterns: ["Low confidence", "Hard to self-soothe"],
            suggestions: ["Simple calming routine", "Seek support if needed"],
          };
        case "Low":
          return {
            state: "Your balance is fragile—mood depends heavily on circumstances.",
            patterns: ["Stress-sensitive mood", "Confidence fluctuates"],
            suggestions: ["Daily grounding habit", "Reduce rumination triggers"],
          };
        case "Moderate":
          return {
            state: "You’re generally okay; recovery after stress takes some effort.",
            patterns: ["Stable enough", "Needs intentional reset"],
            suggestions: ["Sleep and light exposure", "Consistent routines"],
          };
        case "High":
          return {
            state: "You’re calm and confident—your baseline mood is steady.",
            patterns: ["Resilient mindset", "Good self-regulation"],
            suggestions: ["Keep what works", "Support others without draining"],
          };
        case "Very High":
          return {
            state: "You’re very grounded—inner stability is a consistent asset.",
            patterns: ["Strong steadiness", "Quick recovery"],
            suggestions: ["Maintain your routines", "Don’t neglect rest"],
          };
      }
    }
    case "endorphins": {
      switch (band) {
        case "Very Low":
          return {
            state: "Stress may stick in your body—relief and release feel limited.",
            patterns: ["Tension persists", "Hard to reset"],
            suggestions: ["Gentle movement", "Add laughter/lightness"],
          };
        case "Low":
          return {
            state: "You can find relief sometimes, but it isn’t consistent yet.",
            patterns: ["Limited reset tools", "Stress relief inconsistent"],
            suggestions: ["Pick one reset habit", "Short walks or stretching"],
          };
        case "Moderate":
          return {
            state: "You can recover with intention—release isn’t fully automatic.",
            patterns: ["Some recovery capacity", "Needs deliberate outlet"],
            suggestions: ["Schedule movement", "Build a reset ritual"],
          };
        case "High":
          return {
            state: "You have a good stress buffer—release and joy happen regularly.",
            patterns: ["Regular relief", "Healthy reset outlets"],
            suggestions: ["Keep consistent outlets", "Balance intensity"],
          };
        case "Very High":
          return {
            state: "You’re resilient and light—recovery is a consistent strength.",
            patterns: ["Strong release response", "High resilience"],
            suggestions: ["Avoid intensity-as-coping", "Maintain variety"],
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
      patterns: copy.patterns,
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
    return `Your profile is fairly balanced across the four areas. Keep supporting your routines for ${pillarTrait}.`;
  }

  return `You’re stronger in ${pillarName} (${pillarTrait}), but lower in ${priorityName} (${priorityTrait}). Focus on small routines that build ${priorityTrait} while protecting your ${pillarTrait}.`;
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
