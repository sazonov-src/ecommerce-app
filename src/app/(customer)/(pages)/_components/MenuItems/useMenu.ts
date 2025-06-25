import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>({ authMode: "apiKey" });

const useMenu = () => {
  const [categories, setCategories] = useState<Schema["Category"]["type"][]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] =
    useState<Schema["Category"]["type"]>();
  const [allMenuItems, setAllMenuItems] = useState<
    Schema["MenuItem"]["type"][]
  >([]);
  const [menuItems, setMenuItems] = useState<Schema["MenuItem"]["type"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const [categoryRes, menuItemRes] = await Promise.all([
          client.models.Category.list(),
          client.models.MenuItem.list(),
        ]);
        console.log("Categories:", categoryRes, menuItemRes);
        setCategories(categoryRes.data);
        setAllMenuItems(menuItemRes.data);
        setMenuItems(menuItemRes.data);
      } catch (error) {
        console.error("Error loading menu:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const selectCategory = (category: Schema["Category"]["type"]) => {
    setSelectedCategory(category);
    const filtered = allMenuItems.filter(
      (item) => item.categoryId === category.id,
    );
    setMenuItems(filtered);
  };

  const setInitial = () => {
    setSelectedCategory(undefined);
    setMenuItems(allMenuItems);
  };

  return {
    setInitial,
    selectedCategory,
    selectCategory,
    categories,
    menuItems,
    loading,
  };
};

export default useMenu;
