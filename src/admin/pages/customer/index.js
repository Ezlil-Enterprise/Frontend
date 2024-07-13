import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

import CustomerListPage from "./customerlist";
import Addcustomer from "./addcustomer";
import UpdateCustomer from "./updatecustomer";

const Customer = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/admin/customers">
          <Route path="/*" element={<CustomerListPage />} />
          <Route path="/addcustomer/*" element={<Addcustomer />} />
          <Route path="/updatecustomer/:id" element={<UpdateCustomer />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Customer;
