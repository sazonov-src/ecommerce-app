import Hero from "./_components/Hero";
import QuickActions from "./_components/QuickActions";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MenuItems from "./_components/MenuItems";

export default async function Home() {
  return (
    <div className="space-y-6">
      <Section>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Пошук страв та напоїв..."
            className="h-12 rounded-xl pl-10"
          />
        </div>
      </Section>
      <Hero />
      <MenuItems />
      <QuickActions />
    </div>
  );
}
