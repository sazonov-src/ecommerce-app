"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutCard } from "@/components/LayoutCard";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/Checkout";
import useCheckout from "@/features/Checkout/useCheckout";
import { toast } from "sonner"

const Checkout = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { items, totalPrice } = useCartStore();
  const { loading, checkoutId, handleCheckout } = useCheckout();

  React.useEffect(() => {
    if (checkoutId) {
      router.push(`/orders/${checkoutId}`);
    }
  }, [checkoutId, router]);

  // Збережені картки користувача
  const savedCards = [
    {
      id: "card1",
      last4: "4532",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 26,
      holderName: "Іван Петренко",
    },
    {
      id: "card2",
      last4: "5678",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 25,
      holderName: "Іван Петренко",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast( "Оберіть картку", {
        description: "Будь ласка, оберіть картку для оплати",
      });
      return;
    }
    handleCheckout(selectedCard);
    if (!checkoutId) {
      return;
    }
    toast( "Замовлення підтверджено!", {
      description:
        "Дякуємо за ваше замовлення. Перенаправляємо на сторінку відстеження...",
    });
    setTimeout(() => {
      router.push("/order-details");
    }, 2000);
  };

  return (
    <>
      {/* Order Summary */}
      <LayoutCard 
        title="Ваше замовлення"
        description="Перевірте деталі вашого замовлення"
      >
          <div className="space-y-3">
            {Object.values(items).map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-gray-500">x{item.quantity}</span>
                </div>
                <span>{item.price * item.quantity} ₴</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="text-gray-600">Вартість страв</span>
              <span>{totalPrice} ₴</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Всього до оплати</span>
              <span>{totalPrice} ₴</span>
            </div>
          </div>
      </LayoutCard>

      {/* Payment Details */}
      <LayoutCard 
        title="Платіжні дані"
        description="Оберіть збережену картку для оплати"
      >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedCard === card.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded border bg-white p-2">
                        <CreditCard className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {card.brand} •••• {card.last4}
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.holderName} •{" "}
                          {card.expiryMonth.toString().padStart(2, "0")}/
                          {card.expiryYear}
                        </div>
                      </div>
                    </div>
                    {selectedCard === card.id && (
                      <div className="rounded-full bg-orange-500 p-1">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Додати нову картку */}
              <div className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <Plus className="h-4 w-4" />
                  <span>Додати нову картку</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-0 pt-4">
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={!selectedCard || loading}
              >
                Оплатити {totalPrice} ₴
              </Button>
            </div>
          </form>
      </LayoutCard>
    </>
  );
};

export default Checkout;
