import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { onboardingFlowRoutes } from "../flows/onboarding/flowRuntime";
import styles from "./AppRouter.module.css";

const routes: RouteObject[] = [
  ...onboardingFlowRoutes,
  {
    path: "*",
    element: <div className={styles.notFound}>Unknown route in prototype.</div>
  }
];

export function AppRouter() {
  const routingElement = useRoutes(routes);

  return <div className={styles.appShell}>{routingElement}</div>;
}
