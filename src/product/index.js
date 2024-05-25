import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/product_list_page";
import Addproduct from "./pages/addproduct";
import UpdateProduct from "./pages/updateproduct";

const Product = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/products">
          <Route path="/*" element={<ProductListPage />} />
          <Route path="/addproduct/*" element={<Addproduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Product;
