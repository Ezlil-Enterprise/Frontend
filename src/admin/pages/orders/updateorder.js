import { Button, Col, Row, Form, Input, Select, Divider, message } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const { Option } = Select;

const UpdateOrder = () => {
  const { state } = useLocation();
  const { order } = state || {};
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));

  useEffect(() => {
    if (!order) {
      message.error("No order data found. Redirecting to orders list.");
      navigate("/admin/orders");
    } else {
      form.setFieldsValue({
        orderStatus: order.orderStatus,
      });
    }
  }, [form, order, navigate]);

  const getEndpoint = (orderId, status) => {
    switch (status) {
      case "CONFIRMED":
        return `http://localhost:4001/api/admin/order/${orderId}/confirmed`;
      case "PLACED":
        return `http://localhost:4001/api/admin/order/${orderId}/placed`;
      case "SHIPPED":
        return `http://localhost:4001/api/admin/order/${orderId}/ship`;
      case "DELIVERED":
        return `http://localhost:4001/api/admin/order/${orderId}/deliver`;
      case "CANCELLED":
        return `http://localhost:4001/api/admin/order/${orderId}/cancel`;
      default:
        return null;
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const endpoint = getEndpoint(order._id, values.orderStatus);
      if (endpoint) {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });
        message.success("Order updated successfully");
        navigate("/admin/orders"); // Redirect to orders list after update
      } else {
        message.error("Invalid order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Error updating order");
    }
    setLoading(false);
  };

  if (!order) {
    return <div>Loading...</div>; // Display loading or empty state until redirect
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>
        <h2>Update Order Status</h2>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            orderStatus: order.orderStatus,
          }}
        >
          <Form.Item label="Order ID">
            <Input value={order._id} disabled />
          </Form.Item>

          <Form.Item label="Order Date">
            <Input value={order.orderDate} disabled />
          </Form.Item>

          <Form.Item label="Total Items">
            <Input value={order.totalItems} disabled />
          </Form.Item>

          <Form.Item label="Total Price">
            <Input value={order.totalPrice} disabled />
          </Form.Item>

          <Form.Item label="Shipping Address">
            <Input value={order.shippingAddress} disabled />
          </Form.Item>

          <Form.Item
            name="orderStatus"
            label="Order Status"
            rules={[
              { required: true, message: "Please select an order status" },
            ]}
          >
            <Select>
              <Option value="PLACED">Placed</Option>
              <Option value="CONFIRMED">Confirmed</Option>
              <Option value="SHIPPED">Shipped</Option>
              <Option value="DELIVERED">Delivered</Option>
              <Option value="CANCELLED">Cancelled</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Order
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateOrder;
