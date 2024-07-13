import {
  Button,
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
import { deleteCustomerByID, getCustomerDetails } from "../../api/customer";
import { useNavigate } from "react-router-dom";

const CustomerListPage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponseData = await getCustomerDetails();
        if (Array.isArray(customerResponseData)) {
          setCustomerData(customerResponseData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const customerColumn = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (text, record) => (
        <a onClick={() => handleUpdateCustomer(record)}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "User Role",
      dataIndex: "role",
    },
    {
      title: "Phone",
      dataIndex: "mobile",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   filters: [
    //     {
    //       text: "Active",
    //       value: "Active",
    //     },
    //     {
    //       text: "Inactive",
    //       value: "Inactive",
    //     },
    //   ],
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.name.startsWith(value),
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: "#ff0000" }}
          onClick={() => handleDeleteCustomer(record._id)}
        />
      ),
    },
  ];
  const handleAddCustomers = () => {
    navigate("/admin/customers/addcustomer");
  };
  const handleUpdateCustomer = (record) => {
    navigate(`/admin/customers/updatecustomer/${record._id}`);
  };
  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomerByID(id);
      message.success("customer deleted successfully");
      setCustomerData(customerData.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      message.error("Failed to delete customer");
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
        <Typography>customer List</Typography>
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
                    value: "admin",
                    label: "Admin",
                  },
                  {
                    value: "user",
                    label: "User",
                  },
                ]}
              />
            </Flex>
          </Col>

          <Col span={18} style={{ textAlign: "end" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCustomers}
            >
              Add customers
            </Button>
          </Col>
          <Col span={24}>
            <Table
              columns={customerColumn}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              dataSource={customerData}
              loading={loading}
              rowKey="SKU"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CustomerListPage;
