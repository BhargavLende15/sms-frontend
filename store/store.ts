import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
export const smsStore = configureStore({
    reducer: {
        counter: counterReducer
    }
})

