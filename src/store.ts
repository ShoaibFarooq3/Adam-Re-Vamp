import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./redux/slices/authSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
