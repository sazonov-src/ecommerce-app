import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const Hero = () => (
  <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-400 to-red-500 p-6 text-white">
    <div className="z-10">
      <h2 className="mb-2 text-2xl font-bold">Швидка доставка</h2>
      <p className="mb-4 text-orange-100">Замовляй улюблену їжу прямо зараз</p>
      <Button className="bg-white font-semibold text-orange-500 hover:bg-orange-50">
        <Clock className="mr-2 h-4 w-4" />
        Замовити зараз
      </Button>
    </div>
    <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-white/10"></div>
    <div className="absolute -right-2 -bottom-2 h-20 w-20 rounded-full bg-white/5"></div>
  </div>
);

export default Hero;
