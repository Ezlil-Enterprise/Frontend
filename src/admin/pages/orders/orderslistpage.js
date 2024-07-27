import {
  Breadcrumb,
  Button,
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
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { getCustomerDetailsByID } from "../../api/customer";
import { useNavigate } from "react-router-dom";
import { deleteOrderByID, getAllOrders } from "../../api/orders";
import Cookies from "js-cookie";
import { formatDate } from "../../../utlils/date";
import { MB05 } from "../../../general/component/widget";

const OrdersListPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
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
  const ordersColumn = [
    {
      title: "Name",
      dataIndex: ["user", "firstName"],
      render: (text, record) => (
        <a onClick={() => handleUpdateOrder(record)}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
    },

    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (text) => formatDate(text),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (record) => <Typography>₹ {record}</Typography>,
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
            return <Tag color="purple">NOTHING</Tag>;
        }
      },
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
          onConfirm={() => handleDeleteOrder(record._id)}
        >
          <DeleteOutlined style={{ color: "#ff0000" }} />
        </Popconfirm>
      ),
    },
  ];
  const handleUpdateOrder = (record) => {
    navigate(`/admin/orders/updateorder/${record._id}`, {
      state: { order: record },
    });
  };
  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrderByID(userToken, id);
      message.success("order deleted successfully");
      setOrdersData(ordersData.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order");
    }
  };
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  // };
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
                    value: "CONFIRMED",
                    label: "Confirmed",
                  },
                  {
                    value: "SHIPPED",
                    label: "Shipped",
                  },
                  {
                    value: "DELIVERED",
                    label: "Delivered",
                  },
                  {
                    value: "CANCELLED",
                    label: "Cancelled",
                  },
                ]}
              />
            </Flex>
          </Col>

          <Col span={18} style={{ textAlign: "end" }}>
            {/* <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddOrder}
            >
              Add Orders
            </Button> */}
          </Col>
          <Col span={24}>
            <Table
              columns={ordersColumn}
              // rowSelection={{
              //   type: "checkbox",
              //   ...rowSelection,
              // }}
              dataSource={ordersData}
              loading={loading}
              rowKey="SKU"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrdersListPage;
