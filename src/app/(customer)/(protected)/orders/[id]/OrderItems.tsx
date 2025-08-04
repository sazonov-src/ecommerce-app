import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceWithCurrency } from "@/lib/utils";

const client = generateClient<Schema>();

interface OrderItem {
  id: string;
  title: string | null;
  quantity: number | null;
  totalPrice: number | null;
}

const OrderItems = ({ orderId }: { orderId: string }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  if (!items.length) {
    console.log("orderId", { orderId });
    client.models.Order.get({ id: orderId }, { selectionSet: ["menuItems.*"] })
      .then(({ data }) => {
        console.log("data", { data });
        if (!data?.menuItems.length) return;
        setItems(
          data.menuItems.map((item) => {
            return {
              id: item.id,
              title: item.menuItem?.title ?? null,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
            };
          }),
        );
      })
      .catch(console.error);
  }

  if (!items.length) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <span className="font-medium">{item.title}</span>
            <span className="ml-2 text-gray-500">x{item.quantity}</span>
          </div>
          <span className="font-semibold">{formatPriceWithCurrency(item.totalPrice || 0)}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
