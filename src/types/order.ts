export type OrderStatus =
  | "pending" // очікує підтвердження
  | "preparing" // готується
  | "ready" // готово до видачі
  | "completed" // виконано
  | "cancelled"; // скасовано

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
