import type { FlowRequest } from "../../contracts/flowContracts";

export const DEMO_FLOW_REQUEST: FlowRequest = {
  flowId: "attune-onboarding-demo",
  figmaUrl:
    "https://www.figma.com/design/REPLACE_FILE_KEY/Attune-AI?node-id=100-200",
  nodeIds: ["100:200", "100:240"],
  assetBundle: [
    {
      key: "hero-illustration",
      path: "/assets/hero-illustration.png",
      kind: "png"
    },
    {
      key: "insight-icon",
      path: "/assets/insight-icon.svg",
      kind: "svg"
    }
  ],
  interactionSpec: {
    mode: "hybrid",
    description:
      "Primary CTA advances flow with slide transition; cards stagger in with subtle vertical rise.",
    timings: [
      {
        id: "screen-enter",
        durationMs: 320,
        easing: [0.22, 1, 0.36, 1]
      },
      {
        id: "card-stagger",
        durationMs: 240,
        delayMs: 80,
        easing: [0.22, 1, 0.36, 1]
      }
    ]
  }
};
