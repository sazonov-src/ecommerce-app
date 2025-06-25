"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import MenuItemMiniCard from "@/widgets/MenuItemMiniCard";
import Section from "@/components/Section";
import useMenu from "./useMenu";

const CategorySkeleton = () => (
  <div className="scrollbar-hide flex space-x-3 overflow-x-auto py-2">
    {[...Array(4)].map((_, index) => (
      <Skeleton key={index} className="h-12 w-28 shrink-0 rounded-xl" />
    ))}
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const MenuItems = () => {
  const {
    setInitial,
    menuItems,
    selectCategory,
    selectedCategory,
    categories,
    loading,
  } = useMenu();

  return (
    <>
      {/* Кнопки категорій */}
      {categories.length === 0 ? (
        <CategorySkeleton />
      ) : (
        <div className="scrollbar-hide flex space-x-3 overflow-x-auto py-2">
          <Button
            variant={!selectedCategory ? "default" : "ghost"}
            className="h-12 shrink-0 rounded-xl px-4"
            onClick={() => {
              if (!selectedCategory) return;
              setInitial();
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
                  selectedCategory?.id === category.id
                    ? "default"
                    : "ghost"
                }
                className="h-12 shrink-0 rounded-xl px-4"
                onClick={() => {
                  if (selectedCategory?.id === category.id) return;
                  selectCategory(category);
                }}
              >
                {category.name}
              </Button>
            ))}
        </div>
      )}

      {/* Контент секції */}
      <Section
        headerTitle={selectedCategory?.name || "Рекомендовані"}
        headerContent={
          <Button variant="ghost" size="sm">
            Переглянути все
          </Button>
        }
      >
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            {menuItems.filter(Boolean).map((item) => (
              <div key={`${selectedCategory?.id || "recommended"}-${item.id}`}>
                <MenuItemMiniCard menuItem={item} />
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
};

export default MenuItems;
