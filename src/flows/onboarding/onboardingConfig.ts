import type { FlowInteractionProfile } from "../../contracts/flowContracts";
import type { RuntimeScreenMeta } from "../../contracts/runtimeFlow";

export const ONBOARDING_FLOW_ID = "attune-onboarding";

export const ONBOARDING_ROUTES = {
  splash: "/flows/onboarding/splash",
  one: "/flows/onboarding/1",
  two: "/flows/onboarding/2",
  three: "/flows/onboarding/3",
  four1: "/flows/onboarding/4-1",
  four2: "/flows/onboarding/4-2",
  four3: "/flows/onboarding/4-3",
  five1: "/flows/onboarding/5-1",
  five2: "/flows/onboarding/5-2",
  six1: "/flows/onboarding/6-1",
  six2: "/flows/onboarding/6-2",
  eight2: "/flows/onboarding/8-2",
  nine: "/flows/onboarding/9",
  ten: "/flows/onboarding/10"
} as const;

export type OnboardingScreenKey = keyof typeof ONBOARDING_ROUTES;

export interface OnboardingScreenMeta extends RuntimeScreenMeta {
  screenKey: OnboardingScreenKey;
  screenIndex: number;
  isVariantState: boolean;
  backgroundMode: "image" | "neutral";
  progressVisible: boolean;
  progressState?: {
    step: number;
    total: number;
  };
  modalTriggers: string[];
}

export const ONBOARDING_INTERACTION_PROFILE: FlowInteractionProfile = {
  tapFeedbackPreset: "minimal",
  checkboxTransition: "scale-fade",
  swipeTransitionMode: "background-first"
};

export const ONBOARDING_SCREENS: OnboardingScreenMeta[] = [
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-splash",
    screenKey: "splash",
    screenIndex: 0,
    route: ONBOARDING_ROUTES.splash,
    figmaNodeId: "2480:17687",
    frameName: "Onboarding splash screen",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-1",
    screenKey: "one",
    screenIndex: 1,
    route: ONBOARDING_ROUTES.one,
    figmaNodeId: "2480:17653",
    frameName: "Onboarding-1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 1, total: 4 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-2",
    screenKey: "two",
    screenIndex: 2,
    route: ONBOARDING_ROUTES.two,
    figmaNodeId: "2480:17821",
    frameName: "Onboarding-2",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 2, total: 4 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-3",
    screenKey: "three",
    screenIndex: 3,
    route: ONBOARDING_ROUTES.three,
    figmaNodeId: "2480:17859",
    frameName: "Onboarding-3",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 3, total: 4 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-1",
    screenKey: "four1",
    screenIndex: 4,
    route: ONBOARDING_ROUTES.four1,
    figmaNodeId: "2480:17893",
    frameName: "Onboarding-4.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 4, total: 4 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-2",
    screenKey: "four2",
    screenIndex: 5,
    route: ONBOARDING_ROUTES.four2,
    figmaNodeId: "2480:17925",
    frameName: "Onboarding-4.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 4, total: 4 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-3",
    screenKey: "four3",
    screenIndex: 6,
    route: ONBOARDING_ROUTES.four3,
    figmaNodeId: "2480:17957",
    frameName: "Onboarding-4.3",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 4, total: 4 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-5-1",
    screenKey: "five1",
    screenIndex: 7,
    route: ONBOARDING_ROUTES.five1,
    figmaNodeId: "2480:17713",
    frameName: "Onboarding-5.1",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-5-2",
    screenKey: "five2",
    screenIndex: 8,
    route: ONBOARDING_ROUTES.five2,
    figmaNodeId: "2480:17780",
    frameName: "Onboarding-5.2",
    isVariantState: true,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-6-1",
    screenKey: "six1",
    screenIndex: 9,
    route: ONBOARDING_ROUTES.six1,
    figmaNodeId: "2480:18200",
    frameName: "Onboarding-6.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-6-2",
    screenKey: "six2",
    screenIndex: 10,
    route: ONBOARDING_ROUTES.six2,
    figmaNodeId: "2480:18255",
    frameName: "Onboarding-6.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-8-2",
    screenKey: "eight2",
    screenIndex: 11,
    route: ONBOARDING_ROUTES.eight2,
    figmaNodeId: "2480:18123",
    frameName: "Onboarding-8.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: ["terms", "privacy"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-9",
    screenKey: "nine",
    screenIndex: 12,
    route: ONBOARDING_ROUTES.nine,
    figmaNodeId: "2480:17754",
    frameName: "Onboarding-9",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-10",
    screenKey: "ten",
    screenIndex: 13,
    route: ONBOARDING_ROUTES.ten,
    figmaNodeId: "2480:18168",
    frameName: "Onboarding-10",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  }
];

export const ONBOARDING_SCREEN_BY_KEY: Record<OnboardingScreenKey, OnboardingScreenMeta> =
  ONBOARDING_SCREENS.reduce<Record<OnboardingScreenKey, OnboardingScreenMeta>>(
    (accumulator, screen) => {
      accumulator[screen.screenKey] = screen;
      return accumulator;
    },
    {} as Record<OnboardingScreenKey, OnboardingScreenMeta>
  );

export const ONBOARDING_SCREEN_BY_ROUTE = ONBOARDING_SCREENS.reduce<
  Record<string, OnboardingScreenMeta>
>((accumulator, screen) => {
  accumulator[screen.route] = screen;
  return accumulator;
}, {});

export const ONBOARDING_ROUTE_ORDER = ONBOARDING_SCREENS.map((screen) => screen.route);
