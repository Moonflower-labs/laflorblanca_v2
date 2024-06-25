import { storage } from "../utils/storage";
import { CartProduct, ProductItem } from "../utils/definitions";

interface CartProvider {
  cartItems:CartProduct[];
  addToCart(product:ProductItem,selectedPrice: { id: string; amount: number }): void;
  getCart(): CartProduct[];
  incrementItemQuantity(id:string): void;
  decreaseItemQuantity(id:string): void;
  deleteItem(id:string): void;
  initialize(): void;
}

const cartProvider: CartProvider = {
  cartItems: [],

  getCart () {
    return cartProvider.cartItems
  },
  
  addToCart (product, selectedPrice) {
    const existingCartItemIndex = cartProvider.cartItems.findIndex((item) => item.id === selectedPrice.id);

    if (existingCartItemIndex !== -1) {
      const updatedCart = cartProvider.cartItems.map((item, index) =>
        index === existingCartItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      cartProvider.cartItems = updatedCart;
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
      cartProvider.cartItems = [...cartProvider.cartItems, cartItem];
    }

    storage.set("cart", cartProvider.cartItems);
    console.log('add to cart funtion',cartProvider.cartItems)
  },
  
  incrementItemQuantity (id) {
    cartProvider.cartItems = cartProvider.cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    storage.set("cart", cartProvider.cartItems);
    console.log('incrementItemQuantity funtion',cartProvider.cartItems)
  },
  
  decreaseItemQuantity (id) {
    cartProvider.cartItems = cartProvider.cartItems.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity === 1) {
          return acc;
        } else {
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
      }
      return [...acc, item];
    }, [] as CartProduct[]);

    storage.set("cart", cartProvider.cartItems);
  },
  
  deleteItem (id)  {
    cartProvider.cartItems = cartProvider.cartItems.filter((item) => item.id !== id);

    storage.set("cart", cartProvider.cartItems);
  },
  
  initialize  () {
    cartProvider.cartItems = storage.get<CartProduct[]>("cart") || [];
  },
};

// cartProvider.initialize();

export default cartProvider;
