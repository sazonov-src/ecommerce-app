"use client";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

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
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push(`/login?redirect=${pathname}`);
    return null;
  }

  // If admin is passed and user is administrator, show admin content
  if (admin && isAdmin) {
    return <>{admin}</>;
  }

  // Otherwise show regular content
  return <>{children}</>;
};
