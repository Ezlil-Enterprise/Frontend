import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryListPage from "./category_list_page";


const Category = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/category">
          <Route path="/*" element={<CategoryListPage />} />
       
        </Routes>
      </Col>
    </Row>
  );
};

export default Category;
