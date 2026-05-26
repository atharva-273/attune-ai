import type { ReactNode } from "react";
import type { BackgroundMode } from "./flowContracts";

export interface RuntimeProgressState {
  step: number;
  total: number;
}

export interface RuntimeScreenMeta {
  flowId: string;
  screenId: string;
  route: string;
  figmaNodeId: string;
  frameName: string;
  screenKey?: string;
  isVariantState?: boolean;
  backgroundMode?: BackgroundMode;
  progressVisible?: boolean;
  progressState?: RuntimeProgressState;
  modalTriggers?: string[];
}

export interface RuntimeScreen {
  meta: RuntimeScreenMeta;
  element: ReactNode;
}
