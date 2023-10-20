import React from "react";
import Product from "./Product";

const Dashboard = () => {
  return (
    <div className="my-10">
      <h1 className="font-semibold text-2xl mb-4">Tracked Items</h1>
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default Dashboard;
