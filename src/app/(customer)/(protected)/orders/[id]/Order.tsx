"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutCard } from "@/components/LayoutCard";
import OrderStatus from "./OrderStatus";
import { useActiveOrders } from "@/features/Orders/useActiveOrders";
import { Separator } from "@/components/ui/separator";
import OrderItems from "./OrderItems";
import { Skeleton } from "@/components/ui/skeleton";

export default function Order({ id }: { id: string }) {
  const { orders } = useActiveOrders();

  const order = orders.find((order) => order.id === id);

  return (
    <>
      <LayoutCard
        title="Order Status"
        description="Track the current status of your order"
      >
        {order ? (
          <OrderStatus orderId={order.id} />
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        )}
      </LayoutCard>

      <LayoutCard
        title="Order Details"
        description="Check the composition of your order"
      >
        {order ? (
          <div>
            <OrderItems orderId={order.id} />
            <Separator className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{order.totalPrice} ₴</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        )}
      </LayoutCard>

      <Link href="/" className="block">
        <Button className="w-full">Back to Home</Button>
      </Link>
    </>
  );
}
