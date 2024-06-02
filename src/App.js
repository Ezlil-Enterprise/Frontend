import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneraIndexPage from "./general";
import MainLayout from "./general/component/main_layout";
import Dashboard from "./general/pages/dashboard";
import Product from "./admin/pages/product/index";
import Customer from "./admin/pages/customer/index";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/*" element={<GeneraIndexPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/products/*" element={<Product />} />
          <Route path="/customer/*" element={<Customer />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
