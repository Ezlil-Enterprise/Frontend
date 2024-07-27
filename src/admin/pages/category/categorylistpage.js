import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import {
  addCategory,
  deleteCategory,
  getAllCategoryDetails,
} from "../../api/category";
import Cookies from "js-cookie";
import Search from "antd/es/transfer/search";
import { MB05 } from "../../../general/component/widget";

const CategoryListPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [mastervisible, setMasterVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await getAllCategoryDetails(userToken);
        setCategoryData(categoryResponse);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);
  const handleAddCategoryModal = () => {
    setMasterVisible(true);
  };
  const handleCancel = () => {
    setMasterVisible(false);
    form.resetFields();
  };
  const handleAddCategory = async (values) => {
    try {
      const addCategoryResponse = await addCategory(userToken, values);
      if (addCategoryResponse) {
        handleCancel();
        const updatedCategoryData = await getAllCategoryDetails(userToken);
        setCategoryData(updatedCategoryData);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleDeleteCategory = async (id) => {
    const deleteCategoryResponse = await deleteCategory(userToken, id);
    if (deleteCategoryResponse) {
      const updatedCategoryData = await getAllCategoryDetails(userToken);
      setCategoryData(updatedCategoryData);
    }
  };
  const categoryColumn = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
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
          onConfirm={() => handleDeleteCategory(record._id)}
        >
          <DeleteOutlined style={{ color: "#ff0000" }} />
        </Popconfirm>
      ),
    },
  ];
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
        <Typography className="ez-ls-h4 bold">Categories</Typography>
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
              title: "Categories",
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
              onClick={handleAddCategoryModal}
            >
              Add Category
            </Button>
          </Col>
          <Col span={24}>
            {" "}
            <Table
              columns={categoryColumn}
              dataSource={categoryData}
              // rowSelection={{
              //   type: "checkbox",
              //   ...rowSelection,
              // }}
              loading={loading}
              rowKey="name"
            />
          </Col>
        </Row>
      </Col>
      <Modal
        open={mastervisible}
        title="Add Category"
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleAddCategory}>
          <Form.Item name="name">
            <Input placeholder="Eg: Soap" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default CategoryListPage;
