import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneraIndexPage from "./general";
import MainLayout from "./general/component/main_layout";
import Dashboard from "./general/pages/dashboard";
import Product from "./product";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/*" element={<GeneraIndexPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/products/*" element={<Product />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
