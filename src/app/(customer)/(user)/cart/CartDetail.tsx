import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  subtotal?: number;
  deliveryFee?: number;
  total: number;
}

const CartDetail = ({ subtotal, deliveryFee, total }: Props) => (
  <Card className="mt-6 border-0 bg-white shadow-xs">
    <CardContent className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Деталі замовлення</h3>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Вартість страв</span>
          <span>{subtotal} ₴</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Доставка</span>
          <span>{deliveryFee} ₴</span>
        </div>
        <div className="my-2 flex justify-between border-t border-gray-200 pt-2 font-bold">
          <span>Разом</span>
          <span>{total} ₴</span>
        </div>
      </div>
      <Link href="/checkout">
        <Button className="mt-2 w-full">Оформити замовлення</Button>
      </Link>
    </CardContent>
  </Card>
);

export default CartDetail;
