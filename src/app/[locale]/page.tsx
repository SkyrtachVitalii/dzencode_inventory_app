"use client";

import dynamic from "next/dynamic";

const OrdersChart = dynamic(() => import("@/components/OrdersChart/OrdersChart"), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false
});

export default function Home() {
  return (
    <div className="me-4">
      <h1 
      className="text-center mt-0"
      style={{color: "#8CC63F", marginBottom: "32px",}}>Inventory App</h1>
      <OrdersChart />
    </div>
  );
}
