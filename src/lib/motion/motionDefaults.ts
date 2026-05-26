import type { Transition, Variants } from "framer-motion";
import type { InteractionTiming } from "../../contracts/flowContracts";

export const DEFAULT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.32,
  ease: DEFAULT_EASE
};

export const defaultRouteTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.995
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: defaultTransition
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.22,
      ease: DEFAULT_EASE
    }
  }
};

export function asTiming(
  id: string,
  override?: Partial<InteractionTiming>
): InteractionTiming {
  return {
    id,
    durationMs: override?.durationMs ?? 320,
    delayMs: override?.delayMs,
    easing: override?.easing ?? DEFAULT_EASE
  };
}
