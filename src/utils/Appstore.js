import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./CardSlice";

const appStore = configureStore({
  reducer: {
    cart: cardReducer,
  },
});

export default appStore;
