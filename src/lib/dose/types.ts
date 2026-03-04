export type DoseSectionKey = "dopamine" | "oxytocin" | "serotonin" | "endorphins";

/** Which questionnaire mode the user selected on the intro page */
export type DoseModeKey = DoseSectionKey | "all";

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type DoseBandLabel =
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export type DoseQuestion = {
  id: string;
  section: DoseSectionKey;
  orderInSection: 1 | 2 | 3 | 4 | 5 | 6;
  prompt: string;
  reverse?: boolean;
};

export type DoseAnswers = Record<string, LikertValue | undefined>;

export type DoseScore = {
  raw: number; // 6-30
  band: DoseBandLabel;
  state: string;
  patterns: [string, string];
  suggestions?: string[];
};

export type DoseScoresBySection = Record<DoseSectionKey, DoseScore>;

export type DoseInsights = {
  pillar: DoseSectionKey;
  priority: DoseSectionKey;
  balance: string;
};

export type DoseResults = {
  scores: DoseScoresBySection;
  insights: DoseInsights;
};
