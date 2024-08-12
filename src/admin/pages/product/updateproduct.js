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
  Breadcrumb,
  Typography,
} from "antd";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { getProductDetailsByID, updateProductDetails } from "../../api/product";
import "../../asset/less/addproduct.less";
import Cookies from "js-cookie";
import { getAllCategoryDetails } from "../../api/category";
import { MB05 } from "../../../general/component/widget";
import { MIDDLEWARE_API_URL } from "../../../constants";
const { Option } = Select;
const { Dragger } = Upload;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categoryData, setCatergoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const { id } = useParams();
  const navigate = useNavigate();
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
  const selectAfter = (
    <Select defaultValue="g" style={{ width: 60 }}>
      <Option value="g">g</Option>
      <Option value="ml">ml</Option>
    </Select>
  );

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetailsByID(id);

        if (response) {
          form.setFieldsValue(response);

          if (response.imageUrl) {
            setFileList([
              {
                uid: "-1",
                name: response.imageUrl.split("/").pop(),
                status: "done",
                url: `${MIDDLEWARE_API_URL}/${response.imageUrl}`,
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
    setLoading(true);
    try {
      values.description = values.description.replace(/<[^>]+>/g, "");

      if (fileList.length > 0) {
        values.imageUrl = fileList[0].url;
      }

      const updateProductDataResponse = await updateProductDetails(
        id,
        values,
        userToken
      );

      if (updateProductDataResponse) {
        message.success("Product updated successfully!");
        navigate("/admin/products");
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
    setLoading(false);
  };

  return (
    <Row gutter={[16, 16]} className="common-padding">
      <Col span={24}>
        <Typography className="ez-ls-h4 bold">Product</Typography>
        <MB05 />{" "}
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
              href: "/admin/products",
              title: "Product",
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
                <Col span={12}>
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
                    <Input disabled={true} placeholder="SKU" />
                  </Form.Item>
                </Col>
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
                    label="manufacturer"
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
                      <Option value="Inactive">InActive</Option>
                    </Select>
                  </Form.Item>
                </Col>
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
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update
                </Button>
                <Button danger onClick={() => navigate("/admin/products")}>
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
