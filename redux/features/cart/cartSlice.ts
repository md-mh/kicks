import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/Cart";

// The initial state of the cart.
const initialState: { items: CartItem[] } = {
  items: [],
};

// The cart slice that defines the cart actions.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item: CartItem) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          size: action.payload.size,
          color: action.payload.color,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item: CartItem) => item.id !== action.payload,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find(
        (it: CartItem) => it.id === action.payload.id,
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    updateSize: (
      state,
      action: PayloadAction<{ id: number; size: number }>,
    ) => {
      const item = state.items.find(
        (it: CartItem) => it.id === action.payload.id,
      );
      if (item && action.payload.size > 0) {
        item.size = action.payload.size;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateSize,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
