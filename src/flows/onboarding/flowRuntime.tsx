import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { FlowScreen } from "../../components/flow/FlowScreen";
import type { FlowOutput, InteractionTiming } from "../../contracts/flowContracts";
import { asTiming, DEFAULT_EASE } from "../../lib/motion/motionDefaults";
import { OnboardingScreen } from "./OnboardingScreen";
import {
  ONBOARDING_FLOW_ID,
  ONBOARDING_INTERACTION_PROFILE,
  ONBOARDING_ROUTES,
  ONBOARDING_SCREENS,
  ONBOARDING_SCREEN_BY_ROUTE,
  type OnboardingScreenMeta
} from "./onboardingConfig";
import { OnboardingStateProvider } from "./onboardingState";

function OnboardingFlowLayout() {
  return (
    <OnboardingStateProvider>
      <Outlet />
    </OnboardingStateProvider>
  );
}

function OnboardingRoute({ screen }: { screen: OnboardingScreenMeta }) {
  return (
    <FlowScreen meta={screen}>
      <OnboardingScreen screen={screen} />
    </FlowScreen>
  );
}

const onboardingChildRoutes: RouteObject[] = ONBOARDING_SCREENS.map((screen) => ({
  path: screen.route.replace("/flows/onboarding/", ""),
  element: <OnboardingRoute screen={screen} />
}));

export const onboardingFlowRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={ONBOARDING_ROUTES.splash} replace />
  },
  {
    path: "/flows/onboarding",
    element: <OnboardingFlowLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ONBOARDING_ROUTES.splash} replace />
      },
      ...onboardingChildRoutes
    ]
  }
];

const motionConfig: InteractionTiming[] = [
  asTiming("screen-swipe-background", { durationMs: 320, easing: DEFAULT_EASE }),
  asTiming("screen-swipe-content", { durationMs: 220, delayMs: 50, easing: DEFAULT_EASE }),
  asTiming("tap-feedback", { durationMs: 120, easing: DEFAULT_EASE }),
  asTiming("checkbox-transition", { durationMs: 140, easing: DEFAULT_EASE })
];

export const onboardingFlowOutput: FlowOutput = {
  flowId: ONBOARDING_FLOW_ID,
  routes: ONBOARDING_SCREENS.map((screen) => screen.route),
  screens: ONBOARDING_SCREENS.map((screen) => ({
    screenId: screen.screenId,
    figmaNodeId: screen.figmaNodeId,
    route: screen.route
  })),
  motionConfig,
  interactionProfile: ONBOARDING_INTERACTION_PROFILE,
  fidelityChecklist: [
    "Validated frame lock at 400x874 for all onboarding states.",
    "Verified progress visibility and step fills against Figma nodes.",
    "Matched button hierarchy, checkbox state, and image/background mode per node.",
    "Confirmed key text blocks, line separators, and bottom action layouts per screen."
  ],
  angularHandoffNotes: [
    "Map screenKey and figmaNodeId to Angular route data for traceability.",
    "Preserve swipe transition split (background first, content second) in Angular animation triggers.",
    "Implement invite/form/checklist state logic locally; no API dependency in this prototype pass."
  ]
};

export function getOnboardingScreenByRoute(route: string) {
  return ONBOARDING_SCREEN_BY_ROUTE[route];
}
