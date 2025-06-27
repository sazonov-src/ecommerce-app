import { reqResClient, runWithAmplifyServerContext } from "@/utils/amplify-utils";
import MenuItems from "./_components/MenuItems";
import type { AmplifyServer } from "aws-amplify/adapter-core";
import { unstable_cache } from "next/cache";

async function fetchMenuItems(contextSpec: AmplifyServer.ContextSpec) {
  const { data: menuItems } = await reqResClient.models.MenuItem.list(
    { token: contextSpec.token },
    { selectionSet: ["id", "name", "price", "imageUrl", "categoryId"] },
  );

  const { data: categories } = await reqResClient.models.Category.list(
    { token: contextSpec.token },
    { selectionSet: ["id", "name"] }
  );
  if (!menuItems.length || !categories.length) throw new Error("Menu items not found");
  return { menuItems, categories };
}

export const revalidate = 10;

export default async function Page() {
  const getCachedUser = unstable_cache(
    async () => {
      const data = await runWithAmplifyServerContext({
        nextServerContext: null,
        operation: (contextSpec) =>
          fetchMenuItems(contextSpec),
      });
      return data;
    }, [], {revalidate: 10},
  )

  const data = await getCachedUser();

  return (
    <MenuItems 
      menuItems={data.menuItems} 
      categories={data.categories} />
  );
};
