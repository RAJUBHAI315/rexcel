// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Export AppDispatch type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
