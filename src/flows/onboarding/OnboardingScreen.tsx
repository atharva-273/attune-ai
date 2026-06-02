import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode
} from "react";
import { useNavigate } from "react-router-dom";
import { onboardingAssets } from "./onboardingAssets";
import {
  ONBOARDING_ROUTES,
  type OnboardingScreenKey,
  type OnboardingScreenMeta
} from "./onboardingConfig";
import {
  isAccountFormValid,
  isInviteCodeValid,
  isVerificationCodeValid,
  useOnboardingState
} from "./onboardingState";
import styles from "./OnboardingScreen.module.css";

type SheetKind = "learn" | "terms" | "privacy";

const SWIPE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

let previousScreenIndex = 0;
let previousProgressStep = 0;

interface PressableButtonProps {
  className: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
}

function PressableButton({
  className,
  disabled,
  onClick,
  type = "button",
  children
}: PressableButtonProps) {
  return (
    <motion.button
      type={type}
      className={`${styles.buttonBase} ${className}`}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.12, ease: SWIPE_EASE }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function useRouteDirection(screenIndex: number) {
  const [direction] = useState(() => (screenIndex >= previousScreenIndex ? 1 : -1));

  useEffect(() => {
    previousScreenIndex = screenIndex;
  }, [screenIndex]);

  return direction;
}

function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <header className={`${styles.statusBar} ${light ? styles.statusBarLight : ""}`}>
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
          <div className={styles.wifi} aria-hidden="true" />
          <div className={styles.battery} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

function HomeIndicator({ light }: { light: boolean }) {
  return (
    <footer className={styles.homeIndicatorWrap}>
      <div
        className={`${styles.homeIndicator} ${light ? styles.homeIndicatorLight : ""}`}
        aria-hidden="true"
      />
    </footer>
  );
}

function ProgressBar({
  currentStep,
  totalSteps
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const previousStepRef = useRef(previousProgressStep);

  useEffect(() => {
    previousProgressStep = currentStep;
  }, [currentStep]);

  return (
    <div className={styles.progress}>
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => {
        const wasFilled = step <= previousStepRef.current;
        const isFilled = step <= currentStep;
        const shouldAnimateFill = !wasFilled && isFilled;

        return (
          <div key={step} className={styles.progressSegment}>
            <motion.span
              className={styles.progressSegmentFill}
              initial={{ scaleX: wasFilled ? 1 : 0 }}
              animate={{ scaleX: isFilled ? 1 : 0 }}
              transition={{
                duration: shouldAnimateFill ? 0.36 : 0.2,
                ease: SWIPE_EASE
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function InfoSheet({
  kind,
  onClose
}: {
  kind: SheetKind;
  onClose: () => void;
}) {
  const copyByKind: Record<SheetKind, { title: string; body: string }> = {
    learn: {
      title: "Why this helps",
      body:
        "Couples often do better with tools they agree on before conflict begins. A small shared intention can make it easier to reach for support in tense moments."
    },
    terms: {
      title: "Terms of Use",
      body:
        "AttuneAI guides reflection and communication. It does not replace professional support, and shared features only activate when both partners opt in."
    },
    privacy: {
      title: "Privacy Policy",
      body:
        "Private reflections remain private unless shared. Joint-session summaries are shared records and require both partners for permanent removal."
    }
  };

  const copy = copyByKind[kind];

  return (
    <motion.div
      className={styles.sheetHost}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={styles.sheetBackdrop} onClick={onClose} aria-label="Close sheet" />
      <motion.section
        className={styles.sheet}
        initial={{ y: 42 }}
        animate={{ y: 0, transition: { duration: 0.26, ease: SWIPE_EASE } }}
        exit={{ y: 42, transition: { duration: 0.18, ease: SWIPE_EASE } }}
      >
        <h3 className={styles.sheetTitle}>{copy.title}</h3>
        <p className={styles.sheetBody}>{copy.body}</p>
        <PressableButton className={`${styles.primaryButton} ${styles.sheetButton}`} onClick={onClose}>
          Continue
        </PressableButton>
      </motion.section>
    </motion.div>
  );
}

function getBackgroundStyle(screenKey: OnboardingScreenKey): string {
  switch (screenKey) {
    case "start":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.07) 48.341%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.onboardingStartHero})`;
    case "splash":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.07) 79.348%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.splashImage})`;
    case "five1":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 79.348%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.onboarding5HeroA})`;
    case "five2":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 79.348%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.onboarding5HeroAAlt})`;
    case "nine":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.08) 75.744%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.onboarding9Hero})`;
    case "twelve":
      return `linear-gradient(180deg, rgba(255, 255, 255, 0.2) 79.348%, rgba(0, 0, 0, 0.7) 100%), url(${onboardingAssets.onboardingReadyHero})`;
    default:
      return "none";
  }
}

function renderProgress(screen: OnboardingScreenMeta) {
  if (!screen.progressVisible || !screen.progressState) {
    previousProgressStep = 0;
    return null;
  }

  return (
    <ProgressBar
      currentStep={screen.progressState.step}
      totalSteps={screen.progressState.total}
    />
  );
}

export function OnboardingScreen({ screen }: { screen: OnboardingScreenMeta }) {
  const navigate = useNavigate();
  const direction = useRouteDirection(screen.screenIndex);
  const inviteInputRef = useRef<HTMLInputElement>(null);
  const verificationInputRef = useRef<HTMLInputElement>(null);
  const [sheetKind, setSheetKind] = useState<SheetKind | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    selectedFlowMode,
    setSelectedFlowMode,
    inviteCode,
    setInviteCode,
    verificationCode,
    setVerificationCode,
    accountForm,
    setAccountField,
    legalChecks,
    setLegalCheck,
    resetLegalChecks,
    resetAllTestingState
  } = useOnboardingState();

  const inviteValid = useMemo(() => isInviteCodeValid(inviteCode), [inviteCode]);
  const verificationValid = useMemo(
    () => isVerificationCodeValid(verificationCode),
    [verificationCode]
  );
  const accountValid = useMemo(() => isAccountFormValid(accountForm), [accountForm]);
  const legalValid = useMemo(
    () => legalChecks.age && legalChecks.aiCoach && legalChecks.terms && legalChecks.privacy,
    [legalChecks]
  );

  useEffect(() => {
    if (screen.screenKey === "five2" && !inviteValid && inviteCode.trim() === "") {
      setInviteCode("VHT31");
      return;
    }

    if (screen.screenKey === "six2" && !accountValid && accountForm.email.trim() === "") {
      setAccountField("email", "test@gmail.com");
      setAccountField("password", "password123");
      setAccountField("confirmPassword", "password123");
      return;
    }

    if (screen.screenKey === "seven2" && !verificationValid && verificationCode.trim() === "") {
      setVerificationCode("VHT31");
    }
  }, [
    accountForm.email,
    accountValid,
    inviteCode,
    inviteValid,
    screen.screenKey,
    setAccountField,
    setInviteCode,
    setVerificationCode,
    verificationCode,
    verificationValid
  ]);

  useEffect(() => {
    if (screen.screenKey === "five1" && inviteValid) {
      navigate(ONBOARDING_ROUTES.five2, { replace: true });
      return;
    }

    if (screen.screenKey === "five2" && !inviteValid) {
      navigate(ONBOARDING_ROUTES.five1, { replace: true });
      return;
    }

    if (screen.screenKey === "six1" && accountValid) {
      navigate(ONBOARDING_ROUTES.six2, { replace: true });
      return;
    }

    if (screen.screenKey === "six2" && !accountValid) {
      navigate(ONBOARDING_ROUTES.six1, { replace: true });
      return;
    }

    if (screen.screenKey === "seven1" && verificationValid) {
      navigate(ONBOARDING_ROUTES.seven2, { replace: true });
      return;
    }

    if (screen.screenKey === "seven2" && !verificationValid) {
      navigate(ONBOARDING_ROUTES.seven1, { replace: true });
      return;
    }

    if (screen.screenKey === "eight1" && legalValid) {
      navigate(ONBOARDING_ROUTES.eight2, { replace: true });
      return;
    }

    if (screen.screenKey === "eight2" && !legalValid) {
      navigate(ONBOARDING_ROUTES.eight1, { replace: true });
    }
  }, [accountValid, inviteValid, legalValid, navigate, screen.screenKey, verificationValid]);

  useEffect(() => {
    if (screen.screenKey !== "eight1" && screen.screenKey !== "eight2") {
      setSheetKind(null);
      return;
    }

    if (screen.screenKey === "eight1") {
      resetLegalChecks();
    }
  }, [screen.screenKey]);

  const onInviteCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setInviteCode(normalizedValue.slice(0, 5));
  };

  const onVerificationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setVerificationCode(normalizedValue.slice(0, 5));
  };

  const inviteCodeChars = inviteCode.slice(0, 5).split("");
  const verificationCodeChars = verificationCode.slice(0, 5).split("");

  const topSpacingClass =
    screen.screenKey === "five1" ||
    screen.screenKey === "five2" ||
    screen.screenKey === "nine" ||
    screen.screenKey === "twelve"
      ? styles.containerTop24
      : screen.screenKey === "six1" ||
          screen.screenKey === "six2" ||
          screen.screenKey === "seven1" ||
          screen.screenKey === "seven2" ||
          screen.screenKey === "eight1" ||
          screen.screenKey === "eight2" ||
          screen.screenKey === "ten" ||
          screen.screenKey === "eleven"
        ? styles.containerTop32
        : "";

  const rootClassName = `${styles.container} ${
    screen.backgroundMode === "image" ? styles.containerOnImage : ""
  } ${topSpacingClass}`.trim();

  const backgroundStyle = {
    backgroundImage: getBackgroundStyle(screen.screenKey)
  };

  const renderScreenBody = () => {
    switch (screen.screenKey) {
      case "selector":
        return (
          <>
            <div className={styles.selectorStack}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Choose your test flow</h1>
                <p className={styles.subtitle}>
                  Tap on a mode to begin your journey through the app
                </p>
              </div>
              <div className={styles.selectorChips}>
                <span className={styles.selectorChip}>Private Beta Testing</span>
                <span className={`${styles.selectorChip} ${styles.selectorChipAlert}`}>
                  User Not Authenticated
                </span>
              </div>
              <div className={styles.selectorList}>
                <button
                  type="button"
                  className={`${styles.selectorItem} ${
                    selectedFlowMode === "onboarding" ? styles.selectorItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedFlowMode("onboarding");
                    navigate(ONBOARDING_ROUTES.start);
                  }}
                >
                  <div className={styles.selectorItemContent}>
                    <p className={styles.selectorItemTitle}>Start Onboarding Flow</p>
                    <p className={styles.selectorItemSubtitle}>Onboarding flow</p>
                  </div>
                  <span aria-hidden="true" className={styles.selectorArrow}>
                    →
                  </span>
                </button>
                <button
                  type="button"
                  className={`${styles.selectorItem} ${
                    selectedFlowMode === "invite" ? styles.selectorItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedFlowMode("invite");
                    navigate(ONBOARDING_ROUTES.five1);
                  }}
                >
                  <div className={styles.selectorItemContent}>
                    <p className={styles.selectorItemTitle}>New user with invite</p>
                    <p className={styles.selectorItemSubtitle}>Onboarding with partner&apos;s invite</p>
                  </div>
                  <span aria-hidden="true" className={styles.selectorArrow}>
                    →
                  </span>
                </button>
                <button
                  type="button"
                  className={`${styles.selectorItem} ${
                    selectedFlowMode === "skip" ? styles.selectorItemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedFlowMode("skip");
                    navigate(ONBOARDING_ROUTES.twelve);
                  }}
                >
                  <div className={styles.selectorItemContent}>
                    <p className={styles.selectorItemTitle}>Skip to App</p>
                    <p className={styles.selectorItemSubtitle}>Continue with existing session (if any)</p>
                  </div>
                  <span aria-hidden="true" className={styles.selectorArrow}>
                    →
                  </span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className={`${styles.textAction} ${styles.textActionDark}`}
              onClick={() => {
                resetAllTestingState();
                navigate(ONBOARDING_ROUTES.selector, { replace: true });
              }}
            >
              Reset all testing state
            </button>
          </>
        );
      case "start":
        return (
          <>
            <div className={styles.startScreenBody} />
            <div className={styles.actionColumn}>
              <div className={styles.startBrandStack}>
                <h1 className={styles.startBrand}>AttuneAI</h1>
                <p className={styles.startTagline}>Emotional Infrastructure for relationships</p>
              </div>
              <PressableButton
                className={styles.primaryLightButton}
                onClick={() => navigate(ONBOARDING_ROUTES.splash)}
              >
                Get Started
              </PressableButton>
            </div>
          </>
        );
      case "splash":
        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>{"Stay Steady.\nThink Clearly.\nShow up."}</h1>
                <p className={styles.subtitle}>
                  A structured space to process what happened, get your head right, &amp; handle
                  conflict without making it worse.
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={styles.primaryLightButton}
                onClick={() => navigate(ONBOARDING_ROUTES.one)}
              >
                Proceed
              </PressableButton>
            </div>
          </>
        );
      case "one":
        return (
          <>
            <div className={`${styles.sectionTop} ${styles.sectionMainGap}`}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Here’s how it works</h1>
                <p className={styles.subtitle}>A quick look at what to expect from AttuneAI</p>
              </div>
              <div className={styles.infoStack}>
                <div className={styles.infoItem}>
                  <h2 className={styles.infoItemTitle}>What you get</h2>
                  <p className={styles.infoItemBody}>
                    A structured way to sort through what happened, stay calm, and communicate
                    without escalating
                  </p>
                </div>
                <hr className={styles.infoLine} />
                <div className={styles.infoItem}>
                  <h2 className={styles.infoItemTitle}>What it won’t do</h2>
                  <p className={styles.infoItemBody}>
                    Attune AI won’t judge you, pick sides or tell you what to do in all situations
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton
                className={styles.backButton}
                onClick={() => navigate(ONBOARDING_ROUTES.splash)}
              >
                ←
              </PressableButton>
              <PressableButton
                className={styles.primaryButton}
                onClick={() => navigate(ONBOARDING_ROUTES.two)}
              >
                Got it
              </PressableButton>
            </div>
          </>
        );
      case "two":
        return (
          <>
            <div className={`${styles.sectionTop} ${styles.sectionMainGap}`}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>{"Three tools.\nOne relationship"}</h1>
                <p className={styles.subtitle}>
                  A structured space to process what happened &amp; handle conflict without making it
                  worse.
                </p>
              </div>
              <div className={styles.infoStack}>
                <div className={styles.infoItem}>
                  <h2 className={styles.infoItemTitle}>Your private relationship guide</h2>
                  <p className={styles.infoItemBody}>
                    A private space to process. Nothing leaves without your choice.
                  </p>
                </div>
                <hr className={styles.infoLine} />
                <div className={styles.infoItem}>
                  <h2 className={styles.infoItemTitle}>Their private relationship guide</h2>
                  <p className={styles.infoItemBody}>
                    Your partner controls what you see in joint sessions.
                  </p>
                </div>
                <hr className={styles.infoLine} />
                <div className={styles.infoItem}>
                  <h2 className={styles.infoItemTitle}>The shared facilitation space</h2>
                  <p className={styles.infoItemBody}>
                    A neutral guide keeping conversations structured, fair, productive
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton
                className={styles.backButton}
                onClick={() => navigate(ONBOARDING_ROUTES.one)}
              >
                ←
              </PressableButton>
              <PressableButton
                className={styles.primaryButton}
                onClick={() => navigate(ONBOARDING_ROUTES.three)}
              >
                Continue
              </PressableButton>
            </div>
          </>
        );
      case "three":
        return (
          <>
            <div className={`${styles.sectionTop} ${styles.sectionMainGap}`}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Privacy that’s precise</h1>
                <p className={styles.subtitle}>All the shared work is joint.</p>
              </div>
              <div className={styles.infoStack}>
                <p className={styles.infoItemBody}>
                  Private reflections remain private unless shared by you or your partner.
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Shared sessions are attended together &amp; become part of your work.
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Either partner can request removal of a shared summary, but permanent removal
                  requires both.
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Requesting removal pauses but doesn’t erase the summary.
                </p>
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton
                className={styles.backButton}
                onClick={() => navigate(ONBOARDING_ROUTES.two)}
              >
                ←
              </PressableButton>
              <PressableButton
                className={styles.primaryButton}
                onClick={() => navigate(ONBOARDING_ROUTES.four1)}
              >
                Continue
              </PressableButton>
            </div>
          </>
        );
      case "four1":
      case "four2":
      case "four3": {
        const isChecked = screen.screenKey !== "four1";

        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>A small agreement for hard moments</h1>
                <p className={styles.subtitle}>
                  When tense, it’s easy to repeat patterns. Use AttuneAI before escalation.
                </p>
              </div>
              <div className={styles.checkboxCard}>
                <motion.button
                  type="button"
                  className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ""}`}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.12, ease: SWIPE_EASE }}
                  onClick={() =>
                    navigate(isChecked ? ONBOARDING_ROUTES.four1 : ONBOARDING_ROUTES.four2)
                  }
                >
                  <span className={styles.checkboxIcon}>✓</span>
                </motion.button>
                <h2 className={styles.checkboxHeading}>I’ll try this</h2>
                <p className={styles.checkboxBody}>
                  When things start to escalate, I’ll try using AttuneAI before reacting.
                </p>
                {screen.screenKey === "four3" ? (
                  <>
                    <p className={styles.learnBody}>
                      Couples often do better with tools they agree on before conflict begins. A
                      small shared intention can make it easier to reach for support in the moment.
                    </p>
                    <button
                      type="button"
                      className={styles.learnLink}
                      onClick={() => navigate(ONBOARDING_ROUTES.four2)}
                    >
                      Show less
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className={styles.learnLink}
                    onClick={() => navigate(ONBOARDING_ROUTES.four3)}
                  >
                    Learn why this helps
                  </button>
                )}
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton
                className={styles.backButton}
                onClick={() => navigate(ONBOARDING_ROUTES.three)}
              >
                ←
              </PressableButton>
              <PressableButton
                className={`${styles.primaryButton} ${
                  !isChecked ? styles.primaryButtonDisabled : ""
                }`}
                disabled={!isChecked}
                onClick={() => navigate(ONBOARDING_ROUTES.five1)}
              >
                Continue
              </PressableButton>
            </div>
          </>
        );
      }
      case "five1":
      case "five2":
        return (
          <>
            <div className={`${styles.sectionTop} ${styles.sectionInviteGap}`}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Joining through a partner invite?</h1>
                <p className={styles.subtitle}>
                  Enter the invite code to connect to your partner&apos;s AttuneAI plan after account
                  creation.
                </p>
              </div>
              <div className={styles.inviteStack}>
                <input
                  ref={inviteInputRef}
                  value={inviteCode}
                  onChange={onInviteCodeChange}
                  className={styles.inviteInput}
                  autoComplete="off"
                  inputMode="text"
                  aria-label="Invite code"
                />
                <button
                  type="button"
                  className={styles.inviteCodeRow}
                  onClick={() => inviteInputRef.current?.focus()}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={`invite-${index}`} className={styles.inviteCodeCell}>
                      <span className={styles.inviteCodeChar}>{inviteCodeChars[index] ?? ""}</span>
                    </div>
                  ))}
                </button>
                <p className={styles.inviteHint}>
                  Find your invite code on the invite page or message.
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={`${styles.primaryLightButton} ${
                  !inviteValid ? styles.primaryButtonDisabled : ""
                }`}
                disabled={!inviteValid}
                onClick={() => navigate(ONBOARDING_ROUTES.six1)}
              >
                Continue with invite
              </PressableButton>
              <button
                type="button"
                className={styles.textAction}
                onClick={() => {
                  resetAllTestingState();
                  navigate(ONBOARDING_ROUTES.selector);
                }}
              >
                Reset all testing state
              </button>
            </div>
          </>
        );
      case "six1":
      case "six2": {
        const displayPassword = showPassword ? accountForm.password : "•".repeat(accountForm.password.length);
        const displayConfirmPassword = showPassword
          ? accountForm.confirmPassword
          : "•".repeat(accountForm.confirmPassword.length);

        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Create your account</h1>
                <p className={styles.subtitle}>Enter your email to get started</p>
              </div>
              <div className={styles.formStack}>
                <label className={styles.textField}>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input
                      type="email"
                      className={styles.fieldInput}
                      placeholder="you@example.com"
                      value={accountForm.email}
                      onChange={(event) => setAccountField("email", event.target.value)}
                    />
                  </div>
                </label>
                <label className={styles.textField}>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Password</span>
                    {screen.screenKey === "six1" ? (
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.fieldInput}
                        placeholder="At least 8 characters"
                        value={accountForm.password}
                        onChange={(event) => setAccountField("password", event.target.value)}
                      />
                    ) : (
                      <p className={styles.fieldStatic}>{displayPassword}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword((previousState) => !previousState)}
                  >
                    ◉
                  </button>
                </label>
                <label className={styles.textField}>
                  <div className={styles.fieldContent}>
                    <span className={styles.fieldLabel}>Confirm Password</span>
                    {screen.screenKey === "six1" ? (
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.fieldInput}
                        placeholder="Re-enter your password"
                        value={accountForm.confirmPassword}
                        onChange={(event) =>
                          setAccountField("confirmPassword", event.target.value)
                        }
                      />
                    ) : (
                      <p className={styles.fieldStatic}>{displayConfirmPassword}</p>
                    )}
                  </div>
                </label>
                <PressableButton
                  className={`${styles.primaryButton} ${
                    !accountValid ? styles.primaryButtonDisabled : ""
                  }`}
                  disabled={!accountValid}
                  onClick={() => navigate(ONBOARDING_ROUTES.seven1)}
                >
                  Continue
                </PressableButton>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <div className={styles.socialGroup}>
                <p className={styles.socialText}>Or sign up with</p>
                <div className={styles.socialIcons}>
                  <img src={onboardingAssets.socialGoogle} alt="Google" />
                  <img src={onboardingAssets.socialApple} alt="Apple" />
                  <img src={onboardingAssets.socialFacebook} alt="Facebook" />
                </div>
              </div>
              <p className={styles.signInText}>
                Already have an account? <button type="button">Sign in</button>
              </p>
            </div>
          </>
        );
      }
      case "seven1":
      case "seven2":
        return (
          <>
            <div className={styles.sectionTop}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>{"Verify your email to\ncreate your account"}</h1>
                <p className={styles.subtitle}>
                  We have sent the verification mail on <strong>test@gmail.com</strong>
                </p>
              </div>
              <div className={styles.inviteStack}>
                <input
                  ref={verificationInputRef}
                  value={verificationCode}
                  onChange={onVerificationCodeChange}
                  className={styles.inviteInput}
                  autoComplete="off"
                  inputMode="text"
                  aria-label="Verification code"
                />
                <button
                  type="button"
                  className={styles.inviteCodeRow}
                  onClick={() => verificationInputRef.current?.focus()}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={`verification-${index}`} className={styles.inviteCodeCell}>
                      <span
                        className={`${styles.inviteCodeChar} ${
                          screen.screenKey === "seven1" ? styles.inviteCodeCharHidden : ""
                        }`}
                      >
                        {verificationCodeChars[index] ?? ""}
                      </span>
                    </div>
                  ))}
                </button>
                <p className={styles.inviteHint}>Find your invite code on the invite page or message.</p>
                <p className={styles.timerText}>
                  <span>Resend code after</span> <strong>00: 30 sec</strong>
                </p>
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton className={styles.backButton} onClick={() => navigate(ONBOARDING_ROUTES.six2)}>
                ←
              </PressableButton>
              <PressableButton
                className={`${styles.primaryButton} ${
                  !verificationValid ? styles.primaryButtonDisabled : ""
                }`}
                disabled={!verificationValid}
                onClick={() => navigate(ONBOARDING_ROUTES.eight1)}
              >
                Proceed
              </PressableButton>
            </div>
          </>
        );
      case "eight1":
      case "eight2":
        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>A few things to confirm</h1>
                <p className={styles.subtitle}>
                  These help keep AttuneAI safe, honest and yours.
                </p>
              </div>
              <div className={styles.confirmList}>
                <div className={styles.confirmRow}>
                  <p className={styles.confirmText}>I am over 18 years old</p>
                  <motion.button
                    type="button"
                    className={`${styles.checkbox} ${styles.checkSmall} ${
                      legalChecks.age ? styles.checkboxChecked : ""
                    }`}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setLegalCheck("age", !legalChecks.age)}
                  >
                    <span className={styles.checkboxIcon}>✓</span>
                  </motion.button>
                </div>
                <hr className={styles.infoLine} />
                <div className={`${styles.confirmRow} ${styles.confirmRowStart}`}>
                  <div className={styles.confirmText}>
                    I understand AttuneAI is an AI communication coach
                    <p className={styles.confirmSubtext}>
                      Supports reflection and clarity not therapy or professional care.
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    className={`${styles.checkbox} ${styles.checkSmall} ${
                      legalChecks.aiCoach ? styles.checkboxChecked : ""
                    }`}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setLegalCheck("aiCoach", !legalChecks.aiCoach)}
                  >
                    <span className={styles.checkboxIcon}>✓</span>
                  </motion.button>
                </div>
                <hr className={styles.infoLine} />
                <div className={styles.confirmRow}>
                  <p className={styles.confirmText}>
                    I agree to the{" "}
                    <button
                      type="button"
                      className={styles.textLink}
                      onClick={() => setSheetKind("terms")}
                    >
                      Term of Use
                    </button>
                  </p>
                  <motion.button
                    type="button"
                    className={`${styles.checkbox} ${styles.checkSmall} ${
                      legalChecks.terms ? styles.checkboxChecked : ""
                    }`}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setLegalCheck("terms", !legalChecks.terms)}
                  >
                    <span className={styles.checkboxIcon}>✓</span>
                  </motion.button>
                </div>
                <hr className={styles.infoLine} />
                <div className={styles.confirmRow}>
                  <p className={styles.confirmText}>
                    I have read the{" "}
                    <button
                      type="button"
                      className={styles.textLink}
                      onClick={() => setSheetKind("privacy")}
                    >
                      Privacy policy
                    </button>
                  </p>
                  <motion.button
                    type="button"
                    className={`${styles.checkbox} ${styles.checkSmall} ${
                      legalChecks.privacy ? styles.checkboxChecked : ""
                    }`}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setLegalCheck("privacy", !legalChecks.privacy)}
                  >
                    <span className={styles.checkboxIcon}>✓</span>
                  </motion.button>
                </div>
                <hr className={styles.infoLine} />
              </div>
            </div>
            <div className={styles.actionRow}>
              <PressableButton
                className={styles.backButton}
                onClick={() => navigate(ONBOARDING_ROUTES.seven2)}
              >
                ←
              </PressableButton>
              <PressableButton
                className={`${styles.primaryButton} ${
                  !legalValid ? styles.primaryButtonDisabled : ""
                }`}
                disabled={!legalValid}
                onClick={() => navigate(ONBOARDING_ROUTES.nine)}
              >
                Understood
              </PressableButton>
            </div>
          </>
        );
      case "nine":
        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Accept your partner’s invite on Attune?</h1>
                <p className={styles.subtitle}>
                  Accepting this invite will link your account with your partner for shared
                  relationship features. <strong>However, nothing is connected until you accept the invite.</strong>
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={styles.primaryLightButton}
                onClick={() => navigate(ONBOARDING_ROUTES.ten)}
              >
                Accept Invite
              </PressableButton>
              <button
                type="button"
                className={styles.textAction}
                onClick={() => navigate(ONBOARDING_ROUTES.ten)}
              >
                Skip for now
              </button>
            </div>
          </>
        );
      case "ten":
        return (
          <>
            <div className={styles.sectionTop}>
              {renderProgress(screen)}
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>The Attachment Quiz</h1>
                <p className={styles.subtitle}>
                  A quick 1–2 min quiz to help AttuneAI understand your relationship patterns.
                </p>
              </div>
              <div className={styles.infoStack}>
                <p className={styles.infoItemBody}>
                  We found your previous quiz results. Tap Skip to use them, or retake the quiz
                  for this demo.
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Each assessment creates a private PDF for reflection and ongoing insight.
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Your partner can join too if both of you do, you’ll get a shared summary PDF.
                  Completely optional.
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={styles.primaryButton}
                onClick={() => navigate(ONBOARDING_ROUTES.eleven)}
              >
                Retake the quiz
              </PressableButton>
              <button
                type="button"
                className={`${styles.textAction} ${styles.textActionDark}`}
                onClick={() => navigate(ONBOARDING_ROUTES.eleven)}
              >
                Skip for now
              </button>
            </div>
          </>
        );
      case "eleven":
        return (
          <>
            <div className={styles.sectionTop}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>{"The the Love\nLanguage Quiz"}</h1>
                <p className={styles.subtitle}>
                  A short quiz to help you notice how you most naturally give and receive care. It
                  can deepen connection and reduce small misunderstandings
                </p>
              </div>
              <div className={styles.infoStack}>
                <p className={styles.infoItemBody}>
                  Each assessment you complete generates a full pdf you can keep - a private
                  resource for self-reflection and ongoing insight
                </p>
                <hr className={styles.infoLine} />
                <p className={styles.infoItemBody}>
                  Your partner will also be invited to take these. If you both complete one,
                  you&apos;ll receive a joint partner summary PDF - to help you understand each
                  other better and support your relationship. It&apos;s all completely optional.
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={styles.primaryButton}
                onClick={() => navigate(ONBOARDING_ROUTES.twelve)}
              >
                Take the quiz
              </PressableButton>
              <button
                type="button"
                className={`${styles.textAction} ${styles.textActionDark}`}
                onClick={() => navigate(ONBOARDING_ROUTES.twelve)}
              >
                Skip for now
              </button>
            </div>
          </>
        );
      case "twelve":
        return (
          <>
            <div className={styles.sectionTop}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Ready to get started?</h1>
                <p className={styles.subtitle}>
                  We&apos;re almost there! You are all set for starting your journey with Attune AI
                </p>
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={styles.primaryLightButton}
                onClick={() => navigate(ONBOARDING_ROUTES.thirteen1)}
              >
                Continue
              </PressableButton>
              <button type="button" className={styles.textAction}>
                No commitment. Cancel anytime.
              </button>
            </div>
          </>
        );
      case "thirteen1":
      case "thirteen2":
      case "thirteen3": {
        const planFeaturesCore = [
          "Unlimited Reflect session (private)",
          "Unlimited Repair support",
          "Guided partner invites",
          "Shares sessions (Resolve)",
          "Core relationship insights",
          "Up to 90 mins of voice per month"
        ];
        const planFeaturesVoice = [
          "Everything in Core",
          "Refine couples counselling sessions",
          "Extended voice conversations",
          "Faster, responsive AI routing",
          "Improved support in intense emotions",
          "Up to 180 mins of voice per month"
        ];
        const isVoiceView = screen.screenKey === "thirteen3";
        const coreSelected = screen.screenKey === "thirteen2";
        const purchaseEnabled = screen.screenKey === "thirteen2";

        const renderPlanCard = (
          {
            title,
            subtitle,
            price,
            features,
            selected
          }: {
            title: string;
            subtitle: string;
            price: string;
            features: string[];
            selected: boolean;
          },
          onClick: () => void
        ) => (
          <button
            type="button"
            className={`${styles.planCard} ${selected ? styles.planCardSelected : ""}`}
            onClick={onClick}
          >
            <div className={styles.planCardTop}>
              <p className={styles.planTitle}>{title}</p>
              <span className={`${styles.planRadio} ${selected ? styles.planRadioSelected : ""}`} />
            </div>
            <p className={styles.planSubtitle}>{subtitle}</p>
            <hr className={styles.planDivider} />
            <div className={styles.planPriceRow}>
              <span className={styles.planPrice}>{price}</span>
              <span className={styles.planUnit}>/ month</span>
            </div>
            <div className={styles.planFeatureList}>
              {features.map((feature) => (
                <div className={styles.planFeature} key={feature}>
                  <span aria-hidden="true" className={styles.planFeatureIcon}>
                    ◌
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </button>
        );

        return (
          <>
            <div className={styles.sectionTop}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>Choose a plan</h1>
                <p className={styles.subtitle}>
                  Start with what feels right. You can change anytime.
                </p>
              </div>
              <div className={styles.planCarouselViewport}>
                <div
                  className={styles.planCarouselTrack}
                  style={{
                    transform: `translateX(${isVoiceView ? "-320px" : "0px"})`
                  }}
                >
                  {renderPlanCard(
                    {
                      title: "Core",
                      subtitle: "Support and moments. Designed for consistent everyday use.",
                      price: "$ 49.99",
                      features: planFeaturesCore,
                      selected: coreSelected && !isVoiceView
                    },
                    () => navigate(ONBOARDING_ROUTES.thirteen2)
                  )}
                  {renderPlanCard(
                    {
                      title: "Core + Voice",
                      subtitle:
                        "Real-time support for couples who prefer deeper conversations.",
                      price: "$ 79.99",
                      features: planFeaturesVoice,
                      selected: false
                    },
                    () => undefined
                  )}
                </div>
              </div>
              <div className={styles.planIndicators}>
                <button
                  type="button"
                  className={`${styles.planIndicator} ${!isVoiceView ? styles.planIndicatorActive : ""}`}
                  onClick={() => navigate(ONBOARDING_ROUTES.thirteen1)}
                />
                <button
                  type="button"
                  className={`${styles.planIndicator} ${isVoiceView ? styles.planIndicatorActive : ""}`}
                  onClick={() => navigate(ONBOARDING_ROUTES.thirteen3)}
                />
              </div>
            </div>
            <div className={styles.actionColumn}>
              <PressableButton
                className={`${styles.primaryButton} ${
                  !purchaseEnabled ? styles.primaryButtonDisabled : ""
                }`}
                disabled={!purchaseEnabled}
              >
                Purchase plan
              </PressableButton>
              <button type="button" className={`${styles.textAction} ${styles.textActionDark}`}>
                Start a free trial
              </button>
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={styles.motionRoot}
      initial={{ opacity: 1, x: direction * 26 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.34, ease: SWIPE_EASE } }}
      exit={{ opacity: 1, x: direction * -26, transition: { duration: 0.3, ease: SWIPE_EASE } }}
    >
      <motion.div
        className={styles.backgroundLayer}
        style={backgroundStyle}
        initial={{ x: direction * 42 }}
        animate={{ x: 0, transition: { duration: 0.36, ease: SWIPE_EASE } }}
        exit={{ x: direction * -36, transition: { duration: 0.3, ease: SWIPE_EASE } }}
      />
      <motion.div
        className={styles.contentLayer}
        initial={{ x: direction * 24, opacity: 0.96 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, delay: 0.04, ease: SWIPE_EASE }
        }}
        exit={{ x: direction * -22, opacity: 1, transition: { duration: 0.24, ease: SWIPE_EASE } }}
      >
        <StatusBar light={screen.screenKey === "start"} />
        <main className={rootClassName}>{renderScreenBody()}</main>
        <HomeIndicator
          light={
            screen.backgroundMode === "image" || screen.screenKey === "start"
          }
        />
      </motion.div>
      <AnimatePresence>{sheetKind ? <InfoSheet kind={sheetKind} onClose={() => setSheetKind(null)} /> : null}</AnimatePresence>
    </motion.div>
  );
}
