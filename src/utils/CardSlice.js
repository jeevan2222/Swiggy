import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    item: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.item.push(action.payload);
    },
    removeItem: (state) => {
      state.item.pop();
    },
    clearCart: (state) => {
      state.item.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cardSlice.actions;

export default cardSlice.reducer;
