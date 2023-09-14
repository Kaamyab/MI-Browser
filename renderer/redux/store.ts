import { configureStore } from "@reduxjs/toolkit";
import Tabs from "./features/Tabs";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const composeEnhancers = composeWithDevTools({});
export const store = configureStore({
  reducer: { Tabs },
  enhancers: composeEnhancers,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
