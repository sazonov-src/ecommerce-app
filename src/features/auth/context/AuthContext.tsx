"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
  confirmResetPassword,
  resetPassword,
  confirmSignUp,
  signUp,
  signInWithRedirect,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { type AuthContextType, AuthStep, type AuthUser } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.SignIn);
  const [tempEmail, setTempEmail] = useState<string>("");

  useEffect(() => {
    checkAuthState();
    // Підписуємось на події автентифікації через Hub
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          console.log("Успішна автентифікація через Google");
          checkAuthState();
          break;
        case "signedIn":
          console.log("Успішна автентифікація");
          checkAuthState();
          break;
        case "signInWithRedirect_failure":
          console.error("Помилка автентифікації через Google", payload.message);
          setError(payload.message || "Помилка входу через Google");
          checkAuthState();
          break;
        case "signedOut":
          // set timeout to avoid state update after component unmount
          setTimeout(() => {
            checkAuthState();
          }, 2000);
          console.log("Вихід з системи");
          break;
        case "tokenRefresh":
          console.log("Оновлення токена");
          checkAuthState();
          break;
        case "tokenRefresh_failure":
          console.error("Помилка оновлення токена");
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
          checkAuthState();
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      console.log("Поточний користувач:", currentUser);
      setUser(currentUser);
      console.log("SetUser:", user);
      setIsAuthenticated(true);
      const session = await fetchAuthSession();
      console.log("Поточна сесія:", session);
      const groups =
        (session.tokens?.accessToken.payload["cognito:groups"] as string[]) ||
        [];
      setIsAdmin(groups.includes("Admin"));
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await signIn({ username: email, password });

      if (result.nextStep.signInStep === "CONFIRM_SIGN_UP") {
        setTempEmail(email);
        setAuthStep(AuthStep.ConfirmSignUp);
        setIsLoading(false);
        return result;
      }
      return result;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка входу в систему");
      throw err;
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithRedirect({ provider: "Google" });
      // Перевірка стану авторизації буде виконана через Hub listener
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка входу через Google");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка виходу з системи");
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      setTempEmail(email);
      setAuthStep(AuthStep.ConfirmSignUp);
      return result;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка реєстрації");
      throw err;
    }
  };

  const handleConfirmRegistration = async (email: string, code: string) => {
    try {
      setError(null);
      const result = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      setAuthStep(AuthStep.SignIn);
      return result;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка підтвердження реєстрації");
      throw err;
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setError(null);
      const result = await resetPassword({ username: email });
      setTempEmail(email);
      setAuthStep(AuthStep.ResetPassword);
      return result;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка відновлення паролю");
      throw err;
    }
  };

  const handleConfirmForgotPassword = async (
    email: string,
    code: string,
    newPassword: string,
  ) => {
    try {
      setError(null);
      const result = await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
      setAuthStep(AuthStep.SignIn);
      return result;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Помилка підтвердження нового паролю");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        authStep,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signInWithGoogle: handleSignInWithGoogle,
        register: handleRegister,
        confirmRegistration: handleConfirmRegistration,
        forgotPassword: handleForgotPassword,
        confirmForgotPassword: handleConfirmForgotPassword,
        setAuthStep,
        error,
        tempEmail,
        setTempEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthStep };
