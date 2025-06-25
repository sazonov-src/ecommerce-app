import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
};

type CartItems = Record<string, CartItem>;

type CartStore = {
  items: CartItems;
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity" | "total">) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: {},
      totalQuantity: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get();
        const existing = items[item.id];

        const updatedItem: CartItem = existing
          ? {
              ...existing,
              quantity: existing.quantity + 1,
              total: (existing.quantity + 1) * existing.price,
            }
          : {
              ...item,
              quantity: 1,
              total: item.price,
            };

        const updatedItems = {
          ...items,
          [item.id]: updatedItem,
        };

        const totalQuantity = Object.values(updatedItems).reduce(
          (sum, i) => sum + i.quantity,
          0,
        );
        const totalPrice = Object.values(updatedItems).reduce(
          (sum, i) => sum + i.total,
          0,
        );

        set({ items: updatedItems, totalQuantity, totalPrice });
      },

      decreaseItem: (id) => {
        const { items } = get();
        const existing = items[id];
        if (!existing) return;

        if (existing.quantity === 1) {
          const { [id]: _, ...rest } = items;
          const totalQuantity = Object.values(rest).reduce(
            (sum, i) => sum + i.quantity,
            0,
          );
          const totalPrice = Object.values(rest).reduce(
            (sum, i) => sum + i.total,
            0,
          );
          set({ items: rest, totalQuantity, totalPrice });
        } else {
          const updatedItem = {
            ...existing,
            quantity: existing.quantity - 1,
            total: (existing.quantity - 1) * existing.price,
          };
          const updatedItems = {
            ...items,
            [id]: updatedItem,
          };
          const totalQuantity = Object.values(updatedItems).reduce(
            (sum, i) => sum + i.quantity,
            0,
          );
          const totalPrice = Object.values(updatedItems).reduce(
            (sum, i) => sum + i.total,
            0,
          );
          set({ items: updatedItems, totalQuantity, totalPrice });
        }
      },

      removeItem: (id) => {
        const { items } = get();
        const { [id]: removed, ...rest } = items;

        const totalQuantity = Object.values(rest).reduce(
          (sum, i) => sum + i.quantity,
          0,
        );
        const totalPrice = Object.values(rest).reduce(
          (sum, i) => sum + i.total,
          0,
        );

        set({ items: rest, totalQuantity, totalPrice });
      },

      clearCart: () => {
        set({ items: {}, totalQuantity: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
