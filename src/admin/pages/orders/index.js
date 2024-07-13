import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import OrdersListPage from "./orders_list_page";

const Orders = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/orders">
          <Route path="/*" element={<OrdersListPage />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Orders;
