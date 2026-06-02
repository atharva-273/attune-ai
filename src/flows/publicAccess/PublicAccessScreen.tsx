import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent
} from "react";
import { publicAccessAssets } from "./publicAccessAssets";
import styles from "./PublicAccessScreen.module.css";

const ENTRY_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const DEFAULT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const KEYBOARD_SHIFT_PX = -119;
const ERROR_SHIFT_EXTRA_PX = -12;
const VALID_PASSWORD = "attunebeta";

function triggerHaptic(pattern: number | number[]) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  navigator.vibrate(pattern);
}

function StatusBar() {
  return (
    <header className={styles.statusBar}>
      <div className={styles.statusTimeWrap}>
        <span className={styles.statusTime}>9:41</span>
      </div>
      <div className={styles.dynamicIsland} aria-hidden="true" />
      <div className={styles.statusRight}>
        <div className={styles.signalGroup}>
          <div className={styles.signalBars} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <img src={publicAccessAssets.wifiIcon} alt="" className={styles.wifi} aria-hidden="true" />
          <img
            src={publicAccessAssets.batteryIcon}
            alt=""
            className={styles.battery}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}

function HomeIndicator() {
  return (
    <footer className={styles.homeIndicatorWrap}>
      <div className={styles.homeIndicator} aria-hidden="true" />
    </footer>
  );
}

function KeyboardMock() {
  return (
    <motion.div
      className={styles.keyboard}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: DEFAULT_EASE } }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.16, ease: DEFAULT_EASE } }}
    >
      <div className={styles.keyboardOverlayLum} aria-hidden="true" />
      <div className={styles.keyboardOverlayBase} aria-hidden="true" />
      <div className={styles.keyboardOverlayDodge} aria-hidden="true" />
      <div className={styles.keyboardGrid}>
        <div className={styles.keyRow}>
          <button type="button" className={styles.key}>1</button>
          <button type="button" className={styles.key}>2</button>
          <button type="button" className={styles.key}>3</button>
        </div>
        <div className={styles.keyRow}>
          <button type="button" className={styles.key}>4</button>
          <button type="button" className={styles.key}>5</button>
          <button type="button" className={styles.key}>6</button>
        </div>
        <div className={styles.keyRow}>
          <button type="button" className={styles.key}>7</button>
          <button type="button" className={styles.key}>8</button>
          <button type="button" className={styles.key}>9</button>
        </div>
        <div className={styles.keyRow}>
          <button type="button" className={`${styles.key} ${styles.keyMuted}`}>+ * #</button>
          <button type="button" className={styles.key}>0</button>
          <button type="button" className={`${styles.key} ${styles.keyIcon}`} aria-label="Delete">
            del
          </button>
        </div>
      </div>
      <div className={styles.keyboardHomeIndicator} aria-hidden="true" />
    </motion.div>
  );
}

function getEntryTransition(
  reduceMotion: boolean,
  delayMs: number,
  durationMs: number,
  translateY: number
) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0, y: 0 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.12, delay: delayMs / 1000, ease: DEFAULT_EASE }
      }
    };
  }

  return {
    initial: { opacity: 0, y: translateY },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: durationMs / 1000, delay: delayMs / 1000, ease: ENTRY_EASE }
    }
  };
}

export function PublicAccessScreen() {
  const reduceMotion = useReducedMotion() ?? false;
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isForgotPulse, setIsForgotPulse] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [underlineKey, setUnderlineKey] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const loadingTimerRef = useRef<number | null>(null);
  const forgotTimerRef = useRef<number | null>(null);

  const hasPassword = password.length > 0;
  const isMaskedView = hasPassword && !isPasswordVisible;
  const canSubmit = hasPassword && !isLoading;
  const shouldFloatLabel = isFocused || hasPassword;
  const showActiveUnderline = isFocused || hasPassword || isError;

  const contentShift = isFocused
    ? KEYBOARD_SHIFT_PX + (isError ? ERROR_SHIFT_EXTRA_PX : 0)
    : 0;

  const inputAreaClassName = `${styles.inputArea} ${isError ? styles.inputAreaError : ""}`;

  const entryLogo = getEntryTransition(reduceMotion, 0, 420, 12);
  const entryTitle = getEntryTransition(reduceMotion, 80, 380, 10);
  const entrySubtitle = getEntryTransition(reduceMotion, 140, 360, 8);
  const entryField = getEntryTransition(reduceMotion, 200, 340, 8);
  const entryCta = getEntryTransition(reduceMotion, 260, 320, 6);
  const entryForgot = getEntryTransition(reduceMotion, 340, 280, 0);

  const maskedDots = useMemo(
    () =>
      password.split("").map((character, index) => ({
        id: `${index}-${character.charCodeAt(0)}-${password.length}`
      })),
    [password]
  );

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current !== null) {
        window.clearTimeout(loadingTimerRef.current);
      }

      if (forgotTimerRef.current !== null) {
        window.clearTimeout(forgotTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasPassword) {
      return;
    }

    setIsPasswordVisible(false);
  }, [hasPassword]);

  const dismissKeyboard = () => {
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const onRootPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const targetNode = event.target as Node;

    if (contentRef.current?.contains(targetNode)) {
      return;
    }

    dismissKeyboard();
  };

  const clearErrorState = () => {
    if (!isError) {
      return;
    }

    setIsError(false);

    if (!reduceMotion) {
      setUnderlineKey((previousState) => previousState + 1);
    }
  };

  const onInputFocus = () => {
    setIsFocused(true);
    clearErrorState();
    triggerHaptic(12);

    if (!reduceMotion) {
      setUnderlineKey((previousState) => previousState + 1);
    }
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (isError) {
      setIsError(false);
    }
  };

  const onToggleVisibility = () => {
    if (!hasPassword) {
      return;
    }

    setIsPasswordVisible((previousState) => !previousState);
    triggerHaptic(8);
    inputRef.current?.focus();
  };

  const triggerErrorState = () => {
    setIsPasswordVisible(true);
    setIsError(true);
    setIsLoading(false);
    triggerHaptic([0, 50, 80, 50]);

    if (reduceMotion) {
      return;
    }

    setIsShaking(false);
    window.requestAnimationFrame(() => setIsShaking(true));
  };

  const onContinue = () => {
    if (!canSubmit) {
      return;
    }

    triggerHaptic([0, 18]);
    setIsLoading(true);

    if (loadingTimerRef.current !== null) {
      window.clearTimeout(loadingTimerRef.current);
    }

    loadingTimerRef.current = window.setTimeout(() => {
      if (password.toLowerCase() === VALID_PASSWORD) {
        setIsError(false);
        setIsLoading(false);
        return;
      }

      triggerErrorState();
    }, 900);
  };

  const onForgotPassword = () => {
    setIsForgotPulse(true);
    triggerHaptic(10);

    if (forgotTimerRef.current !== null) {
      window.clearTimeout(forgotTimerRef.current);
    }

    forgotTimerRef.current = window.setTimeout(() => {
      setIsForgotPulse(false);
    }, 200);
  };

  return (
    <section className={styles.screen} onPointerDown={onRootPointerDown}>
      <StatusBar />
      <div className={styles.body}>
        <motion.div
          ref={contentRef}
          className={styles.contentBlock}
          animate={{
            y: contentShift,
            transition: {
              duration: reduceMotion ? 0 : isFocused ? 0.32 : 0.28,
              ease: reduceMotion ? "linear" : ENTRY_EASE
            }
          }}
        >
          <div className={styles.heroBlock}>
            <motion.div className={styles.logoWrap} initial={entryLogo.initial} animate={entryLogo.animate}>
              <motion.img
                src={publicAccessAssets.logoMark}
                alt="Attune logo"
                className={styles.logo}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1, 1.06, 1],
                        transition: {
                          duration: 0.6,
                          times: [0, 0.52, 0.78, 1],
                          delay: 0.44,
                          ease: "easeInOut"
                        }
                      }
                }
              />
            </motion.div>
            <motion.div className={styles.textBlock} initial={entryTitle.initial} animate={entryTitle.animate}>
              <h1 className={styles.title}>Public beta access</h1>
              <motion.p className={styles.subtitle} initial={entrySubtitle.initial} animate={entrySubtitle.animate}>
                AttuneAI for Relationships is currently
                <br />
                in public beta
              </motion.p>
            </motion.div>
          </div>

          <div className={inputAreaClassName}>
            <motion.div
              className={`${styles.fieldShell} ${isShaking ? styles.fieldShake : ""}`}
              onAnimationEnd={() => setIsShaking(false)}
              initial={entryField.initial}
              animate={entryField.animate}
            >
              <motion.label
                className={styles.floatingLabel}
                animate={{
                  y: shouldFloatLabel ? -20 : 0,
                  fontSize: shouldFloatLabel ? "12px" : "16px",
                  color: shouldFloatLabel ? "#888882" : "#b0b0b0",
                  transition: {
                    duration: reduceMotion ? 0 : 0.18,
                    ease: "easeOut"
                  }
                }}
              >
                Enter Password
              </motion.label>

              <div className={styles.inputRow}>
                <input
                  ref={inputRef}
                  type="text"
                  value={password}
                  onFocus={onInputFocus}
                  onChange={onPasswordChange}
                  autoComplete="off"
                  inputMode="text"
                  spellCheck={false}
                  className={`${styles.inputControl} ${isMaskedView ? styles.inputControlMasked : ""}`}
                  aria-label="Enter Password"
                />

                <div className={styles.inputDisplay} aria-hidden="true">
                  <AnimatePresence mode="wait">
                    {hasPassword ? (
                      isPasswordVisible ? (
                        <motion.span
                          key="plain"
                          className={styles.plainValue}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.15 } }}
                          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.12 } }}
                        >
                          {password}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="masked"
                          className={styles.maskedValue}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.15 } }}
                          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1 } }}
                        >
                          {maskedDots.map((dot) => (
                            <motion.span
                              key={dot.id}
                              className={styles.maskDot}
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      scale: 0,
                                      opacity: 0
                                    }
                              }
                              animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                  duration: reduceMotion ? 0 : 0.12,
                                  ease: "easeOut"
                                }
                              }}
                            />
                          ))}
                          {isFocused ? <span className={styles.maskedCaret} /> : null}
                        </motion.span>
                      )
                    ) : null}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {hasPassword ? (
                    <motion.button
                      key="eye-toggle"
                      type="button"
                      className={styles.eyeButton}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={onToggleVisibility}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, transition: { duration: reduceMotion ? 0 : 0.16 } }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: reduceMotion ? 0 : 0.1 } }}
                      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isPasswordVisible ? (
                          <motion.span
                            key="eye-off"
                            className={styles.eyeIcon}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: reduceMotion ? 0 : 0.16 } }}
                            exit={{ opacity: 0, scale: 0.7, transition: { duration: reduceMotion ? 0 : 0.12 } }}
                          >
                            <img
                              src={publicAccessAssets.eyeOffIcon}
                              alt=""
                              className={styles.eyeIconSvg}
                            />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="eye-open"
                            className={styles.eyeIcon}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: reduceMotion ? 0 : 0.16 } }}
                            exit={{ opacity: 0, scale: 0.7, transition: { duration: reduceMotion ? 0 : 0.12 } }}
                          >
                            <img
                              src={publicAccessAssets.eyeOpenIcon}
                              alt=""
                              className={styles.eyeIconSvg}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className={styles.underlineBase} />

              <AnimatePresence>
                {showActiveUnderline ? (
                  <motion.div
                    key={`active-underline-${underlineKey}`}
                    className={styles.underlineActive}
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: 1,
                      backgroundColor: isError ? "#d94f3d" : "#1a1a1a",
                      height: isError ? 1.5 : 1,
                      transition: {
                        duration: reduceMotion ? 0 : 0.2,
                        ease: "easeOut"
                      }
                    }}
                    exit={{ scaleX: 0, transition: { duration: reduceMotion ? 0 : 0.12 } }}
                    style={{ transformOrigin: "left center" }}
                  />
                ) : null}
              </AnimatePresence>

              <AnimatePresence>
                {isError ? (
                  <motion.p
                    className={styles.errorLabel}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion ? 0 : 0.08,
                        ease: "easeOut"
                      }
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                      transition: { duration: reduceMotion ? 0 : 0.15 }
                    }}
                  >
                    Password invalid
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </motion.div>

            <div className={styles.actionStack}>
              <motion.button
                type="button"
                className={styles.continueButton}
                disabled={!canSubmit}
                onClick={onContinue}
                onPointerDown={() => {
                  if (!canSubmit) {
                    return;
                  }

                  triggerHaptic([0, 22]);
                }}
                initial={entryCta.initial}
                animate={{
                  ...entryCta.animate,
                  opacity: canSubmit ? 1 : 0.45
                }}
                whileTap={
                  canSubmit
                    ? {
                        scale: 0.97,
                        opacity: 0.85
                      }
                    : undefined
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        scale: { duration: 0.12, ease: isLoading ? "linear" : [0.34, 1.56, 0.64, 1] },
                        opacity: { duration: 0.2, ease: "easeInOut" }
                      }
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.span
                      key="spinner"
                      className={styles.loadingDots}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1 } }}
                    >
                      <span className={styles.loadingDot} />
                      <span className={styles.loadingDot} />
                      <span className={styles.loadingDot} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.15 } }}
                      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1 } }}
                    >
                      Continue
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                type="button"
                className={`${styles.forgotButton} ${isForgotPulse ? styles.forgotButtonPulse : ""}`}
                onClick={onForgotPassword}
                initial={entryForgot.initial}
                animate={entryForgot.animate}
              >
                Forgot Password
              </motion.button>
            </div>
          </div>
        </motion.div>

        {!isFocused ? <HomeIndicator /> : null}

        <AnimatePresence>{isFocused ? <KeyboardMock /> : null}</AnimatePresence>
      </div>
    </section>
  );
}
