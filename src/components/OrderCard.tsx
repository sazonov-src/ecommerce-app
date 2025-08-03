import { type Order } from "../types/order";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

const statusColors = {
  pending: "bg-yellow-500",
  preparing: "bg-blue-500",
  ready: "bg-green-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500",
};

const statusLabels = {
  pending: "Pending",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order #{order.id}</CardTitle>
          <Badge className={statusColors[order.status]}>
            {statusLabels[order.status]}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm")}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="font-medium">{order.customerName}</div>
          <div className="space-y-1">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>{item.price * item.quantity}₴</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Total:</span>
            <span>{order.totalAmount}₴</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {order.status === "pending" && (
          <Button
            onClick={() => onStatusChange(order.id, "preparing")}
            className="flex-1"
          >
            Accept Order
          </Button>
        )}
        {order.status === "preparing" && (
          <Button
            onClick={() => onStatusChange(order.id, "ready")}
            className="flex-1"
          >
            Mark as Ready
          </Button>
        )}
        {order.status === "ready" && (
          <Button
            onClick={() => onStatusChange(order.id, "completed")}
            className="flex-1"
          >
            Mark as Completed
          </Button>
        )}
        {["pending", "preparing"].includes(order.status) && (
          <Button
            onClick={() => onStatusChange(order.id, "cancelled")}
            variant="destructive"
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
