"use client";
import { AuthForm, useAuth } from "@/features/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    router.replace("/");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default Login;
