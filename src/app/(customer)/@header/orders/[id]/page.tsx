import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigateHeader = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Button variant="ghost" size="icon">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">Замовлення</h1>
    </div>
  );
};

export default NavigateHeader;
