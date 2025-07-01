"use client";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { useCartStore } from "@/features/Checkout";
import { useRouter } from "next/navigation";

export const AuthWidget = () => {
  const { user, signOut } = useAuth();
  const { clearCart } = useCartStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    clearCart();
    router.push("/");
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button variant="ghost" size="icon">
        <LogIn className="h-6 w-6" />
      </Button>
    </Link>
  );
};
