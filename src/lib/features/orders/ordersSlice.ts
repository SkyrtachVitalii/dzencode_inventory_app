// src/lib/features/orders/ordersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "@/types/IOrder";

interface OrdersState {
    ordersList: IOrder[];
    loading: boolean,
    error: string | null;
};

const initialState: OrdersState = {
    ordersList: [],
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk<IOrder[]>(
    "orders/fetchOrders", async () => {
        const response = await axios.get<IOrder[]>("/api/orders");
        return response.data;
    });

export const deleteOrder = createAsyncThunk<number, number>(
    "orders/deleteOrder", async (id) => {
        await axios.delete(`/api/orders/${id}`);
        return id;
    });

export const deleteProductFromOrder = createAsyncThunk<{ productId: number, orderId: number }, { productId: number, orderId: number }>(
    "orders/deleteProductFromOrder", async ({ productId, orderId }) => {
        await axios.delete(`/api/products/${productId}`);
        return { productId, orderId };
    });

export const selectOrdersForChart = (state: { orders: OrdersState }) => {

    const orders = state.orders.ordersList;
    return orders.map((order: IOrder)=> ({
        name: order.title,
        productsCount: order.products.length
    }));
};


const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersList = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch orders";
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.ordersList = state.ordersList.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                console.error("Failed to delete order");
            })
            .addCase(deleteProductFromOrder.fulfilled, (state, action) => {
                const order = state.ordersList.find( order => order.id === action.payload.orderId);
                if (order) {
                    order.products = order.products.filter( product => product.id !== action.payload.productId);
                };
            })
    },
});

export default ordersSlice.reducer;