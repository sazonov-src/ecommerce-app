import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";
import { type OrderStatus as Status, type OrderModel } from "@/../amplify/types";

const client = generateClient<Schema>();

export const useActiveOrders = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    const sub = client.models.Order.observeQuery({
      filter: { status: { ne: "COMPLETED" } },
      selectionSet: ["id", "status", "createdAt", "updatedAt", "totalPrice"],
    }).subscribe({
      next: ({ items }) => {
        console.log("items observeQuery", items);
        setOrders(
          items.map((item) => ({
            updatedAt: item.updatedAt,
            createdAt: item.createdAt,
            id: item.id,
            status: item.status as Status,
            totalPrice: item.totalPrice,
          })),
        );
      },
      error: (err) => console.error("observeQuery error", err),
      complete: () => console.log("observeQuery complete"),
    });
    return () => sub.unsubscribe();
  }, []);

  return {
    orders,
  };
};
