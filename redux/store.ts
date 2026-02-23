import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./rootReducer";
import { productsApi } from "@/redux/api/productsApi";

// Configure the Redux store with RTK Query middleware.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsApi.middleware),
});

const persistor = persistStore(store);

export { persistor, store };
export type IRootState = ReturnType<typeof store.getState>;
