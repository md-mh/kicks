import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./features/theme/themeSlice";
import { productsApi } from "@/redux/api/productsApi";
import cartReducer from "./features/cart/cartSlice";

export type IRootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
