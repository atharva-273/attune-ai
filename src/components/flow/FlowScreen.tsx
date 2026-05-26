import type { PropsWithChildren } from "react";
import { MobilePrototypeShell } from "../mobile/MobilePrototypeShell";
import type { RuntimeScreenMeta } from "../../contracts/runtimeFlow";
import styles from "./FlowScreen.module.css";

interface FlowScreenProps {
  meta: RuntimeScreenMeta;
}

export function FlowScreen({
  meta,
  children
}: PropsWithChildren<FlowScreenProps>) {
  return (
    <MobilePrototypeShell
      flowId={meta.flowId}
      screenId={meta.screenId}
      figmaNodeId={meta.figmaNodeId}
      frameName={meta.frameName}
    >
      <article className={styles.root}>{children}</article>
    </MobilePrototypeShell>
  );
}
