import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartDetail = ({ total }: { total: number }) => (
  <Card className="mt-6">
    <CardContent className="space-y-4">
      <h3 className="text-lg font-semibold">Деталі замовлення</h3>
      <div className="flex justify-between font-bold">
        <span>Разом</span>
        <span>{total} ₴</span>
      </div>
      <Link href="/checkout">
        <Button className="mt-2 w-full">Оформити замовлення</Button>
      </Link>
    </CardContent>
  </Card>
);

export default CartDetail;
