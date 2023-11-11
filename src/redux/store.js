import { configureStore } from "@reduxjs/toolkit";
import { cardsApi } from "./cardsApi";
import fetchAuthSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    [cardsApi.reducerPath]: cardsApi.reducer,
    user: fetchAuthSlice,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(cardsApi.middleware),
});
