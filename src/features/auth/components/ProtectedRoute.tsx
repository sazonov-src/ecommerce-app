"use client";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
  children: ReactNode;
  admin?: ReactNode;
};

export const ProtectedRoute = ({
  children,
  admin = null,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Якщо передано admin і користувач є адміністратором, то показуємо admin контент
  if (admin && isAdmin) {
    return <>{admin}</>;
  }

  // В іншому випадку показуємо звичайний контент
  return <>{children}</>;
};
