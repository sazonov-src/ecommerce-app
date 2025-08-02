"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NavigateHeader = () => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">Кошик</h1>
    </div>
  );
};

export default NavigateHeader;
