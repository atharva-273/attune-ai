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

interface OnboardingStateValue {
  inviteCode: string;
  setInviteCode: (nextCode: string) => void;
  accountForm: AccountFormState;
  setAccountField: (field: keyof AccountFormState, value: string) => void;
  legalChecks: LegalChecksState;
  setLegalCheck: (field: keyof LegalChecksState, value: boolean) => void;
  resetLegalChecks: () => void;
}

const OnboardingStateContext = createContext<OnboardingStateValue | null>(null);

const DEFAULT_FORM_STATE: AccountFormState = {
  email: "",
  password: "",
  confirmPassword: ""
};

const DEFAULT_LEGAL_CHECKS: LegalChecksState = {
  age: true,
  aiCoach: true,
  terms: true,
  privacy: true
};

export function OnboardingStateProvider({ children }: PropsWithChildren) {
  const [inviteCode, setInviteCode] = useState("");
  const [accountForm, setAccountForm] = useState<AccountFormState>(DEFAULT_FORM_STATE);
  const [legalChecks, setLegalChecks] = useState<LegalChecksState>(DEFAULT_LEGAL_CHECKS);

  const value = useMemo<OnboardingStateValue>(
    () => ({
      inviteCode,
      setInviteCode,
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
      resetLegalChecks: () => setLegalChecks(DEFAULT_LEGAL_CHECKS)
    }),
    [inviteCode, accountForm, legalChecks]
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
