"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  id?: string;
  label: string;
  isSelected?: boolean;
}

export default function CategoryButton({ id, label, isSelected }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("categoryId", id);
    } else {
      params.delete("categoryId");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className="h-12 shrink-0 rounded-xl px-4"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
