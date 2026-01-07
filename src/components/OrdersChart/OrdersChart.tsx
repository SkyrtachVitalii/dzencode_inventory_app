"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchOrders, selectOrdersForChart } from "@/lib/features/orders/ordersSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function OrdersChart() {
  const dispatch = useAppDispatch();
  const chartData = useAppSelector(selectOrdersForChart);
  const ordersList = useAppSelector((state) => state.orders.ordersList);
  console.log(chartData.length);

  useEffect(() => {
    if (ordersList.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, ordersList.length]);

  if (!chartData || chartData.length === 0) {
    return <div className="p-3 text-muted">No orders to display</div>;
  }

  return (
    <div
      className="bg-white p-3 shadow-sm rounded"
      style={{
        width: "100%",
        height: 500,
        paddingBlockEnd: `5rem + !important`,
      }}
    >
      <h3 className="text-lg mb-4 text-end">Orders Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 64 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="productsCount" fill="#8CC63F" name="Product Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
