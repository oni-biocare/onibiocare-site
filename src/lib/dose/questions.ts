import type { DoseQuestion, DoseSectionKey } from "@/lib/dose/types";

export const DOSE_SECTIONS: Array<{
  key: DoseSectionKey;
  title: string;
  subtitle: string;
}> = [
  {
    key: "dopamine",
    title: "Dopamine",
    subtitle: "Drive, reward, focus",
  },
  {
    key: "oxytocin",
    title: "Oxytocin",
    subtitle: "Bonding, trust, safety",
  },
  {
    key: "serotonin",
    title: "Serotonin",
    subtitle: "Mood stability, calm confidence",
  },
  {
    key: "endorphins",
    title: "Endorphins",
    subtitle: "Stress relief, release, resilience",
  },
];

export const DOSE_QUESTIONS: DoseQuestion[] = [
  {
    id: "dopamine_1",
    section: "dopamine",
    orderInSection: 1,
    prompt: "I feel a clear sense of excitement when I start a new goal or project.",
  },
  {
    id: "dopamine_2",
    section: "dopamine",
    orderInSection: 2,
    prompt:
      "I can stay focused on tasks that matter to me without needing constant reminders.",
  },
  {
    id: "dopamine_3",
    section: "dopamine",
    orderInSection: 3,
    prompt: "Completing even small tasks gives me a satisfying “progress” feeling.",
  },
  {
    id: "dopamine_4",
    section: "dopamine",
    orderInSection: 4,
    prompt: "I feel motivated to improve my skills or learn something new.",
  },
  {
    id: "dopamine_5",
    section: "dopamine",
    orderInSection: 5,
    prompt: "I tend to follow through on plans I set for myself.",
  },
  {
    id: "dopamine_6",
    section: "dopamine",
    orderInSection: 6,
    reverse: true,
    prompt: "I often feel “meh” even when good things happen.",
  },

  {
    id: "oxytocin_1",
    section: "oxytocin",
    orderInSection: 1,
    prompt: "I feel emotionally close to at least one person in my life.",
  },
  {
    id: "oxytocin_2",
    section: "oxytocin",
    orderInSection: 2,
    prompt: "I feel safe being myself around people I trust.",
  },
  {
    id: "oxytocin_3",
    section: "oxytocin",
    orderInSection: 3,
    prompt: "I find it easy to give or receive support in relationships.",
  },
  {
    id: "oxytocin_4",
    section: "oxytocin",
    orderInSection: 4,
    prompt:
      "Positive social time (talking, sharing, being together) leaves me feeling calmer.",
  },
  {
    id: "oxytocin_5",
    section: "oxytocin",
    orderInSection: 5,
    prompt: "I regularly experience warmth/affection (from people or pets).",
  },
  {
    id: "oxytocin_6",
    section: "oxytocin",
    orderInSection: 6,
    reverse: true,
    prompt: "I often feel disconnected from others even when I’m with them.",
  },

  {
    id: "serotonin_1",
    section: "serotonin",
    orderInSection: 1,
    prompt: "My mood is generally steady across the day.",
  },
  {
    id: "serotonin_2",
    section: "serotonin",
    orderInSection: 2,
    prompt: "I feel content with my life overall, even if it isn’t perfect.",
  },
  {
    id: "serotonin_3",
    section: "serotonin",
    orderInSection: 3,
    prompt: "I feel confident in my ability to handle typical challenges.",
  },
  {
    id: "serotonin_4",
    section: "serotonin",
    orderInSection: 4,
    prompt:
      "I can calm myself down after stress without too much difficulty.",
  },
  {
    id: "serotonin_5",
    section: "serotonin",
    orderInSection: 5,
    prompt:
      "I feel respected or valued in at least one community (work, family, friends).",
  },
  {
    id: "serotonin_6",
    section: "serotonin",
    orderInSection: 6,
    reverse: true,
    prompt: "I often spiral into negative thoughts that are hard to stop.",
  },

  {
    id: "endorphins_1",
    section: "endorphins",
    orderInSection: 1,
    prompt:
      "After physical activity, I notice my mood improves (even slightly).",
  },
  {
    id: "endorphins_2",
    section: "endorphins",
    orderInSection: 2,
    prompt: "I frequently experience genuine laughter or lightness in my week.",
  },
  {
    id: "endorphins_3",
    section: "endorphins",
    orderInSection: 3,
    prompt:
      "When I’m stressed, I have at least one healthy activity that helps me “reset.”",
  },
  {
    id: "endorphins_4",
    section: "endorphins",
    orderInSection: 4,
    prompt:
      "I can tolerate discomfort (effort, fatigue, pressure) without immediately shutting down.",
  },
  {
    id: "endorphins_5",
    section: "endorphins",
    orderInSection: 5,
    prompt:
      "I often feel a sense of release or relief after doing something challenging.",
  },
  {
    id: "endorphins_6",
    section: "endorphins",
    orderInSection: 6,
    reverse: true,
    prompt: "I feel physically tense or “wired” most days.",
  },
];

export function getDoseQuestionsForSection(section: DoseSectionKey) {
  return DOSE_QUESTIONS.filter((q) => q.section === section).sort(
    (a, b) => a.orderInSection - b.orderInSection,
  );
}
