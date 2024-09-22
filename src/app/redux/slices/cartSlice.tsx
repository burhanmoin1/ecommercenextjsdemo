import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: StaticImageData;
}

interface CartState {
  isCartOpen: boolean;
  items: CartItem[];
}

const initialState: CartState = {
  isCartOpen: false,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartMenu(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { toggleCartMenu, addToCart, removeFromCart, decreaseQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
