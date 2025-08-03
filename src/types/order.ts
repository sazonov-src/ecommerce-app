export type OrderStatus =
  | "pending" // pending confirmation
  | "preparing" // preparing
  | "ready" // ready for pickup
  | "completed" // completed
  | "cancelled"; // cancelled

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
