import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Select,
  Divider,
  message,
  Breadcrumb,
  Typography,
  Space,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { MB05 } from "../../../general/component/widget";
import { getOrderDetailsByID } from "../../api/orders";
import TextArea from "antd/es/input/TextArea";
import { MIDDLEWARE_API_URL } from "../../../constants";

const { Option } = Select;

const UpdateOrder = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderDetailsByID(id, userToken);
        if (response) {
          form.setFieldsValue({
            orderStatus: response.orderStatus,
            orderDate: new Date(response.orderDate).toLocaleString(),
            totalItems: response.totalItems,
            totalPrice: response.totalPrice,
            shippingAddress: `${response.shippingAddress.name}, ${response.shippingAddress.addressLine1}, ${response.shippingAddress.city},${response.shippingAddress.state},${response.shippingAddress.zipCode}`,
          });

          console.log(response.orderItems);
          setOrderItems(response.orderItems);
        } else {
          console.error("Invalid response structure:", response);
          message.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        message.error("Failed to fetch order details");
      }
    };

    fetchOrder();
  }, [id, form]);

  const getEndpoint = (orderId, status) => {
    switch (status) {
      case "CONFIRMED":
        return `${MIDDLEWARE_API_URL}/api/admin/order/${orderId}/confirmed`;
      case "PLACED":
        return `${MIDDLEWARE_API_URL}/api/admin/order/${orderId}/placed`;
      case "SHIPPED":
        return `${MIDDLEWARE_API_URL}/api/admin/order/${orderId}/ship`;
      case "DELIVERED":
        return `${MIDDLEWARE_API_URL}/api/admin/order/${orderId}/deliver`;
      case "CANCELLED":
        return `${MIDDLEWARE_API_URL}/api/admin/order/${orderId}/cancel`;
      default:
        return null;
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const endpoint = getEndpoint(id, values.orderStatus);
      if (endpoint) {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });
        message.success("Order updated successfully");
        navigate("/admin/orders");
      } else {
        message.error("Invalid order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Error updating order");
    }
    setLoading(false);
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Row gutter={[16, 16]} className="common-padding">
      <Col span={24}>
        <Typography className="ez-ls-h4 bold">Order</Typography>
        <MB05 />
        <Breadcrumb
          items={[
            {
              href: "/dashboard",
              title: (
                <>
                  <UserOutlined />
                  <span>Admin</span>
                </>
              ),
            },
            {
              href: "/admin/orders",
              title: "Order",
            },
            {
              title: "Update",
            },
          ]}
        />
      </Col>
      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "15px",
        }}
      >
        <Divider />
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Order ID">
            <Input disabled value={id} />
          </Form.Item>

          <Form.Item label="Order Date" name="orderDate">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Total Items" name="totalItems">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Total Price" name="totalPrice">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Shipping Address" name="shippingAddress">
            <TextArea disabled />
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

          <Divider>Order Items</Divider>

          {orderItems.map((item) => (
            <div key={item._id} style={{ marginBottom: "10px" }}>
              <Typography.Text strong>SKU:</Typography.Text> {item.product.SKU}{" "}
              <br />
              <Typography.Text strong>Product:</Typography.Text>{" "}
              {item.product.title} <br />
              <Typography.Text strong>Price:</Typography.Text> {item.price}{" "}
              <br />
              <Typography.Text strong>Quantity:</Typography.Text>{" "}
              {item.quantity} <br />
              <Typography.Text strong>Discounted Price:</Typography.Text>{" "}
              {item.discountedPrice} <br />
              <Divider />
            </div>
          ))}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Order
              </Button>
              <Button danger onClick={() => navigate("/admin/orders")}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateOrder;
