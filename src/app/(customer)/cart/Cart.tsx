"use client";

import CartItemComponent from "./CartItem";
import CartDetail from "./CartDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/Checkout";

const Cart = () => {
  const {
    items,
    addItem,
    removeItem,
    totalQuantity,
    totalPrice,
    decreaseItem,
  } = useCartStore();

  return totalQuantity > 0 ? (
    <>
      <ScrollArea className="shrank max-h-[55vh]">
        <div className="space-y-3">
          {Object.values(items).map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              increase={addItem}
              decrease={decreaseItem}
              remove={removeItem}
            />
          ))}
        </div>
      </ScrollArea>
      <CartDetail total={totalPrice} />
    </>
  ) : (
    <div className="flex h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-6">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="mb-2 text-xl font-bold">Ваш кошик порожній</h2>
      <p className="mb-6 text-gray-500">
        Додайте товари з меню, щоб зробити замовлення
      </p>
      <Link href="/">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Повернутися до меню
        </Button>
      </Link>
    </div>
  );
};

export default Cart;
