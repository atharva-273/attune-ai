import type { FlowInteractionProfile } from "../../contracts/flowContracts";
import type { RuntimeScreenMeta } from "../../contracts/runtimeFlow";

export const ONBOARDING_FLOW_ID = "attune-onboarding";

export const ONBOARDING_ROUTES = {
  selector: "/flows/onboarding/select",
  start: "/flows/onboarding/start",
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
  seven1: "/flows/onboarding/7-1",
  seven2: "/flows/onboarding/7-2",
  eight1: "/flows/onboarding/8-1",
  eight2: "/flows/onboarding/8-2",
  nine: "/flows/onboarding/9",
  ten: "/flows/onboarding/10",
  eleven: "/flows/onboarding/11",
  twelve: "/flows/onboarding/12",
  thirteen1: "/flows/onboarding/13-1",
  thirteen2: "/flows/onboarding/13-2",
  thirteen3: "/flows/onboarding/13-3"
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
    screenId: "onboarding-selector",
    screenKey: "selector",
    screenIndex: 0,
    route: ONBOARDING_ROUTES.selector,
    figmaNodeId: "2718:5168",
    frameName: "Choose your test flow",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-start",
    screenKey: "start",
    screenIndex: 1,
    route: ONBOARDING_ROUTES.start,
    figmaNodeId: "2718:5093",
    frameName: "Onboarding-Start",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-splash",
    screenKey: "splash",
    screenIndex: 2,
    route: ONBOARDING_ROUTES.splash,
    figmaNodeId: "2718:5112",
    frameName: "Onboarding splash screen",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: true,
    progressState: { step: 1, total: 5 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-1",
    screenKey: "one",
    screenIndex: 3,
    route: ONBOARDING_ROUTES.one,
    figmaNodeId: "2718:5141",
    frameName: "Onboarding-1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 2, total: 5 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-2",
    screenKey: "two",
    screenIndex: 4,
    route: ONBOARDING_ROUTES.two,
    figmaNodeId: "2718:5189",
    frameName: "Onboarding-2",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 3, total: 5 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-3",
    screenKey: "three",
    screenIndex: 5,
    route: ONBOARDING_ROUTES.three,
    figmaNodeId: "2718:5220",
    frameName: "Onboarding-3",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 4, total: 5 },
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-1",
    screenKey: "four1",
    screenIndex: 6,
    route: ONBOARDING_ROUTES.four1,
    figmaNodeId: "2718:5247",
    frameName: "Onboarding-4.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 5, total: 5 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-2",
    screenKey: "four2",
    screenIndex: 7,
    route: ONBOARDING_ROUTES.four2,
    figmaNodeId: "2718:5272",
    frameName: "Onboarding-4.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 5, total: 5 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-4-3",
    screenKey: "four3",
    screenIndex: 8,
    route: ONBOARDING_ROUTES.four3,
    figmaNodeId: "2718:5297",
    frameName: "Onboarding-4.3",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: true,
    progressState: { step: 5, total: 5 },
    modalTriggers: ["learn"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-5-1",
    screenKey: "five1",
    screenIndex: 9,
    route: ONBOARDING_ROUTES.five1,
    figmaNodeId: "2718:5323",
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
    screenIndex: 10,
    route: ONBOARDING_ROUTES.five2,
    figmaNodeId: "2718:5337",
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
    screenIndex: 11,
    route: ONBOARDING_ROUTES.six1,
    figmaNodeId: "2718:5351",
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
    screenIndex: 12,
    route: ONBOARDING_ROUTES.six2,
    figmaNodeId: "2718:5383",
    frameName: "Onboarding-6.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-7-1",
    screenKey: "seven1",
    screenIndex: 13,
    route: ONBOARDING_ROUTES.seven1,
    figmaNodeId: "2718:5492",
    frameName: "Onboarding-7.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-7-2",
    screenKey: "seven2",
    screenIndex: 14,
    route: ONBOARDING_ROUTES.seven2,
    figmaNodeId: "2718:5475",
    frameName: "Onboarding-7.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-8-1",
    screenKey: "eight1",
    screenIndex: 15,
    route: ONBOARDING_ROUTES.eight1,
    figmaNodeId: "2718:5415",
    frameName: "Onboarding-8.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: ["terms", "privacy"]
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-8-2",
    screenKey: "eight2",
    screenIndex: 16,
    route: ONBOARDING_ROUTES.eight2,
    figmaNodeId: "2718:5445",
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
    screenIndex: 17,
    route: ONBOARDING_ROUTES.nine,
    figmaNodeId: "2718:5514",
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
    screenIndex: 18,
    route: ONBOARDING_ROUTES.ten,
    figmaNodeId: "2767:6919",
    frameName: "Onboarding-10",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-11",
    screenKey: "eleven",
    screenIndex: 19,
    route: ONBOARDING_ROUTES.eleven,
    figmaNodeId: "2767:6965",
    frameName: "Onboarding-11",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-12",
    screenKey: "twelve",
    screenIndex: 20,
    route: ONBOARDING_ROUTES.twelve,
    figmaNodeId: "2718:5129",
    frameName: "Onboarding-12",
    isVariantState: false,
    backgroundMode: "image",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-13-1",
    screenKey: "thirteen1",
    screenIndex: 21,
    route: ONBOARDING_ROUTES.thirteen1,
    figmaNodeId: "2718:5545",
    frameName: "Onboarding-13.1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-13-2",
    screenKey: "thirteen2",
    screenIndex: 22,
    route: ONBOARDING_ROUTES.thirteen2,
    figmaNodeId: "2718:5581",
    frameName: "Onboarding-13.2",
    isVariantState: true,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  },
  {
    flowId: ONBOARDING_FLOW_ID,
    screenId: "onboarding-13-3",
    screenKey: "thirteen3",
    screenIndex: 23,
    route: ONBOARDING_ROUTES.thirteen3,
    figmaNodeId: "2718:5563",
    frameName: "Onboarding-13.3",
    isVariantState: true,
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
