import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/features/Checkout";

interface Props {
  item: CartItem;
  increase: (id: CartItem) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
}

const CartItemComponent = ({ item, increase, decrease, remove }: Props) => (
  <Card className="shadow-xs p-0">
    <CardContent className="p-3">
      <div className="flex gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={() => remove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1 font-semibold text-orange-500">{item.price} ₴</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center rounded-lg border border-gray-200">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900"
                onClick={() => decrease(item.id)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900"
                onClick={() => increase(item)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="font-bold">{item.price * item.quantity} ₴</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CartItemComponent;
