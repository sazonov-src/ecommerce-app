"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Clock } from "lucide-react";
import { useCartStore } from "@/features/Checkout";

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  rating?: number;
  time?: string;
}
const MenuItemMiniCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  discount,
  isNew,
  isFavorite,
  rating,
  time,
  originalPrice,
}) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: id,
      price: price,
      name: name,
      image: imageUrl,
    });
  };

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-32 rounded-l-xl object-cover"
            />
            {discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 px-2 py-1 text-xs text-white">
                -{discount}%
              </Badge>
            )}
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-green-500 px-2 py-1 text-xs text-white">
                NEW
              </Badge>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <div className="mb-1 flex items-start justify-between">
                <h4 className="text-sm leading-tight font-semibold text-gray-900">
                  {name}
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mt-1 h-8 w-8 text-gray-400 hover:text-red-500"
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>

              <div className="mb-2 flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-600">
                    {rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-orange-500">{price} ₴</span>
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {originalPrice} ₴
                  </span>
                )}
              </div>
              <Button
                size="sm"
                className="h-8 rounded-xl px-3 text-xs font-semibold"
                onClick={handleAddToCart}
              >
                Додати
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemMiniCard;
