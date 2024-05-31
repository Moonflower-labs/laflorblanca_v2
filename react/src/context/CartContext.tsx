/* eslint-disable react-refresh/only-export-components */
// CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { CartProduct, ProductItem } from "../utils/definitions";
import { storage } from "../utils/storage";

type CartContext = {
  cartItems: CartProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (
    product: ProductItem,
    selectedPrice: { id: string; amount: number }
  ) => void;
  incrementItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  deleteItem: (id: string) => void;
};

const CartContext = createContext<CartContext | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>(storage.get("cart") || []);

  // Update the storage whenever cartItems change
  useEffect(() => {
    storage.set("cart", cartItems);
  }, [cartItems]);

  // Increment Item Quantity
  const incrementItemQuantity = (id: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Item Quantity or Remove from Cart
  const decreaseItemQuantity = (id: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            // Remove item from the cart when the quantity becomes 0
            return acc;
          } else {
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
        } else {
          return [...acc, item];
        }
      }, [] as CartProduct[])
    );
  };

  // Delete Item from the Cart
  const deleteItem = (id: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };
  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,

      addToCart: (
        product: ProductItem,
        selectedPrice: { id: string; amount: number }
      ) => {
        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.id === selectedPrice.id
        );

        if (existingCartItemIndex !== -1) {
          const updatedCart = cartItems.map((item, index) =>
            index === existingCartItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartItems(updatedCart);
          // storage.set("cart", updatedCart)
        } else {
          const cartItem = {
            id: selectedPrice.id,
            name: product.product.name,
            description: product.product.description,
            image: product.product.images[0],
            type: product.product.type,
            amount: selectedPrice.amount,
            quantity: 1,
          };
          setCartItems([...cartItems, cartItem]);
          // storage.set("cart", [...cartItems, cartItem])
        }
      },
      incrementItemQuantity,
      decreaseItemQuantity,
      deleteItem,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContext => {
  const context = useContext(CartContext);
  if (!context) throw Error("useCart should be used within <CartProvider />");
  return context;
};

//   const addToCart = (
//     product: ProducItem,
//     selectedPrice: { id: string; amount: number }
//   ) => {
//     console.log(selectedPrice);
//     const existingCartItemIndex = cartItems.findIndex(
//       (item) => item.id === selectedPrice.id
//     );

//     if (existingCartItemIndex !== -1) {
//       const updatedCart = cartItems.map((item, index) =>
//         index === existingCartItemIndex
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCartItems(updatedCart);
//     } else {
//       const cartItem = {
//         id: selectedPrice.id,
//         name: product.product.name,
//         description: product.product.description,
//         image: product.product.images[0],
//         type: product.product.type,
//         amount: selectedPrice.amount,
//         quantity: 1,
//       };
//       setCartItems([...cartItems, cartItem]);
//     }
//   };
  // useEffect(() => {
  //   const storedCartItems: CartProduct[] = storage.get("cart");
  //   if (storedCartItems !== null && storedCartItems.length) {
  //     setCartItems(storedCartItems);
  //   }
  // }, []);