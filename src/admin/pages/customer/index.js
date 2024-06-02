import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";

// import Addproduct from "./pages/addproduct";
// import UpdateProduct from "./pages/updateproduct";
import CustomerListPage from "./customerlist";

const Customer = () => {
  return (
    <Row gutter={[64, 64]} style={{ height: "100vh" }}>
      <Col span={24}>
        <Routes basepath="/customer">
          <Route path="/*" element={<CustomerListPage/>} />
          {/* <Route path="/addcustomer/*" element={<Addproduct />} />
          <Route path="/updatecustomer/:id" element={<UpdateProduct />} /> */}
        </Routes>
      </Col>
    </Row>
  );
};

export default Customer;
