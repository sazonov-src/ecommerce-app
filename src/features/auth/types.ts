import { type AuthUser as AmplifyAuthUser } from "aws-amplify/auth";

// Re-export AuthUser type from Amplify
export type AuthUser = AmplifyAuthUser;

// Authentication process steps
export enum AuthStep {
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
  ResetPassword,
}

// Authentication context type
export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  authStep: AuthStep;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  register: (email: string, password: string) => Promise<any>;
  confirmRegistration: (email: string, code: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  confirmForgotPassword: (
    email: string,
    code: string,
    newPassword: string,
  ) => Promise<any>;
  signInWithGoogle: () => Promise<void>;
  setAuthStep: (step: AuthStep) => void;
  error: string | null;
  tempEmail: string;
  setTempEmail: (email: string) => void;
}
