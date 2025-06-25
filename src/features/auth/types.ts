import { type AuthUser as AmplifyAuthUser } from "aws-amplify/auth";

// Повторно експортуємо тип AuthUser з Amplify
export type AuthUser = AmplifyAuthUser;

// Кроки процесу аутентифікації
export enum AuthStep {
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
  ResetPassword,
}

// Тип контексту аутентифікації
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
