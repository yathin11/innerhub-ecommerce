import { createContext, ReactNode, useEffect, useState } from "react";

type ProductType = {
  _id: string;
  name: string;
  image?: string;
  price: number;
};

type CartItemType = {
  productId: ProductType;
  quantity: number;
};

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) return [];

    try {
      return JSON.parse(savedCart) as CartItemType[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItemType): void => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.productId._id === item.productId._id
      );

      if (!existingItem) {
        return [...prev, item];
      }

      return prev.map((cartItem) =>
        cartItem.productId._id === item.productId._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          : cartItem
      );
    });
  };

  const removeFromCart = (id: string): void => {
    setCart((prev) => prev.filter((item) => item.productId._id !== id));
  };

  const clearCart = (): void => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};