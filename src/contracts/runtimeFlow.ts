import type { ReactNode } from "react";

export interface RuntimeScreenMeta {
  flowId: string;
  screenId: string;
  route: string;
  figmaNodeId: string;
  frameName: string;
}

export interface RuntimeScreen {
  meta: RuntimeScreenMeta;
  element: ReactNode;
}
