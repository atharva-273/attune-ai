import { motion } from "framer-motion";
import { DEFAULT_EASE } from "../../../lib/motion/motionDefaults";
import styles from "./PreferencesScreen.module.css";

interface PreferencesScreenProps {
  onBack: () => void;
}

const options = [
  "Sleep better",
  "Reduce stress",
  "Improve focus",
  "Build healthy rituals"
];

export function PreferencesScreen({ onBack }: PreferencesScreenProps) {
  return (
    <div className={styles.screen}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.24 } }}
      >
        <button type="button" onClick={onBack} className={styles.backButton}>
          Back
        </button>
        <span className={styles.stepLabel}>Step 2 of 2</span>
      </motion.div>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.28 } }}
      >
        Pick your top goals.
      </motion.h2>

      <div className={styles.optionGrid}>
        {options.map((item, index) => (
          <motion.button
            key={item}
            type="button"
            className={styles.option}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.24,
                delay: 0.1 + index * 0.06,
                ease: DEFAULT_EASE
              }
            }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        className={styles.finish}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.34, duration: 0.26 } }}
      >
        Finish Setup
      </motion.button>
    </div>
  );
}
