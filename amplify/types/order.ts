interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  owner?: string;
}

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export interface CheckoutModel extends BaseModel {
  payload: {
    menuItems: { id: string; quantity: number }[];
    paymentMethod: string;
  };
}

export interface OrderItemModel extends BaseModel {
  menuItem: {
    id: string;
    title: string;
    price: number;
  };
  orderId: string;
  quantity: number;
  totalPrice: number;
}

export interface OrderModel extends BaseModel {
  status: OrderStatus;
  paymentId?: string;
  totalPrice: number;
}
