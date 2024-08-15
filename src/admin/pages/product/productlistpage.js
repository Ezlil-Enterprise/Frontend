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
  Tag,
  Typography,
  message,
} from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { deleteProductByID, getAllProductDetails } from "../../api/product";
import { Form, useNavigate } from "react-router-dom";
import { MB05, MB10 } from "../../../general/component/widget";
import Cookies from "js-cookie";
import { getColumnSearchProps } from "../../../utlils/table";

const ProductListPage = () => {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [loading, setLoading] = useState(true);
  const [searchedColumn, setSearchedColumn] = useState("");
  const navigate = useNavigate();
  const searchInput = useRef(null);

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
    product.SKU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productColumn = [
    {
      title: "SKU",
      dataIndex: "SKU",
      render: (text, record) => (
        <a onClick={() => handleUpdateProduct(record)}>{text}</a>
      ),
      sorter: (a, b) => a.SKU.localeCompare(b.SKU),
    },
    {
      title: "Product",
      dataIndex: "title",
      render: (text, record) => (
        <a onClick={() => handleUpdateProduct(record)}>{text}</a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps("title", searchInput, setSearchedColumn),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      ...getColumnSearchProps("brand", searchInput, setSearchedColumn),
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
      sorter: (a, b) => a.category.name.localeCompare(b.category.name),
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
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Inactive",
          value: "Inactive",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
      sorter: (a, b) => a.status - b.status,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
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
