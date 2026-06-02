import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { FlowScreen } from "../../components/flow/FlowScreen";
import type { FlowOutput, InteractionTiming } from "../../contracts/flowContracts";
import { asTiming } from "../../lib/motion/motionDefaults";
import { PublicAccessScreen } from "./PublicAccessScreen";
import {
  PUBLIC_ACCESS_FLOW_ID,
  PUBLIC_ACCESS_INTERACTION_PROFILE,
  PUBLIC_ACCESS_ROUTES,
  PUBLIC_ACCESS_SCREENS,
  PUBLIC_ACCESS_SCREEN_BY_ROUTE,
  type PublicAccessScreenMeta
} from "./publicAccessConfig";

function PublicAccessRoute({ screen }: { screen: PublicAccessScreenMeta }) {
  return (
    <FlowScreen meta={screen}>
      <PublicAccessScreen />
    </FlowScreen>
  );
}

export const publicAccessFlowRoutes: RouteObject[] = [
  {
    path: "/flows/public-access",
    element: <Navigate to={PUBLIC_ACCESS_ROUTES.login} replace />
  },
  {
    path: PUBLIC_ACCESS_ROUTES.login,
    element: <PublicAccessRoute screen={PUBLIC_ACCESS_SCREENS[0]} />
  }
];

const motionConfig: InteractionTiming[] = [
  asTiming("entry-stagger", { durationMs: 420, easing: [0.25, 1, 0.5, 1] }),
  asTiming("focus-underline", { durationMs: 200, easing: "ease-out" }),
  asTiming("keyboard-shift", { durationMs: 320, easing: [0.25, 1, 0.5, 1] }),
  asTiming("error-shake", { durationMs: 420, easing: "linear" })
];

export const publicAccessFlowOutput: FlowOutput = {
  flowId: PUBLIC_ACCESS_FLOW_ID,
  routes: PUBLIC_ACCESS_SCREENS.map((screen) => screen.route),
  screens: PUBLIC_ACCESS_SCREENS.map((screen) => ({
    screenId: screen.screenId,
    figmaNodeId: screen.figmaNodeId,
    route: screen.route
  })),
  motionConfig,
  interactionProfile: PUBLIC_ACCESS_INTERACTION_PROFILE,
  fidelityChecklist: [
    "Frame lock maintained at 400x874 for idle and focused states.",
    "Password field variants mapped to hidden, visible, and error interactions.",
    "CTA, forgot-link, and keyboard transitions follow public-access interaction timings.",
    "Reduced-motion behavior falls back to non-kinetic transitions."
  ],
  angularHandoffNotes: [
    "Translate keyboard shift and field state machine into Angular animation triggers.",
    "Preserve password visibility toggle with cross-fade icon transition.",
    "Keep error feedback sequence (shake + underline + supporting text) synchronized."
  ]
};

export function getPublicAccessScreenByRoute(route: string) {
  return PUBLIC_ACCESS_SCREEN_BY_ROUTE[route];
}
