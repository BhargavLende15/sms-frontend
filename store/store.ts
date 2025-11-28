import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

export const smsStore = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof smsStore.getState>;
export type AppDispatch = typeof smsStore.dispatch;
