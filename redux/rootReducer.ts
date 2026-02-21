import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./features/theme/themeSlice";

export type IRootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
