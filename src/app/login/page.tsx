"use client";
import { AuthForm, useAuth } from "@/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirect || "/");
    }
  }, [isAuthenticated, router, redirect]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default Login;
