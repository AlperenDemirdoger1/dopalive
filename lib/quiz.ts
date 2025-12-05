/**
 * Quiz & Profile Types
 * Data models and logic for the ADHD Project Completion Quiz
 * @module lib/quiz
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export type ProjectType =
  | "app"
  | "startup"
  | "book"
  | "portfolio"
  | "course"
  | "research"
  | "music"
  | "art"
  | "video"
  | "other";

export type StuckStage = "start" | "middle" | "finish" | "restart";

export type SupportIntensity = "low" | "medium" | "high";

export type PlanType = "free" | "membership" | "membership_pod";

export interface ADHDPatterns {
  taskInitiation: number; // 1-5 (1 = rarely struggle, 5 = always struggle)
  timeBlindness: number; // 1-5
  boredomThreshold: number; // 1-5 (how quickly you get bored)
  perfectionism: number; // 1-5
  contextSwitching: number; // 1-5 (difficulty returning to tasks)
}

export interface Environment {
  hoursPerWeek: number;
  stabilityLevel: number; // 1-5 (life stability)
  hasSupportNetwork: boolean;
}

export interface SupportPreference {
  wantsPod: boolean;
  wantsCoach: boolean;
  preferredStyle: "gentle" | "direct";
  communicationMode: "written" | "spoken" | "visual";
  aiIntensity: SupportIntensity;
}

export interface QuizAnswers {
  // Step 1: Project Context
  projectType: ProjectType;
  projectDescription?: string;
  timeStuckMonths: number;
  
  // Step 2: Where You Get Stuck
  stuckStage: StuckStage;
  
  // Step 3: ADHD Patterns
  adhdPatterns: ADHDPatterns;
  
  // Step 4: Emotional Landscape
  emotions: string[];
  identityStatements: {
    trailOfUnfinished: number; // 1-5 agree/disagree
    startStrongFadeOut: number;
    fearJudgment: number;
  };
  
  // Step 5: Environment & Constraints
  environment: Environment;
  
  // Step 6: Support Preferences
  supportPreference: SupportPreference;
  
  // Step 7: Commitment
  commitmentStatement?: string;
  flagshipProject?: string;
}

// ============================================
// ARCHETYPE DEFINITIONS
// ============================================

export type ArchetypeKey = 
  | "spark_launcher" 
  | "deep_diver" 
  | "last_mile_drifter" 
  | "multi_tab_juggler"
  | "perfectionist_paralysis"
  | "momentum_rider";

export interface Archetype {
  key: ArchetypeKey;
  displayName: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  traps: string[];
  whatThisMeans: string[];
  primaryStuckStage: StuckStage;
  focusAreas: string[];
  recommendedTools: string[];
  coachingStyle: string;
}

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  spark_launcher: {
    key: "spark_launcher",
    displayName: "Spark Launcher",
    emoji: "✨",
    tagline: "You light fires everywhere—but who's tending the flames?",
    description: "You're brilliant at starting things. The initial excitement, the vision, the first sprint of creation—that's your superpower. But somewhere between 'great idea!' and 'almost done,' the spark fades and something newer catches your eye.",
    strengths: [
      "Exceptional at generating ideas and seeing possibilities",
      "High energy in the early creative phases",
      "Natural ability to inspire others and get buy-in",
      "Quick learner who picks up new skills fast"
    ],
    traps: [
      "Chasing the dopamine of 'new' over the satisfaction of 'done'",
      "Starting 5 projects when 1 is struggling",
      "Underestimating the 'boring middle' phase",
      "Confusing motion with progress"
    ],
    whatThisMeans: [
      "Your brain craves novelty—this is neurological, not a character flaw",
      "You likely have a 'project graveyard' of things that are 10-30% done",
      "The transition from starting to sustaining is where you need the most support"
    ],
    primaryStuckStage: "start",
    focusAreas: ["Task Initiation Rituals", "Novelty Injection", "Commitment Devices"],
    recommendedTools: ["AI State Coach", "Streak Tracking", "Body Doubling"],
    coachingStyle: "Needs regular novelty injections and milestone celebrations to maintain engagement"
  },
  
  deep_diver: {
    key: "deep_diver",
    displayName: "Deep Diver",
    emoji: "🌊",
    tagline: "You go deep—sometimes too deep to come back up.",
    description: "When you're in, you're ALL in. You can spend hours in hyperfocus, making incredible progress. But context switching is your kryptonite, and when you surface from one deep dive, getting back to another project feels impossible.",
    strengths: [
      "Incredible depth of focus when engaged",
      "Produce high-quality, detailed work",
      "Can maintain complex systems in your head",
      "Patient with challenging problems"
    ],
    traps: [
      "Losing track of time during hyperfocus sessions",
      "Difficulty transitioning between tasks",
      "Getting lost in details while missing deadlines",
      "Exhaustion from intense focus cycles"
    ],
    whatThisMeans: [
      "Your hyperfocus is a feature, not a bug—but it needs guardrails",
      "Context switching costs you more mental energy than neurotypical brains",
      "You need systems for surfacing, not just diving"
    ],
    primaryStuckStage: "middle",
    focusAreas: ["Energy Management", "Transition Rituals", "Time Scaffolding"],
    recommendedTools: ["Energy Mapping", "Focus Timer", "Task Batching"],
    coachingStyle: "Needs help with transitions and energy management, protection from over-diving"
  },
  
  last_mile_drifter: {
    key: "last_mile_drifter",
    displayName: "Last-Mile Drifter",
    emoji: "🏁",
    tagline: "80% done but might as well be 0.",
    description: "You can get projects to 80%, 90%, even 95% complete. But that final stretch? It haunts you. The polish, the shipping, the 'putting it out there'—something always blocks you right before the finish line.",
    strengths: [
      "Strong ability to build and create substantial work",
      "Consistent at making progress in the middle phases",
      "Good at the technical/creative aspects",
      "Often produce near-complete, high-quality work"
    ],
    traps: [
      "Perfectionism disguised as 'just one more thing'",
      "Fear of judgment once it's 'real'",
      "Adding scope instead of finishing",
      "The emotional weight of 'almost done' paralysis"
    ],
    whatThisMeans: [
      "Finishing triggers vulnerability—your brain is protecting you",
      "The gap between 90% and 100% is emotional, not technical",
      "You need accountability and permission to ship 'good enough'"
    ],
    primaryStuckStage: "finish",
    focusAreas: ["Shipping Rituals", "Perfectionism Detox", "Emotional Safety"],
    recommendedTools: ["Pod Accountability", "Launch Checklists", "Coach Support"],
    coachingStyle: "Needs permission to ship imperfect work and celebration of completion over perfection"
  },
  
  multi_tab_juggler: {
    key: "multi_tab_juggler",
    displayName: "Multi-Tab Juggler",
    emoji: "🎪",
    tagline: "50 tabs open, 50 projects started, 50 reasons why.",
    description: "Your brain runs on parallel processing. You have multiple projects at various stages, and you're constantly cycling between them. The problem isn't starting or finishing—it's the chaos of managing it all.",
    strengths: [
      "Ability to maintain multiple complex projects",
      "Flexible and adaptable thinking",
      "Good at finding connections between different work",
      "Thrives with variety and stimulation"
    ],
    traps: [
      "Spreading energy too thin across too many projects",
      "Using switching as avoidance",
      "Losing track of where you left off",
      "Everything feels urgent, nothing feels important"
    ],
    whatThisMeans: [
      "Your brain needs variety—but it's overshooting",
      "You need a system for tracking and prioritizing, not more willpower",
      "Strategic constraint (1-2 flagship projects) could unlock everything"
    ],
    primaryStuckStage: "restart",
    focusAreas: ["Project Triage", "Priority Clarity", "Constraint Setting"],
    recommendedTools: ["Flagship Focus", "Weekly Reviews", "AI Prioritization"],
    coachingStyle: "Needs help constraining and prioritizing, with variety built into the constraint"
  },
  
  perfectionist_paralysis: {
    key: "perfectionist_paralysis",
    displayName: "Perfectionist in Paralysis",
    emoji: "💎",
    tagline: "If it can't be perfect, why start?",
    description: "Your standards are high—sometimes impossibly high. This has produced amazing work in the past, but it also means projects stall because 'not good enough' feels worse than 'not done.'",
    strengths: [
      "High standards that produce quality work",
      "Attention to detail others miss",
      "Strong vision for what 'great' looks like",
      "Take pride in craftsmanship"
    ],
    traps: [
      "Paralysis from impossibly high standards",
      "All-or-nothing thinking about progress",
      "Avoiding starting things you can't do perfectly",
      "Spending 80% of time on 20% of impact"
    ],
    whatThisMeans: [
      "Perfectionism is often anxiety wearing a productivity mask",
      "Your brain uses 'not perfect' as protection from judgment",
      "You need permission and practice shipping 'good enough'"
    ],
    primaryStuckStage: "start",
    focusAreas: ["Minimum Viable Mindset", "Anxiety Management", "Progress Over Perfection"],
    recommendedTools: ["Rough Draft Mode", "Time-Boxing", "Pod Reality Checks"],
    coachingStyle: "Needs gentle but firm encouragement to ship imperfect work and reframe 'good enough'"
  },
  
  momentum_rider: {
    key: "momentum_rider",
    displayName: "Momentum Rider",
    emoji: "🌀",
    tagline: "When you're on, you're unstoppable. When you're off, you're stuck.",
    description: "Your productivity comes in waves. When momentum is there, you can move mountains. But when it's gone, even small tasks feel impossible. The challenge is building systems that work in both states.",
    strengths: [
      "Incredibly productive during 'on' periods",
      "Can accomplish huge amounts when conditions are right",
      "Understand your patterns when you pay attention",
      "Resilient—you always come back eventually"
    ],
    traps: [
      "No systems for 'off' days",
      "Waiting for motivation instead of creating it",
      "Boom-bust cycles that burn you out",
      "Shame spirals when momentum drops"
    ],
    whatThisMeans: [
      "Your energy is variable—this is ADHD, not laziness",
      "You need different systems for high and low energy states",
      "External structure can create momentum when internal drive is low"
    ],
    primaryStuckStage: "middle",
    focusAreas: ["Energy State Awareness", "Low-Energy Protocols", "Sustainable Pacing"],
    recommendedTools: ["Energy Mapping", "State-Based Task Lists", "Body Doubling"],
    coachingStyle: "Needs state-aware support that adapts to current energy levels"
  }
};

// ============================================
// EMOTION OPTIONS
// ============================================

export const EMOTION_OPTIONS = [
  { id: "hope", label: "Hope", emoji: "🌱" },
  { id: "guilt", label: "Guilt", emoji: "😔" },
  { id: "shame", label: "Shame", emoji: "😞" },
  { id: "excitement", label: "Excitement", emoji: "✨" },
  { id: "fear", label: "Fear of failure", emoji: "😰" },
  { id: "frustration", label: "Frustration", emoji: "😤" },
  { id: "overwhelm", label: "Overwhelm", emoji: "🌊" },
  { id: "determination", label: "Determination", emoji: "💪" },
  { id: "curiosity", label: "Curiosity", emoji: "🤔" },
  { id: "anxiety", label: "Anxiety", emoji: "😬" },
  { id: "relief", label: "Relief (it's almost over)", emoji: "😮‍💨" },
  { id: "pride", label: "Pride (in what you've built)", emoji: "🎯" },
];

// ============================================
// PROJECT TYPE OPTIONS
// ============================================

export const PROJECT_TYPE_OPTIONS = [
  { id: "app", label: "App or Software", emoji: "📱", description: "Mobile app, web app, or software project" },
  { id: "startup", label: "Startup / Business", emoji: "🚀", description: "Building a company or side business" },
  { id: "book", label: "Book / Writing", emoji: "📚", description: "Novel, non-fiction, blog, or content" },
  { id: "portfolio", label: "Portfolio / Personal Brand", emoji: "💼", description: "Website, portfolio, or personal brand" },
  { id: "course", label: "Course / Educational", emoji: "🎓", description: "Online course, workshop, or educational content" },
  { id: "research", label: "Research / Academic", emoji: "🔬", description: "Thesis, paper, or research project" },
  { id: "music", label: "Music / Audio", emoji: "🎵", description: "Album, EP, podcast, or audio project" },
  { id: "art", label: "Art / Design", emoji: "🎨", description: "Visual art, design, or creative project" },
  { id: "video", label: "Video / Film", emoji: "🎬", description: "YouTube, film, documentary, or video content" },
  { id: "other", label: "Something Else", emoji: "✨", description: "A different kind of creative project" },
];

// ============================================
// STUCK STAGE OPTIONS
// ============================================

export const STUCK_STAGE_OPTIONS = [
  { 
    id: "start" as StuckStage, 
    label: "Starting", 
    emoji: "🚦",
    description: "I struggle to begin. The blank page haunts me.",
    detail: "Great ideas, but getting the first momentum is the hardest part."
  },
  { 
    id: "middle" as StuckStage, 
    label: "The Messy Middle", 
    emoji: "🌫️",
    description: "I start strong but lose steam around 30-60%.",
    detail: "The initial excitement fades, and the finish line feels too far."
  },
  { 
    id: "finish" as StuckStage, 
    label: "The Last 10%", 
    emoji: "🏁",
    description: "I get to 80-90% but can't seem to ship.",
    detail: "Almost there, but something keeps me from crossing the finish line."
  },
  { 
    id: "restart" as StuckStage, 
    label: "Constant Restarting", 
    emoji: "🔄",
    description: "I keep pivoting or starting over from scratch.",
    detail: "New ideas feel better than continuing the current one."
  },
];

// ============================================
// COMPLETION PROFILE
// ============================================

export interface CompletionProfile {
  id: string;
  archetypeKey: ArchetypeKey;
  archetype: Archetype;
  quizAnswers: QuizAnswers;
  scores: {
    taskInitiation: number;
    sustainedFocus: number;
    completionAbility: number;
    emotionalRegulation: number;
    externalSupport: number;
  };
  recommendedPlan: PlanType;
  planReasoning: string;
  createdAt: Date;
}

// ============================================
// ARCHETYPE MAPPING LOGIC
// ============================================

/**
 * Maps quiz answers to a completion profile with archetype
 * Rule-based logic for determining the best-fit archetype
 */
export function mapQuizToProfile(answers: QuizAnswers): CompletionProfile {
  const { adhdPatterns, stuckStage, emotions, identityStatements, environment, supportPreference } = answers;
  
  // Calculate component scores
  const taskInitiationScore = adhdPatterns.taskInitiation;
  const sustainedFocusScore = (adhdPatterns.boredomThreshold + adhdPatterns.contextSwitching) / 2;
  const completionScore = identityStatements.trailOfUnfinished;
  const emotionalScore = identityStatements.fearJudgment;
  const perfectionism = adhdPatterns.perfectionism;
  
  // Determine archetype based on weighted factors
  let archetypeKey: ArchetypeKey;
  let confidence = 0;
  
  // Strong signals for each archetype
  const signals = {
    spark_launcher: 0,
    deep_diver: 0,
    last_mile_drifter: 0,
    multi_tab_juggler: 0,
    perfectionist_paralysis: 0,
    momentum_rider: 0,
  };
  
  // Stuck stage is a strong signal
  if (stuckStage === "start") {
    signals.spark_launcher += 3;
    signals.perfectionist_paralysis += 2;
  } else if (stuckStage === "middle") {
    signals.deep_diver += 3;
    signals.momentum_rider += 3;
  } else if (stuckStage === "finish") {
    signals.last_mile_drifter += 4;
    signals.perfectionist_paralysis += 2;
  } else if (stuckStage === "restart") {
    signals.multi_tab_juggler += 4;
    signals.spark_launcher += 2;
  }
  
  // Task initiation struggles
  if (taskInitiationScore >= 4) {
    signals.spark_launcher += 2;
    signals.perfectionist_paralysis += 2;
  }
  
  // Boredom threshold
  if (adhdPatterns.boredomThreshold >= 4) {
    signals.spark_launcher += 2;
    signals.multi_tab_juggler += 2;
  }
  
  // Context switching difficulty
  if (adhdPatterns.contextSwitching >= 4) {
    signals.deep_diver += 3;
  }
  
  // Perfectionism
  if (perfectionism >= 4) {
    signals.perfectionist_paralysis += 3;
    signals.last_mile_drifter += 2;
  }
  
  // Time blindness combined with context switching = deep diver
  if (adhdPatterns.timeBlindness >= 4 && adhdPatterns.contextSwitching >= 3) {
    signals.deep_diver += 2;
  }
  
  // Identity statement: trail of unfinished
  if (identityStatements.trailOfUnfinished >= 4) {
    signals.multi_tab_juggler += 2;
    signals.spark_launcher += 1;
  }
  
  // Identity statement: start strong fade out
  if (identityStatements.startStrongFadeOut >= 4) {
    signals.momentum_rider += 3;
    signals.spark_launcher += 1;
  }
  
  // Emotions can influence archetype
  if (emotions.includes("fear") || emotions.includes("anxiety")) {
    signals.perfectionist_paralysis += 1;
    signals.last_mile_drifter += 1;
  }
  
  if (emotions.includes("excitement") && emotions.includes("frustration")) {
    signals.spark_launcher += 1;
  }
  
  if (emotions.includes("overwhelm")) {
    signals.multi_tab_juggler += 1;
  }
  
  // Find the highest scoring archetype
  archetypeKey = Object.entries(signals).reduce((a, b) => 
    signals[a[0] as ArchetypeKey] > signals[b[0] as ArchetypeKey] ? a : b
  )[0] as ArchetypeKey;
  
  const archetype = ARCHETYPES[archetypeKey];
  
  // Determine recommended plan
  let recommendedPlan: PlanType;
  let planReasoning: string;
  
  const needsHighSupport = 
    answers.timeStuckMonths >= 6 ||
    emotionalScore >= 4 ||
    !environment.hasSupportNetwork ||
    supportPreference.wantsPod;
  
  const needsMediumSupport = 
    answers.timeStuckMonths >= 3 ||
    sustainedFocusScore >= 3.5 ||
    supportPreference.wantsCoach;
  
  if (needsHighSupport || supportPreference.wantsPod) {
    recommendedPlan = "membership_pod";
    planReasoning = generatePlanReasoning("membership_pod", answers, archetype);
  } else if (needsMediumSupport || supportPreference.aiIntensity === "high") {
    recommendedPlan = "membership";
    planReasoning = generatePlanReasoning("membership", answers, archetype);
  } else {
    recommendedPlan = "free";
    planReasoning = generatePlanReasoning("free", answers, archetype);
  }
  
  return {
    id: generateProfileId(),
    archetypeKey,
    archetype,
    quizAnswers: answers,
    scores: {
      taskInitiation: taskInitiationScore,
      sustainedFocus: sustainedFocusScore,
      completionAbility: completionScore,
      emotionalRegulation: emotionalScore,
      externalSupport: environment.hasSupportNetwork ? 3 : 1,
    },
    recommendedPlan,
    planReasoning,
    createdAt: new Date(),
  };
}

function generatePlanReasoning(plan: PlanType, answers: QuizAnswers, archetype: Archetype): string {
  const projectLabel = PROJECT_TYPE_OPTIONS.find(p => p.id === answers.projectType)?.label || "project";
  const stuckLabel = STUCK_STAGE_OPTIONS.find(s => s.id === answers.stuckStage)?.label || "stuck";
  
  if (plan === "membership_pod") {
    return `As a ${archetype.displayName} who's been stuck for ${answers.timeStuckMonths} months, you'll benefit most from human accountability. Your Pod will help you stay consistent with your ${projectLabel}, especially when you hit the "${stuckLabel}" phase.`;
  } else if (plan === "membership") {
    return `Your ${archetype.displayName} patterns respond well to AI coaching. The State Switch Coach will help you navigate the "${stuckLabel}" moments in your ${projectLabel}, with energy mapping to optimize when you work.`;
  } else {
    return `Start with our free tools to explore your ${archetype.displayName} patterns. You can always upgrade when you're ready for more support with your ${projectLabel}.`;
  }
}

function generateProfileId(): string {
  return `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// QUIZ ANALYTICS EVENTS
// ============================================

export type QuizAnalyticsEvent = 
  | { type: "quiz_started"; timestamp: Date }
  | { type: "quiz_step_completed"; step: number; timestamp: Date }
  | { type: "quiz_completed"; duration: number; timestamp: Date }
  | { type: "profile_shown"; archetypeKey: ArchetypeKey; timestamp: Date }
  | { type: "plan_selected"; plan: PlanType; timestamp: Date }
  | { type: "plan_path_chosen"; path: "paid" | "free"; timestamp: Date };

/**
 * Track quiz analytics events
 * This is a placeholder - integrate with your analytics provider
 */
export function trackQuizEvent(event: QuizAnalyticsEvent): void {
  // In production, send to your analytics service
  console.log("[Quiz Analytics]", event);
  
  // Example: window.analytics?.track(event.type, event);
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const QUIZ_STORAGE_KEY = "launchpod_quiz_progress";
const PROFILE_STORAGE_KEY = "launchpod_profile";

export function saveQuizProgress(step: number, answers: Partial<QuizAnswers>): void {
  if (typeof window === "undefined") return;
  
  const data = { step, answers, savedAt: new Date().toISOString() };
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(data));
}

export function loadQuizProgress(): { step: number; answers: Partial<QuizAnswers> } | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(QUIZ_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearQuizProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUIZ_STORAGE_KEY);
}

export function saveProfile(profile: CompletionProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function loadProfile(): CompletionProfile | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// ============================================
// PRICING CONFIG
// ============================================

export interface PricingTier {
  id: PlanType;
  name: string;
  price: number; // monthly in USD
  priceAnnual: number; // annual price per month
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceAnnual: 0,
    description: "Get started with the basics",
    features: [
      "ADHD Profile Quiz",
      "Basic task breakdown",
      "Energy tracking (7 days)",
      "Community access"
    ],
    ctaText: "Continue free →"
  },
  {
    id: "membership",
    name: "Membership",
    price: 19,
    priceAnnual: 15,
    description: "Full ecosystem access",
    features: [
      "Everything in Free",
      "AI State Switch Coach",
      "Unlimited energy mapping",
      "Focus timer + body doubling",
      "Priority support"
    ],
    highlighted: true,
    ctaText: "Start Membership"
  },
  {
    id: "membership_pod",
    name: "Membership + Pod",
    price: 39,
    priceAnnual: 32,
    description: "Maximum accountability",
    features: [
      "Everything in Membership",
      "Matched accountability pod",
      "Weekly facilitated check-ins",
      "Pod challenges & celebrations",
      "Direct coach access"
    ],
    ctaText: "Get matched with a Pod"
  }
];

