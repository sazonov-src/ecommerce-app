import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  link?: string;
  children?: React.ReactNode;
}

const NavigateHeader = ({ title, link, children }: Props) => (
  <header className="sticky top-0 z-50 bg-white shadow-xs">
    <div className="flex items-center gap-2 px-4 py-4">
      <Link href={link || ".."}>
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-xl font-bold">{title}</h1>
      {children}
    </div>
  </header>
);

export default NavigateHeader;
