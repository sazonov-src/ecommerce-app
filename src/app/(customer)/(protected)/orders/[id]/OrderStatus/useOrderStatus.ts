import { useEffect, useState } from "react";
import { toast } from "sonner";

export type OrderStatusType = "pending" | "preparing" | "ready" | "completed";

export const useOrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState<OrderStatusType>("pending");
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // 15 min in seconds

  // Status change emulation
  useEffect(() => {
    const prepareTimer = setTimeout(() => {
      setOrderStatus("preparing");
      toast("Order is being prepared!", {
        description: "The chef has started preparing your order.",
      });
    }, 5000);

    const readyTimer = setTimeout(() => {
      setOrderStatus("ready");
      toast("Order is ready!", {
        description: "Your order is ready for pickup.",
      });
    }, 20000);

    const completedTimer = setTimeout(() => {
      setOrderStatus("completed");
      toast("Order completed!", {
        description: "Thank you for your order!",
      });
    }, 35000);

    return () => {
      clearTimeout(prepareTimer);
      clearTimeout(readyTimer);
      clearTimeout(completedTimer);
    };
  }, [toast]);

  // Countdown
  useEffect(() => {
    if (orderStatus === "preparing") {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [orderStatus]);

  return {
    orderStatus,
    timeRemaining,
  };
};
