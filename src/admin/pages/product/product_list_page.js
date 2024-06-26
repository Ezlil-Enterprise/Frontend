import {
  Button,
  Checkbox,
  Col,
  Flex,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteProductByID, getProductDetails } from "../../api/product"
import { Form, useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponseData = await getProductDetails();
        if (Array.isArray(productResponseData)) {
          setProductData(productResponseData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const productColumn = [
    {
      title: "SKU",
      dataIndex: "SKU",
      render: (text, record) => (
        <a onClick={() => handleUpdateProduct(record)}>{text}</a>
      ),
    },
    {
      title: "Product",
      dataIndex: "p_name",
    },
    {
      title: "Category",
      dataIndex: "p_category",
      filters: [
        {
          text: "Soap",
          value: "soap",
        },
        {
          text: "Face Wash",
          value: "face_wash",
        },
        {
          text: "Face Mask",
          value: "face_mask",
        },
        {
          text: "Face Sierm",
          value: "face_sierm",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Price",
      dataIndex: "sales_price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "quantity_available",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "In Stock",
          value: "in_stock",
        },
        {
          text: "Out of Stock",
          value: "out_of_stock",
        },
        {
          text: "Limited Stock",
          value: "limited_stock",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: "#ff0000" }}
          onClick={() => handleDeleteProduct(record._id)}
        />
      ),
    },
  ];
  const handleAddProducts = () => {
    navigate("/products/addproduct");
  };
  const handleUpdateProduct = (record) => {
    navigate(`/products/updateproduct/${record._id}`);
  };
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductByID(id);
      message.success("Product deleted successfully");
      setProductData(productData.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>
        <Typography>Product List</Typography>
      </Col>
      <Col span={24}>
        <Row
          style={{
            background: "#ffffff",
            padding: "15px",
            borderRadius: "15px",
          }}
          gutter={[16, 16]}
        >
          <Col span={6}>
            <Flex gap="small">
              <Search placeholder="search" allowClear />
              <Select
                style={{
                  width: 120,
                }}
                allowClear
                placeholder={"--Select--"}
                options={[
                  {
                    value: "soap",
                    label: "Soap",
                  },
                  {
                    value: "face_wash",
                    label: "Face Wash",
                  },
                ]}
              />
            </Flex>
          </Col>

          <Col span={18} style={{ textAlign: "end" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddProducts}
            >
              Add Products
            </Button>
          </Col>
          <Col span={24}>
            <Table
              columns={productColumn}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              dataSource={productData}
              loading={loading}
              rowKey="SKU"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductListPage;
