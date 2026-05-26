export type FlowNodeId = string;

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
  fidelityChecklist: string[];
  angularHandoffNotes: string[];
}
