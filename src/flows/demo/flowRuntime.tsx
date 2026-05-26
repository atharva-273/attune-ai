import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { FlowScreen } from "../../components/flow/FlowScreen";
import type { FlowOutput, InteractionTiming } from "../../contracts/flowContracts";
import type { RuntimeScreenMeta } from "../../contracts/runtimeFlow";
import { asTiming, DEFAULT_EASE } from "../../lib/motion/motionDefaults";
import { PreferencesScreen } from "./screens/PreferencesScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

const flowId = "attune-onboarding-demo";

const routeMotion = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: DEFAULT_EASE }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: DEFAULT_EASE }
  }
};

const welcomeMeta: RuntimeScreenMeta = {
  flowId,
  screenId: "welcome",
  route: "/flows/demo/welcome",
  figmaNodeId: "100:200",
  frameName: "Welcome"
};

const preferencesMeta: RuntimeScreenMeta = {
  flowId,
  screenId: "preferences",
  route: "/flows/demo/preferences",
  figmaNodeId: "100:240",
  frameName: "Preferences"
};

function WelcomeRoute() {
  const navigate = useNavigate();

  return (
    <FlowScreen meta={welcomeMeta}>
      <motion.div variants={routeMotion} initial="initial" animate="animate" exit="exit">
        <WelcomeScreen onContinue={() => navigate(preferencesMeta.route)} />
      </motion.div>
    </FlowScreen>
  );
}

function PreferencesRoute() {
  const navigate = useNavigate();

  return (
    <FlowScreen meta={preferencesMeta}>
      <motion.div variants={routeMotion} initial="initial" animate="animate" exit="exit">
        <PreferencesScreen onBack={() => navigate(welcomeMeta.route)} />
      </motion.div>
    </FlowScreen>
  );
}

export const demoFlowRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={welcomeMeta.route} replace />
  },
  {
    path: welcomeMeta.route,
    element: <WelcomeRoute />
  },
  {
    path: preferencesMeta.route,
    element: <PreferencesRoute />
  }
];

const motionConfig: InteractionTiming[] = [
  asTiming("screen-enter", { durationMs: 320, easing: DEFAULT_EASE }),
  asTiming("card-stagger", { durationMs: 240, delayMs: 80, easing: DEFAULT_EASE })
];

export const demoFlowOutput: FlowOutput = {
  flowId,
  routes: [welcomeMeta.route, preferencesMeta.route],
  screens: [
    {
      screenId: welcomeMeta.screenId,
      figmaNodeId: welcomeMeta.figmaNodeId,
      route: welcomeMeta.route
    },
    {
      screenId: preferencesMeta.screenId,
      figmaNodeId: preferencesMeta.figmaNodeId,
      route: preferencesMeta.route
    }
  ],
  motionConfig,
  fidelityChecklist: [
    "Frame dimensions match target mobile node",
    "Typography styles mapped to token names",
    "Spacing and radii verified against Figma inspect panel",
    "Icon and image positions verified at 100% scale"
  ],
  angularHandoffNotes: [
    "Map route-level transitions to Angular animation triggers.",
    "Move motionConfig values into Angular constants for parity.",
    "Keep node-id traceability via screen-level data attributes."
  ]
};
