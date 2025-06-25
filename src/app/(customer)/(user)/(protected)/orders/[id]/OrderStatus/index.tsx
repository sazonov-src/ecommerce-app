import {
  PendingStatusUI,
  PreparingStatusUI,
  ReadyStatusUI,
  CompletedStatusUI,
} from "./status-views";

import { useOrderStatus } from "./useOrderStatus";

interface OrderStatusProps {
  orderId: string;
}

const OrderStatus = ({ orderId }: OrderStatusProps) => {
  const { orderStatus, timeRemaining } = useOrderStatus();
  switch (orderStatus) {
    case "pending":
      return <PendingStatusUI orderId={orderId} />;
    case "preparing":
      return (
        <PreparingStatusUI orderId={orderId} timeRemaining={timeRemaining} />
      );
    case "ready":
      return <ReadyStatusUI orderId={orderId} />;
    case "completed":
      return <CompletedStatusUI orderId={orderId} />;
    default:
      return null;
  }
};

export default OrderStatus;
