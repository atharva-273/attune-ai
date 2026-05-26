import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { demoFlowRoutes } from "../flows/demo/flowRuntime";
import { defaultRouteTransition } from "../lib/motion/motionDefaults";
import styles from "./AppRouter.module.css";

const routes: RouteObject[] = [
  ...demoFlowRoutes,
  {
    path: "*",
    element: <div className={styles.notFound}>Unknown route in prototype.</div>
  }
];

export function AppRouter() {
  const location = useLocation();
  const routingElement = useRoutes(routes);

  return (
    <div className={styles.appShell}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className={styles.routeLayer}
          variants={defaultRouteTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {routingElement}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
