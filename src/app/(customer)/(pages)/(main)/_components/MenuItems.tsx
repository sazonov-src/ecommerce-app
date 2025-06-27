"use client";

import { Button } from "@/components/ui/button";
import MenuItemMiniCard from "@/widgets/MenuItemMiniCard";
import Section from "@/components/Section";
import { useState } from "react";

interface Props {
  menuItems: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: string;
  }[]
  categories: {
    id: string;
    name: string;
  }[]
}

const MenuItems = ({ menuItems, categories }: Props) => {

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const filteredItems = selectedCategoryId
    ? menuItems.filter((item) => item?.categoryId === selectedCategoryId)
    : menuItems;

  return (
    <>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide py-2">
          <Button
            variant={!selectedCategoryId ? "default" : "outline"}
            className="shrink-0 rounded-xl h-12 px-4"
            onClick={() => {
              setSelectedCategoryId(undefined);
            }}
          >
            Рекомендовані
          </Button>
          {categories
            .filter((category) => category !== null)
            .map((category) => (
              <Button
                key={category.id}
                variant={
                  category?.id === selectedCategoryId ? "default" : "outline"
                }
                className="shrink-0 rounded-xl h-12 px-4"
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
        headerTitle="Рекомендовані"
        headerContent={
          <Button variant="ghost" size="sm">
            Переглянути все
          </Button>
        }
      >
        <div className="space-y-4">
          {filteredItems.filter(Boolean).map((item) => (
            <div key={`${item.id || 'recommended'}-${item.id}`}>
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
