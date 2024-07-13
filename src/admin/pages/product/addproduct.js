import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
  Upload,
  Button,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "../../asset/less/addproduct.less";
import { InboxOutlined } from "@ant-design/icons";
import { addProductData } from "../../api/product";
import { getAllCategoryDetails } from "../../api/category";
import Cookies from "js-cookie";
const { Option } = Select;
const { Dragger } = Upload;

const Addproduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categoryData, setCatergoryData] = useState([]);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const selectAfter = (
    <Select
      defaultValue="g"
      style={{
        width: 60,
      }}
    >
      <Option value="g">g</Option>
      <Option value="ml">ml</Option>
    </Select>
  );
  useEffect(() => {
    const fetchcategoryData = async () => {
      try {
        const categoryResponseData = await getAllCategoryDetails(userToken);
        setCatergoryData(categoryResponseData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchcategoryData();
  }, []);
  const uploadProps = {
    name: "imageUrl",
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
    fileList,
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === "description") {
          formData.append(key, values[key].replace(/<[^>]+>/g, ""));
        } else {
          formData.append(key, values[key]);
        }
      }
      if (fileList.length > 0) {
        formData.append("imageUrl", fileList[0]);
      }

      const addProductDataResponse = await addProductData(formData);
      if (addProductDataResponse) {
        message.success("Product created successfully!");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      if (error.response) {
        message.error(
          `Failed to create product: ${
            error.response.data.error || "Server error"
          }`
        );
      } else if (error.request) {
        console.error("Request data:", error.request);
        message.error("Failed to create product: No response from server");
      } else {
        console.error("Error message:", error.message);
        message.error(`Failed to create product: ${error.message}`);
      }
    }
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>Add Products</Col>
      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "15px",
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Product Name"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Name is required.",
                      },
                    ]}
                  >
                    <Input placeholder="Eg: Rose" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Description is required.",
                      },
                    ]}
                  >
                    <ReactQuill
                      theme="snow"
                      placeholder="Enter product description here..."
                      className="custom-quill-editor"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Category is required.",
                      },
                    ]}
                  >
                    <Select placeholder="--Select--" allowClear>
                      {categoryData.map((category) => (
                        <Option key={category._id} value={category._id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item
                    label="SKU"
                    name="SKU"
                    rules={[
                      {
                        required: true,
                        message: "SKU is required.",
                      },
                    ]}
                    tooltip="stock keeping unit"
                  >
                    <Input placeholder="SKU" />
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                  <Form.Item
                    label="Regular Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Regular price is required.",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{
                        width: 150,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Discounted Price"
                    name="discountedPrice"
                    rules={[
                      {
                        required: true,
                        message: "Sales price is required.",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{
                        width: 150,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Total Discounted"
                    name="discountPersent"
                    rules={[
                      {
                        required: true,
                        message: "Sales Discount is required.",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{
                        width: 150,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Stock"
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Stock is required.",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{
                        width: 150,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: "Brand is required.",
                      },
                    ]}
                  >
                    <Input
                      min={1}
                      style={{
                        width: 150,
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                      {
                        required: true,
                        message: "Weight is required.",
                      },
                    ]}
                  >
                    <InputNumber addonAfter={selectAfter} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="manufacturer"
                    label="Manufacturer"
                    rules={[
                      {
                        required: true,
                        message: "Manufacturer is required.",
                      },
                    ]}
                  >
                    <Select placeholder="--Select--" allowClear>
                      <Option value="deepz_organics">Deeps Organics</Option>
                      <Option value="soul_sitara">Soul Sitara</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
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
                      <Option value="Inactive">InActive</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>
            </Col>
            <Col span={12}>
              <Dragger {...uploadProps} style={{ height: "200px" }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Col>
            <Col span={24}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Add
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

export default Addproduct;
