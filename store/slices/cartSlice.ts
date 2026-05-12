import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { selectProducts } from './productsSlice';

type CartItem = {
  productId: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const existing = state.items.find((item) => item.productId === action.payload);
      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({ productId: action.payload, quantity: 1 });
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.productId !== action.payload);
        return;
      }

      item.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((entry) => entry.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = createSelector([selectProducts, (state: RootState) => state.cart.items], (products, cartItems) => {
  return cartItems
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.productId);
      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: cartItem.quantity,
        lineTotal: product.price * cartItem.quantity,
      };
    })
    .filter(Boolean) as Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
      quantity: number;
      lineTotal: number;
    }>;
});

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.lineTotal, 0),
);

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export default cartSlice.reducer;
