import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type CustomerCardSectionProps = {
  title: React.ReactNode | string;
  children: React.ReactNode;
  description?: React.ReactNode | string;
  footer?: React.ReactNode;
};

export function LayoutCard({
  title,
  description,
  children,
  footer,
}: CustomerCardSectionProps) {
  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-col gap-4">{footer}</CardFooter>
      )}
    </Card>
  );
}
