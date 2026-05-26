import type { PropsWithChildren } from "react";
import styles from "./MobilePrototypeShell.module.css";

interface MobilePrototypeShellProps {
  flowId: string;
  screenId: string;
  figmaNodeId: string;
  frameName: string;
}

export function MobilePrototypeShell({
  flowId,
  screenId,
  figmaNodeId,
  frameName,
  children
}: PropsWithChildren<MobilePrototypeShellProps>) {
  return (
    <section
      className={styles.deviceFrame}
      data-flow-id={flowId}
      data-screen-id={screenId}
      data-figma-node-id={figmaNodeId}
      data-frame-name={frameName}
    >
      <header className={styles.deviceStatusBar}>
        <span>9:41</span>
        <span>{frameName}</span>
        <span>100%</span>
      </header>
      <div className={styles.screenArea}>{children}</div>
    </section>
  );
}
