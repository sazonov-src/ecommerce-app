"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const pathTitles: Record<string, string> = {
  "/": "Home",
  "/cart": "Cart",
  "/checkout": "Checkout",
  "/orders": "My Orders",
};

const NavigateHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const title = pathTitles[pathname] || "Back";

  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default NavigateHeader;
