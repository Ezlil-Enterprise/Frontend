import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Addproduct from "./addproduct";
import UpdateProduct from "./updateproduct";
import ProductListPage from "./productlistpage";

const Product = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/products">
          <Route path="/*" element={<ProductListPage />} />
          <Route path="/addproduct/*" element={<Addproduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Product;
