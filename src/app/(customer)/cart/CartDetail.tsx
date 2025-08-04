import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPriceWithCurrency } from "@/lib/utils";

const CartDetail = ({ total }: { total: number }) => (
  <Card>
    <CardContent className="space-y-4">
      <h3 className="text-lg font-semibold">Order Details</h3>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{formatPriceWithCurrency(total)}</span>
      </div>
      <Link href="/checkout">
        <Button className="mt-2 w-full">Place Order</Button>
      </Link>
    </CardContent>
  </Card>
);

export default CartDetail;
