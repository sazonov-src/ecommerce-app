"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutCard } from "@/components/LayoutCard";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Plus, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/Checkout";
import useCheckout from "@/features/Checkout/useCheckout";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPriceWithCurrency } from "@/lib/utils";

const Checkout = () => {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { items, totalPrice } = useCartStore();
  const { loading, checkoutId, handleCheckout } = useCheckout();

  React.useEffect(() => {
    if (!totalPrice) {
      console.log("items", totalPrice);
      router.replace("/");
    }
    if (checkoutId) {
      router.push(`/orders/${checkoutId}`);
    }
  }, [checkoutId, router, items]);

  // User's saved cards
  const savedCards = [
    {
      id: "card1",
      last4: "4532",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 26,
      holderName: "John Peterson",
    },
    {
      id: "card2",
      last4: "5678",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 25,
      holderName: "John Peterson",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast("Select a card", {
        description: "Please select a card for payment",
      });
      return;
    }
    handleCheckout(selectedCard);
    if (!checkoutId) {
      return;
    }
    toast("Order confirmed!", {
      description:
        "Thank you for your order. Redirecting to tracking page...",
    });
    setTimeout(() => {
      router.push("/order-details");
    }, 2000);
  };

  if (!totalPrice) {
    return (
      <LayoutCard
        title=<Skeleton className="h-6 w-40" />
        description=<Skeleton className="h-4 w-60" />
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-6" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}

        <div className="bg-muted my-2 h-px" />

        <div className="flex justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="bg-muted my-2 h-px" />

        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
        </div>
      </LayoutCard>
    );
  }

  return (
    <>
      {/* Order Summary */}
      <LayoutCard
        title="Your Order"
        description="Review your order details"
      >
        <div className="space-y-3">
          {Object.values(items).map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-gray-500">x{item.quantity}</span>
              </div>
              <span>{formatPriceWithCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-gray-600">Food Cost</span>
            <span>{formatPriceWithCurrency(totalPrice)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total to Pay</span>
            <span>{formatPriceWithCurrency(totalPrice)}</span>
          </div>
        </div>
      </LayoutCard>

      {/* Payment Details */}
      <LayoutCard
        title="Payment Information"
        description="Select a saved card for payment"
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

            {/* Add New Card */}
            <div className="cursor-pointer rounded-lg border border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400">
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Plus className="h-4 w-4" />
                <span>Add New Card</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end px-0 pt-4">
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={!selectedCard || loading}
            >
              Pay {formatPriceWithCurrency(totalPrice)}
            </Button>
          </div>
        </form>
      </LayoutCard>
    </>
  );
};

export default Checkout;
