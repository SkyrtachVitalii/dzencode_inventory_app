// lib/store.ts

import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./features/orders/ordersSlice";
import productsReducer from "./features/products/productsSlice";
import sessionsReducer from "./features/sessions/sessionsSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            orders: ordersReducer,
            products: productsReducer,
            sessions: sessionsReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];