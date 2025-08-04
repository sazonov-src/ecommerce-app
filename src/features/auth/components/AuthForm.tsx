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
      setFormError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address");
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
      setFormError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
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
      setFormError("Please fill in all fields");
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
      setFormError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setFormError("Please enter a valid email address");
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
      setFormError("Please fill in all fields");
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
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Login"}
      </Button>

      <div className="flex justify-between pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.ForgotPassword)}
          className="h-auto p-0"
        >
          Forgot password?
        </Button>
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignUp)}
          className="h-auto p-0"
        >
          Register
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
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Register"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Already have an account?
        </Button>
      </div>
    </form>
  );

  const renderConfirmSignUpForm = () => (
    <form onSubmit={handleConfirmSignUp} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Confirmation code has been sent to your email
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={tempEmail || email}
          onChange={(e) => setTempEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting || !!tempEmail}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmationCode">Confirmation Code</Label>
        <Input
          id="confirmationCode"
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter confirmation code"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Confirm Registration"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Back to login
        </Button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Enter your email address to recover your password
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Send Code"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Back to login
        </Button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div>
        <p className="mb-4 text-sm">
          Enter confirmation code and new password
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={tempEmail} disabled={true} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmationCode">Confirmation Code</Label>
        <Input
          id="confirmationCode"
          type="text"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          placeholder="Enter confirmation code"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Reset Password"}
      </Button>

      <div className="flex justify-center pt-2 text-sm">
        <Button
          variant="link"
          type="button"
          onClick={() => setAuthStep(AuthStep.SignIn)}
          className="h-auto p-0"
        >
          Back to login
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
        return "Registration";
      case AuthStep.ConfirmSignUp:
        return "Confirm Registration";
      case AuthStep.ForgotPassword:
        return "Forgot Password";
      case AuthStep.ResetPassword:
        return "Reset Password";
      case AuthStep.SignIn:
      default:
        return "Login";
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
        © 2025 FastFood Mobile Eats. All rights reserved.
      </CardFooter>
    </Card>
  );
};
