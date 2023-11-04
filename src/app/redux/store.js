import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can choose a different storage engine if needed

import auth from "./slices/AuthSlice";
import settings from "./slices/SettingsSlice";
import { HTTPClient } from "../../app/utils/HttpsClient";

// Define your reducers
const rootReducer = combineReducers({
  [HTTPClient.reducerPath]: HTTPClient.reducer,
  auth,
  settings,
});

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "settings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }).concat(HTTPClient.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

// Create a selector function for accessing the Redux state
const useAppSelector = useSelector;

export { store, persistor, useAppSelector };
