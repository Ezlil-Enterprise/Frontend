import {
  Breadcrumb,
  Col,
  Popconfirm,
  Row,
  Table,
  Tag,
  Typography,
  message,
  Input,
  Button,
  Space,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { getCustomerDetailsByID } from "../../api/customer";
import { useNavigate } from "react-router-dom";
import { deleteOrderByID, getAllOrders } from "../../api/orders";
import Cookies from "js-cookie";
import { MB05 } from "../../../general/component/widget";
import { filterWithDateRange } from "../../../utlils/table";
import { format } from "date-fns";

const OrdersListPage = () => {
  const [orderData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const searchInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponseData = await getAllOrders(userToken);
        if (Array.isArray(ordersResponseData)) {
          const ordersWithUserDetails = await Promise.all(
            ordersResponseData.map(async (order) => {
              const userInfoResponse = await getCustomerDetailsByID(order.user);
              return { ...order, user: userInfoResponse };
            })
          );
          setOrdersData(ordersWithUserDetails);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = Array.isArray(dataIndex)
        ? dataIndex.reduce((o, i) => o[i], record)
        : record[dataIndex];
      return (
        recordValue &&
        recordValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const ordersColumn = [
    {
      title: "Name",
      dataIndex: ["user", "firstName"],
      render: (text, record) => (
        <a onClick={() => handleUpdateOrder(record)}>{text}</a>
      ),
      sorter: (a, b) => a.user.firstName.localeCompare(b.user.firstName),
      ...getColumnSearchProps(["user", "firstName"]),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      sorter: (a, b) => a.user.email.localeCompare(b.user.email),
      ...getColumnSearchProps(["user", "email"]),
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (text) => (
        <span>{format(new Date(text), "MM/dd/yyyy hh:mm:ss")}</span>
      ),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      ...filterWithDateRange({
        handleSearch,
        handleReset,
        dataIndex: "orderDate",
      }),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (record) => <Typography>₹ {record}</Typography>,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (record) => {
        switch (record) {
          case "CONFIRMED":
            return <Tag color="blue">CONFIRMED</Tag>;
          case "PLACED":
            return <Tag color="pink">PLACED</Tag>;
          case "SHIPPED":
            return <Tag color="gold">SHIPPED</Tag>;
          case "DELIVERED":
            return <Tag color="success">DELIVERED</Tag>;
          case "CANCELLED":
            return <Tag color="error">CANCELLED</Tag>;
          default:
            return <Tag color="purple">UNKNOWN</Tag>;
        }
      },
      filters: [
        { text: "CONFIRMED", value: "CONFIRMED" },
        { text: "PLACED", value: "PLACED" },
        { text: "SHIPPED", value: "SHIPPED" },
        { text: "DELIVERED", value: "DELIVERED" },
        { text: "CANCELLED", value: "CANCELLED" },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.orderStatus.startsWith(value),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Popconfirm
          placement="topLeft"
          title="Are you sure to delete this order?"
          description="Delete the order"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteOrder(record._id)}
        >
          <DeleteOutlined style={{ color: "#ff0000" }} />
        </Popconfirm>
      ),
    },
  ];

  const handleUpdateOrder = (record) => {
    navigate(`/admin/orders/updateorder/${record._id}`);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrderByID(userToken, id);
      message.success("Order deleted successfully");
      setOrdersData((prevData) => prevData.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order");
    }
  };

  return (
    <Row gutter={[16, 16]} className="common-padding">
      <Col span={24}>
        <Typography className="ez-ls-h4 bold">Orders</Typography>
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
              title: "Orders",
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
            <Input.Search
              placeholder="Search orders"
              allowClear
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col span={18} style={{ textAlign: "end" }}></Col>
          <Col span={24}>
            <Table
              columns={ordersColumn}
              dataSource={orderData.filter((order) =>
                order._id.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              loading={loading}
              rowKey="_id"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrdersListPage;
