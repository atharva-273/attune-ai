import type { FlowInteractionProfile } from "../../contracts/flowContracts";
import type { RuntimeScreenMeta } from "../../contracts/runtimeFlow";

export const PUBLIC_ACCESS_FLOW_ID = "attune-public-access";

export const PUBLIC_ACCESS_ROUTES = {
  login: "/flows/public-access/login"
} as const;

export type PublicAccessScreenKey = keyof typeof PUBLIC_ACCESS_ROUTES;

export interface PublicAccessScreenMeta extends RuntimeScreenMeta {
  screenKey: PublicAccessScreenKey;
  screenIndex: number;
  isVariantState: boolean;
  backgroundMode: "neutral";
  progressVisible: false;
  modalTriggers: [];
}

export const PUBLIC_ACCESS_INTERACTION_PROFILE: FlowInteractionProfile = {
  tapFeedbackPreset: "minimal",
  checkboxTransition: "fade",
  swipeTransitionMode: "full-screen"
};

export const PUBLIC_ACCESS_SCREENS: PublicAccessScreenMeta[] = [
  {
    flowId: PUBLIC_ACCESS_FLOW_ID,
    screenId: "public-access-login",
    screenKey: "login",
    screenIndex: 0,
    route: PUBLIC_ACCESS_ROUTES.login,
    figmaNodeId: "2282:17382",
    frameName: "Public-access-1",
    isVariantState: false,
    backgroundMode: "neutral",
    progressVisible: false,
    modalTriggers: []
  }
];

export const PUBLIC_ACCESS_SCREEN_BY_ROUTE = PUBLIC_ACCESS_SCREENS.reduce<
  Record<string, PublicAccessScreenMeta>
>((accumulator, screen) => {
  accumulator[screen.route] = screen;
  return accumulator;
}, {});
