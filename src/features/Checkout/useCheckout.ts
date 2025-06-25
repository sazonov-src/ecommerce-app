import { useState } from "react";
import { useCartStore } from "./useCartStore";
import type { Schema } from "@/../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>();
  const { items, clearCart } = useCartStore();

  const handleCheckout = async (paymentMethod: string) => {
    try {
      setLoading(true);
      const values = Object.values(items);
      console.log("values", values);
      const payload = {
        menuItems: values,
        paymentMethod,
      };
      const { data, errors } = await client.models.Checkout.create({
        payload: JSON.stringify(payload),
      });
      if (data) {
        setCheckoutId(data.id);
        clearCart();
      }
      if (errors) {
        console.error("Error creating checkout:", errors);
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    checkoutId,
    loading,
    handleCheckout,
  };
};

export default useCheckout;
