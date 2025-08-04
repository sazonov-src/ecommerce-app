import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import type { OrderStatus } from "@/../amplify/types";
import StatusStepper from "./Stepper";

interface Props {
  icon: LucideIcon;
  label: string;
  description: string;
  iconColor: string;
  badgeVariant: "default" | "secondary";
  orderId: string;
  children?: ReactNode;
  step: OrderStatus;
}

export const BaseLayout = ({
  icon: Icon,
  label,
  description,
  iconColor,
  badgeVariant,
  orderId,
  children,
  step,
}: Props) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-3 bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{label}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Badge variant={badgeVariant}>#{orderId}</Badge>
    </div>
    {children}
    <StatusStepper status={step} />
  </div>
);
