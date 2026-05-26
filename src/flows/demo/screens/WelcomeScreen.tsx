import { motion } from "framer-motion";
import { DEFAULT_EASE } from "../../../lib/motion/motionDefaults";
import styles from "./WelcomeScreen.module.css";

interface WelcomeScreenProps {
  onContinue: () => void;
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: (delayMs: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      delay: delayMs / 1000,
      ease: DEFAULT_EASE
    }
  })
};

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className={styles.screen}>
      <motion.div className={styles.brandBadge} variants={item} initial="hidden" animate="show" custom={0}>
        Attune AI
      </motion.div>

      <motion.h1 className={styles.heading} variants={item} initial="hidden" animate="show" custom={60}>
        Track mood patterns and build calmer routines.
      </motion.h1>

      <motion.p className={styles.copy} variants={item} initial="hidden" animate="show" custom={120}>
        This starter flow is wired for frame-locked translation. Replace copy, colors, and layout values with the exact Figma target nodes.
      </motion.p>

      <motion.ul className={styles.pillList} variants={item} initial="hidden" animate="show" custom={180}>
        <li>Daily check-ins</li>
        <li>Micro routines</li>
        <li>Coach insights</li>
      </motion.ul>

      <motion.button
        type="button"
        className={styles.cta}
        variants={item}
        initial="hidden"
        animate="show"
        custom={220}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
      >
        Continue
      </motion.button>
    </div>
  );
}
