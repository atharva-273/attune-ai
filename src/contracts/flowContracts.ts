export type FlowNodeId = string;
export type BackgroundMode = "image" | "neutral";
export type SwipeTransitionMode = "background-first" | "full-screen";
export type TapFeedbackPreset = "minimal" | "none";

export interface AssetReference {
  key: string;
  path: string;
  kind: "svg" | "png" | "jpg" | "webp";
}

export interface InteractionTiming {
  id: string;
  durationMs: number;
  delayMs?: number;
  easing?: [number, number, number, number] | string;
}

export interface FlowInteractionProfile {
  tapFeedbackPreset: TapFeedbackPreset;
  checkboxTransition: "fade" | "scale-fade";
  swipeTransitionMode: SwipeTransitionMode;
}

export type InteractionSpec =
  | {
      mode: "intent";
      description: string;
      notes?: string;
    }
  | {
      mode: "exact";
      timings: InteractionTiming[];
      description?: string;
    }
  | {
      mode: "hybrid";
      description: string;
      timings: InteractionTiming[];
    };

export interface FlowRequest {
  flowId: string;
  figmaUrl: string;
  nodeIds: FlowNodeId[];
  assetBundle: AssetReference[];
  interactionSpec: InteractionSpec;
}

export interface FlowOutput {
  flowId: string;
  routes: string[];
  screens: Array<{
    screenId: string;
    figmaNodeId: string;
    route: string;
  }>;
  motionConfig: InteractionTiming[];
  interactionProfile?: FlowInteractionProfile;
  fidelityChecklist: string[];
  angularHandoffNotes: string[];
}
