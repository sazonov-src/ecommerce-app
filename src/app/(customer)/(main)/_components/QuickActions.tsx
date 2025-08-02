import { Card } from "@/components/ui/card";
import Section from "./Section";

const QuickActions = () => (
  <Section>
    <div className="grid grid-cols-2 gap-3">
      <Card className="rounded-2xl border-0 bg-linear-to-br from-blue-500 to-blue-600 p-4 text-white transition-all duration-300 hover:shadow-lg">
        <div className="text-center">
          <div className="mb-2 text-2xl">🚚</div>
          <h4 className="mb-1 text-sm font-semibold">Безкоштовна доставка</h4>
          <p className="text-xs text-blue-100">При замовленні від 300 ₴</p>
        </div>
      </Card>
      <Card className="rounded-2xl border-0 bg-linear-to-br from-green-500 to-green-600 p-4 text-white transition-all duration-300 hover:shadow-lg">
        <div className="text-center">
          <div className="mb-2 text-2xl">⚡</div>
          <h4 className="mb-1 text-sm font-semibold">Швидке приготування</h4>
          <p className="text-xs text-green-100">Готуємо за 15-30 хв</p>
        </div>
      </Card>
    </div>
  </Section>
);

export default QuickActions;
