import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { InboxOutlined } from "@ant-design/icons";
import { getProductDetailsByID, updateProductDetails } from "../api/product";
import "../asset/less/addproduct.less";

const { Option } = Select;
const { Dragger } = Upload;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const ingredientsoptions = [
    { label: "Glyserin", value: "glyserin" },
    { label: "Rose Essence", value: "rose_essence" },
  ];

  const selectAfter = (
    <Select defaultValue="g" style={{ width: 60 }}>
      <Option value="g">g</Option>
      <Option value="ml">ml</Option>
    </Select>
  );

  const uploadProps = {
    name: "p_image",
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetailsByID(id);

        if (response) {
          form.setFieldsValue(response);

          if (response.p_image) {
            setFileList([
              {
                uid: "-1",
                name: response.p_image.split("/").pop(),
                status: "done",
                url: `http://localhost:4001/${response.p_image}`,
              },
            ]);
          }
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
      values.p_description = values.p_description.replace(/<[^>]+>/g, "");

      if (fileList.length > 0) {
        values.p_image = fileList[0];
      }

      const updateProductDataResponse = await updateProductDetails(id, values);

      if (updateProductDataResponse) {
        message.success("Product updated successfully!");
        navigate("/products");
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

  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>Update Product</Col>
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
                    name="p_name"
                    rules={[{ required: true, message: "Name is required." }]}
                  >
                    <Input placeholder="Eg: Rose" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Product Description"
                    name="p_description"
                    rules={[
                      { required: true, message: "Description is required." },
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
                    name="p_category"
                    label="Category"
                    rules={[
                      { required: true, message: "Category is required." },
                    ]}
                  >
                    <Select placeholder="--Select--" allowClear>
                      <Option value="soap">Soap</Option>
                      <Option value="face_wash">Face Wash</Option>
                      <Option value="face_mask">Face Mask</Option>
                      <Option value="face_serum">Face Serum</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="SKU"
                    name="SKU"
                    rules={[{ required: true, message: "SKU is required." }]}
                    tooltip="stock keeping unit"
                  >
                    <Input placeholder="SKU" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Regular Price"
                    name="regular_price"
                    rules={[
                      { required: true, message: "Regular price is required." },
                    ]}
                  >
                    <InputNumber min={1} style={{ width: 150 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Sales Price"
                    name="sales_price"
                    rules={[
                      { required: true, message: "Sales price is required." },
                    ]}
                  >
                    <InputNumber min={1} style={{ width: 150 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Stock"
                    name="quantity_available"
                    rules={[{ required: true, message: "Stock is required." }]}
                  >
                    <InputNumber min={1} style={{ width: 150 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Weight"
                    name="weight_volume"
                    rules={[{ required: true, message: "Weight is required." }]}
                  >
                    <InputNumber addonAfter={selectAfter} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ingredients"
                    name="ingredients"
                    rules={[
                      { required: true, message: "Ingredients are required." },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      options={ingredientsoptions}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="manufacturer"
                    label="Manufacturer"
                    rules={[
                      { required: true, message: "Manufacturer is required." },
                    ]}
                  >
                    <Select placeholder="--Select--" allowClear>
                      <Option value="deepz_organics">Deeps Organics</Option>
                      <Option value="soul_sitara">Soul Sitara</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Status is required." }]}
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
              <Dragger {...uploadProps} style={{ height: "200px" }}>
                {fileList.length > 0 && fileList[0].url ? (
                  <img
                    src={fileList[0].url}
                    alt="Product"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibited
                      from uploading company data or other banned files.
                    </p>
                  </>
                )}
              </Dragger>
            </Col>
            <Col span={24}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button danger onClick={() => navigate("/products")}>
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateProduct;
