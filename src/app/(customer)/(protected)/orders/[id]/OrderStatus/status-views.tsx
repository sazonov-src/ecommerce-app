import { Clock, CheckCircle, Package, Utensils } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { BaseLayout } from "./BaseLayout";

const formatTimeRemaining = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const PendingStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={Clock}
    label="Нове замовлення"
    description="Очікує на обробку"
    color="bg-amber-500"
    iconColor="text-amber-600"
    badgeVariant="secondary"
    orderId={orderId}
    step="PENDING"
  />
);

export const PreparingStatusUI = ({
  orderId,
  timeRemaining,
}: {
  orderId: string;
  timeRemaining?: number;
}) => (
  <BaseLayout
    icon={Utensils}
    label="Готується"
    description="Замовлення готується на кухні"
    color="bg-blue-500"
    iconColor="text-blue-600"
    badgeVariant="default"
    orderId={orderId}
    step="PREPARING"
  >
    {timeRemaining && (
      <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          <span className="font-mono text-2xl font-bold text-orange-700">
            {formatTimeRemaining(timeRemaining)}
          </span>
        </div>
        <p className="mt-1 text-center text-sm text-orange-600">
          Орієнтовний час до готовності
        </p>
      </div>
    )}
  </BaseLayout>
);

export const ReadyStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={Package}
    label="Готово"
    description="Замовлення готове до видачі"
    color="bg-green-500"
    iconColor="text-green-600"
    badgeVariant="default"
    orderId={orderId}
    step="READY"
  >
    <Alert className="mt-4 animate-pulse border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">
        Ваше замовлення готове!
      </AlertTitle>
      <AlertDescription className="text-green-600">
        Покажіть номер замовлення при отриманні: <strong>#{orderId}</strong>
      </AlertDescription>
    </Alert>
  </BaseLayout>
);

export const CompletedStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={CheckCircle}
    label="Виконано"
    description="Замовлення отримане"
    color="bg-green-600"
    iconColor="text-green-600"
    badgeVariant="default"
    orderId={orderId}
    step="COMPLETED"
  >
    <Alert className="mt-4 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">Замовлення завершено!</AlertTitle>
      <AlertDescription className="text-green-600">
        Дякуємо за ваше замовлення!
      </AlertDescription>
    </Alert>
  </BaseLayout>
);
