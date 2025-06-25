interface Input {
  menuItems: {
    menuItem: {
      price: number;
    };
    quantity: number;
  }[];
}

interface Output {
  menuItems: {
    menuItem: {
      price: number;
    };
    quantity: number;
    totalPrice: number;
  }[];
  totalQuantity: number;
  totalPrice: number;
}

export const getCart = (input: Input): Output => {
  const menuItems = input.menuItems.map((item) => ({
    ...item,
    totalPrice: item.menuItem.price * item.quantity,
  }));
  const totalQuantity = menuItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = menuItems.reduce((sum, i) => sum + i.totalPrice, 0);
  return {
    menuItems,
    totalQuantity,
    totalPrice,
  };
};
