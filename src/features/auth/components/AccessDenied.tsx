import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type AccessDeniedProps = {
  title?: string;
  description?: string;
  redirectPath?: string;
  redirectText?: string;
};

export const AccessDenied = ({
  title = "Доступ заборонено",
  description = "У вас немає прав для доступу до цієї сторінки.",
  redirectPath = "/",
  redirectText = "Повернутися на головну",
}: AccessDeniedProps) => {
  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <Button asChild className="w-full">
        <Link href={redirectPath}>{redirectText}</Link>
      </Button>
    </div>
  );
};
