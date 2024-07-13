import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  addCategory,
  deleteCategory,
  getAllCategoryDetails,
} from "../../api/category";
import Cookies from "js-cookie";
import Search from "antd/es/transfer/search";

const CategoryListPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [mastervisible, setMasterVisible] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await getAllCategoryDetails(userToken);
        setCategoryData(categoryResponse);
      } catch (error) {
        console.log("Error:", error);
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
  const handleDeleteProduct = async (id) => {
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
        <DeleteOutlined
          style={{ color: "#ff0000" }}
          onClick={() => handleDeleteProduct(record._id)}
        />
      ),
    },
  ];
  return (
    <Row gutter={[16, 16]} style={{ padding: "15px" }}>
      <Col span={24}>
        <Typography>Category List</Typography>
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
            <Table columns={categoryColumn} dataSource={categoryData} />
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
