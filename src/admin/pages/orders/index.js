import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Updateorder from "./updateorder";
import OrdersListPage from "./orderslistpage";

const Orders = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/orders">
          <Route path="/*" element={<OrdersListPage />} />
          <Route path="/updateorder/:id" element={<Updateorder />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Orders;
