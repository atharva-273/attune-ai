import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

interface AccountFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

interface LegalChecksState {
  age: boolean;
  aiCoach: boolean;
  terms: boolean;
  privacy: boolean;
}

export type TestFlowMode = "onboarding" | "invite" | "skip";
export type PlanSelection = "core" | "coreVoice" | null;

interface OnboardingStateValue {
  selectedFlowMode: TestFlowMode;
  setSelectedFlowMode: (mode: TestFlowMode) => void;
  inviteCode: string;
  setInviteCode: (nextCode: string) => void;
  verificationCode: string;
  setVerificationCode: (nextCode: string) => void;
  accountForm: AccountFormState;
  setAccountField: (field: keyof AccountFormState, value: string) => void;
  legalChecks: LegalChecksState;
  setLegalCheck: (field: keyof LegalChecksState, value: boolean) => void;
  selectedPlan: PlanSelection;
  setSelectedPlan: (plan: PlanSelection) => void;
  resetLegalChecks: () => void;
  resetAllTestingState: () => void;
}

const OnboardingStateContext = createContext<OnboardingStateValue | null>(null);

const DEFAULT_FORM_STATE: AccountFormState = {
  email: "",
  password: "",
  confirmPassword: ""
};

const DEFAULT_LEGAL_CHECKS: LegalChecksState = {
  age: false,
  aiCoach: false,
  terms: false,
  privacy: false
};

export function OnboardingStateProvider({ children }: PropsWithChildren) {
  const [selectedFlowMode, setSelectedFlowMode] = useState<TestFlowMode>("onboarding");
  const [inviteCode, setInviteCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [accountForm, setAccountForm] = useState<AccountFormState>(DEFAULT_FORM_STATE);
  const [legalChecks, setLegalChecks] = useState<LegalChecksState>(DEFAULT_LEGAL_CHECKS);
  const [selectedPlan, setSelectedPlan] = useState<PlanSelection>(null);

  const value = useMemo<OnboardingStateValue>(
    () => ({
      selectedFlowMode,
      setSelectedFlowMode,
      inviteCode,
      setInviteCode,
      verificationCode,
      setVerificationCode,
      accountForm,
      setAccountField: (field, value) => {
        setAccountForm((previousState) => ({
          ...previousState,
          [field]: value
        }));
      },
      legalChecks,
      setLegalCheck: (field, value) => {
        setLegalChecks((previousState) => ({
          ...previousState,
          [field]: value
        }));
      },
      selectedPlan,
      setSelectedPlan,
      resetLegalChecks: () => setLegalChecks(DEFAULT_LEGAL_CHECKS),
      resetAllTestingState: () => {
        setSelectedFlowMode("onboarding");
        setInviteCode("");
        setVerificationCode("");
        setAccountForm(DEFAULT_FORM_STATE);
        setLegalChecks(DEFAULT_LEGAL_CHECKS);
        setSelectedPlan(null);
      }
    }),
    [accountForm, inviteCode, legalChecks, selectedFlowMode, selectedPlan, verificationCode]
  );

  return (
    <OnboardingStateContext.Provider value={value}>
      {children}
    </OnboardingStateContext.Provider>
  );
}

export function useOnboardingState() {
  const context = useContext(OnboardingStateContext);

  if (!context) {
    throw new Error("useOnboardingState must be used inside OnboardingStateProvider");
  }

  return context;
}

export function isAccountFormValid(form: AccountFormState) {
  const hasEmail = form.email.trim().length > 4 && form.email.includes("@");
  const hasPassword = form.password.length >= 8;
  const hasConfirmPassword = form.confirmPassword.length >= 8;
  const passwordsMatch = form.password !== "" && form.password === form.confirmPassword;

  return hasEmail && hasPassword && hasConfirmPassword && passwordsMatch;
}

export function isInviteCodeValid(code: string) {
  return code.trim().length >= 5;
}

export function isVerificationCodeValid(code: string) {
  return code.trim().length >= 5;
}
