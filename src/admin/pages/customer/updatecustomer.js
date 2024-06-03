import React, { useEffect} from "react";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
  Button,
  Space,
  Typography,
} from "antd";
import "../../asset/less/addproduct.less";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getCustomerDetailsByID,
  updateCustomerDetails,
} from "../../api/customer";

const { Option } = Select;

const UpdateCustomer = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getCustomerDetailsByID(id);

        if (response) {
          form.setFieldsValue(response);
        } else {
          console.error("Invalid response structure:", response);
          message.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        message.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id, form]);
  const onFinish = async (values) => {
    try {
      const updateProductDataResponse = await updateCustomerDetails(id, values);

      if (updateProductDataResponse) {
        message.success("Product updated successfully!");
        navigate("/customers");
      }
    } catch (error) {
      if (error.response) {
        message.error(
          `Failed to update product: ${
            error.response.data.message || "Server error"
          }`
        );
      } else if (error.request) {
        message.error("Failed to update product: No response from server");
      } else {
        message.error(`Failed to update product: ${error.message}`);
      }
    }
  };

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    if (postalCode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${postalCode}`
        );
        if (response.data && response.data[0].Status === "Success") {
          const { PostOffice } = response.data[0];
          if (PostOffice && PostOffice.length > 0) {
            const city = PostOffice[0].District;
            const state = PostOffice[0].State;
            form.setFieldsValue({
              address: {
                ...form.getFieldValue("address"),
                city,
                state,
              },
            });
          }
        } else {
          message.error("Invalid postal code");
        }
      } catch (error) {
        message.error("Failed to fetch location data");
      }
    }
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>Update customer</Col>
      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "15px",
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ user_role: "User", status: "Active" }}
        >
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Typography>Basic Info</Typography>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label="Customer Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input customer name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="user_role"
                    label="Role"
                    rules={[
                      { required: true, message: "Please select your role!" },
                    ]}
                  >
                    <Select>
                      <Option value="SuperAdmin">SuperAdmin</Option>
                      <Option value="Admin">Admin</Option>
                      <Option value="User">User</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      {
                        required: true,
                        message: "Status is required.",
                      },
                    ]}
                  >
                    <Select placeholder="--Select--" allowClear>
                      <Option value="Active">Active</Option>
                      <Option value="Inactive">Inactive</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Typography>Address Details</Typography>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    name={["address", "addressLine1"]}
                    label="Address Line 1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address Line 1!",
                      },
                    ]}
                  >
                    <Input placeholder="Address Line 1" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={["address", "addressLine2"]}
                    label="Address Line 2"
                  >
                    <Input placeholder="Address Line 2 (Optional)" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["address", "city"]}
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city!",
                      },
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["address", "state"]}
                    label="State"
                    rules={[
                      {
                        required: true,
                        message: "Please input your state!",
                      },
                    ]}
                  >
                    <Input placeholder="State" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["address", "postalCode"]}
                    label="Pin Code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your postal code!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Postal Code"
                      onChange={handlePostalCodeChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
                <Button danger>Cancel</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateCustomer;
