import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneraIndexPage from "./general";
import MainLayout from "./general/component/main_layout";
import Product from "./admin/pages/product/index";
import Customer from "./admin/pages/customer/index";
import Dashboard from "./admin/pages/dashboard/index";
import Orders from "./admin/pages/orders";
import Category from "./admin/pages/category";
import Transaction from "./admin/pages/transactiom";
const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/*" element={<GeneraIndexPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/products/*" element={<Product />} />
          <Route path="/admin/customers/*" element={<Customer />} />
          <Route path="/admin/orders/*" element={<Orders />} />
          <Route path="/admin/category/*" element={<Category />} />
          <Route path="/admin/transactions/*" element={<Transaction />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
