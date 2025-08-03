"use client";

import { Button } from "@/components/ui/button";
import MenuItemMiniCard from "@/widgets/MenuItemMiniCard";
import Section from "./Section";
import { useState } from "react";

interface Props {
  menuItems: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
}

const MenuItems = ({ menuItems, categories }: Props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const filteredItems = selectedCategoryId
    ? menuItems.filter((item) => item?.categoryId === selectedCategoryId)
    : menuItems;

  return (
    <>
      <div className="scrollbar-hide flex space-x-3 overflow-x-auto py-2">
        <Button
          variant={!selectedCategoryId ? "default" : "outline"}
          className="h-12 shrink-0 rounded-xl px-4"
          onClick={() => {
            setSelectedCategoryId(undefined);
          }}
        >
          Recommended
        </Button>
        {categories
          .filter((category) => category !== null)
          .map((category) => (
            <Button
              key={category.id}
              variant={
                category?.id === selectedCategoryId ? "default" : "outline"
              }
              className="h-12 shrink-0 rounded-xl px-4"
              onClick={() => {
                setSelectedCategoryId(category.id);
              }}
            >
              {category.name}
            </Button>
          ))}
      </div>
      {/* Контент секції */}
      <Section
        headerTitle="Recommended"
        headerContent={
          <Button variant="ghost" size="sm">
            View All
          </Button>
        }
      >
        <div className="space-y-4">
          {filteredItems.filter(Boolean).map((item) => (
            <div key={`${item.id || "recommended"}-${item.id}`}>
              <MenuItemMiniCard
                key={item.id}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                originalPrice={item.price}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default MenuItems;
