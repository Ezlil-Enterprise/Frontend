import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import TransactionListPage from "./transactionlistpage";

const Transaction = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/transactions">
          <Route path="/*" element={<TransactionListPage />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Transaction;
