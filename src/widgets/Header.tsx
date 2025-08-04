"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/Checkout";
import { AuthWidget } from "@/features/auth/components/AuthWidget";

const Header = () => {
  const { totalQuantity: cartCount } = useCartStore();
  return (
    <div className="px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FastBite</h1>
            <p className="text-xs text-gray-500">Delivery in 30 min</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <AuthWidget />
        </div>
      </div>
    </div>
  );
};

export default Header;
