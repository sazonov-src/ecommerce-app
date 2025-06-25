import { useState } from "react";

export const useMenuLogic = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 1, name: "Бургери", emoji: "🍔", active: true },
    { id: 2, name: "Піца", emoji: "🍕", active: false },
    { id: 3, name: "Напої", emoji: "🥤", active: false },
    { id: 4, name: "Десерти", emoji: "🧁", active: false },
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Чізбургер Делюкс",
      price: 199,
      originalPrice: 249,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      time: "15-20 хв",
      rating: 4.8,
      discount: 20,
      isNew: false,
    },
    {
      id: 2,
      name: "Маргарита",
      price: 289,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
      time: "20-25 хв",
      rating: 4.9,
      discount: 0,
      isNew: true,
    },
    {
      id: 3,
      name: "Куряче філе",
      price: 159,
      originalPrice: 189,
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop",
      time: "10-15 хв",
      rating: 4.7,
      discount: 15,
      isNew: false,
    },
  ];

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return {
    cartCount,
    favorites,
    categories,
    featuredItems,
    toggleFavorite,
    addToCart,
  };
};
