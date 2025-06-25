"use client";
import { useState } from "react";
import { useAuth, AuthStep } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AuthForm = () => {
  const {
    signIn,
    register,
    confirmRegistration,
    forgotPassword,
    confirmForgotPassword,
    signInWithGoogle,
    error,
    authStep,
    setAuthStep,
    tempEmail,
    setTempEmail,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password.trim()) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Будь ласка, введіть коректну електронну адресу");
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(email, password);
    } catch (err: any) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password.trim()) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Будь ласка, введіть коректну електронну адресу");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Паролі не співпадають");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(email, password);
    } catch (err: any) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!confirmationCode.trim()) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      setIsSubmitting(true);
      await confirmRegistration(tempEmail || email, confirmationCode);
    } catch (err: any) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Будь ласка, введіть коректну електронну адресу");
      return;
    }

    try {
      setIsSubmitting(true);
      await forgotPassword(email);
    } catch (err: any) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!confirmationCode.trim() || !newPassword.trim()) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      setIsSubmitting(true);
      await confirmForgotPassword(tempEmail, confirmationCode, newPassword);
    } catch (err: any) {
      // Error is already handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть ваш email"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть ваш пароль"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Увійти"}
      </Button>

      <div className="relative mt-4 mb-4 flex items-center justify-center">
        <div className="absolute w-full border-t border-gray-300"></div>
        <span className="dark:bg-background text-muted-foreground z-10 bg-white px-2 text-sm">
          Або продовжити з
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          signInWithGoogle();
          setIsSubmitting(true);
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        ) : (
          <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" aria-hidden="true">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
        )}
        Увійти через Google
      </Button>

      <div className="flex justify-between pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.ForgotPassword)}
          className="h-auto p-0"
        >
          Забули пароль?
        </Button>
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignUp)}
          className="h-auto p-0"
        >
          Зареєструватися
        </Button>
      </div>
    </form>
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть ваш email"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть ваш пароль"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторіть ваш пароль"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Зареєструватися"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Вже маєте обліковий запис?
        </Button>
      </div>
    </form>
  );

  const renderConfirmSignUpForm = () => (
    <form onSubmit={handleConfirmSignUp} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Код підтвердження надіслано на вашу електронну пошту
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={tempEmail || email}
          onChange={(e) => setTempEmail(e.target.value)}
          placeholder="Введіть ваш email"
          disabled={isSubmitting || !!tempEmail}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmationCode">Код підтвердження</Label>
        <Input
          id="confirmationCode"
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Введіть код підтвердження"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Підтвердити реєстрацію"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Повернутися до входу
        </Button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Введіть вашу електронну адресу для відновлення паролю
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть ваш email"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Надіслати код"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Повернутися до входу
        </Button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Введіть код підтвердження та новий пароль
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={tempEmail} disabled={true} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmationCode">Код підтвердження</Label>
        <Input
          id="confirmationCode"
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Введіть код підтвердження"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Новий пароль</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Введіть новий пароль"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Завантаження..." : "Скинути пароль"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Повернутися до входу
        </Button>
      </div>
    </form>
  );

  const renderFormByStep = () => {
    switch (authStep) {
      case AuthStep.SignUp:
        return renderSignUpForm();
      case AuthStep.ConfirmSignUp:
        return renderConfirmSignUpForm();
      case AuthStep.ForgotPassword:
        return renderForgotPasswordForm();
      case AuthStep.ResetPassword:
        return renderResetPasswordForm();
      case AuthStep.SignIn:
      default:
        return renderSignInForm();
    }
  };

  const getCardTitle = () => {
    switch (authStep) {
      case AuthStep.SignUp:
        return "Реєстрація";
      case AuthStep.ConfirmSignUp:
        return "Підтвердження реєстрації";
      case AuthStep.ForgotPassword:
        return "Забули пароль";
      case AuthStep.ResetPassword:
        return "Скидання паролю";
      case AuthStep.SignIn:
      default:
        return "Вхід";
    }
  };

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>FastFood Mobile Eats</CardTitle>
        <CardDescription>{getCardTitle()}</CardDescription>
      </CardHeader>
      <CardContent>
        {(error || formError) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError || error}</AlertDescription>
          </Alert>
        )}

        {renderFormByStep()}
      </CardContent>
      <CardFooter className="text-muted-foreground text-center text-sm">
        © 2025 FastFood Mobile Eats. Всі права захищені.
      </CardFooter>
    </Card>
  );
};
