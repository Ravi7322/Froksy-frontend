import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of { id, name, price, quantity }
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // {id, name, price}
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
        // state.items.push({ ...item, quantity: 1 });
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalPrice += item.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        state.totalPrice -= item.price;
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
