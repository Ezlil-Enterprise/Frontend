import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/product_list_page";

const Product = () => {
  return (
    <Row gutter={[64,64]} style={{height:"100vh"}}>
      <Col span={24}>
        <Routes basepath="/products">
          <Route path="/*" element={<ProductListPage />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Product;
