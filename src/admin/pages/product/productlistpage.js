import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Flex,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { deleteProductByID, getAllProductDetails } from "../../api/product";
import { Form, useNavigate } from "react-router-dom";
import { MB05, MB10 } from "../../../general/component/widget";
import Cookies from "js-cookie";

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponseData = await getAllProductDetails();

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

  const filteredData = productData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      dataIndex: "title",
      render: (text, record) => (
        <a onClick={() => handleUpdateProduct(record)}>{text}</a>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      filters: [
        {
          text: "Soap",
          value: "Soap",
        },
        {
          text: "Shampoo",
          value: "Shampoo",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.category.name.startsWith(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Popconfirm
          placement="topLeft"
          title="Are you sure to delete this category?"
          description="Delete the task"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteProduct(record._id)}
        >
          <DeleteOutlined style={{ color: "#ff0000" }} />
        </Popconfirm>
      ),
    },
  ];
  const handleAddProducts = () => {
    navigate("/admin/products/addproduct");
  };
  const handleUpdateProduct = (record) => {
    navigate(`/admin/products/updateproduct/${record._id}`);
  };
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProductByID(id, userToken);
      message.success("Product deleted successfully");
      setProductData(productData.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product");
    }
  };
  return (
    <Row gutter={[16, 16]} className="common-padding">
      <Col span={24}>
        <Typography className="ez-ls-h4 bold">Products</Typography>
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
              title: "Products",
            },
          ]}
        />
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
            <Search
              placeholder="search"
              allowClear
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              dataSource={filteredData}
              loading={loading}
              rowKey="_id"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductListPage;
