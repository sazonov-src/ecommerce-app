import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavigateHeader = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Link href="/">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-xl font-bold">Оформлення замовлення</h1>
    </div>
  );
};

export default NavigateHeader;
