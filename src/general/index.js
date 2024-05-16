import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducers/user";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
const GeneraIndexPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const menuitems = [
    {
      label: "Home",
    },
    {
      label: "Face Wash",
    },
    {
      label: "Soap",
    },
    {
      label: "Face Mask",
    },
  ];

  const handleSignup = () => {
    const updatedUserInfo = {
      username: document.getElementById("usernameInput").value,
      email: document.getElementById("emailInput").value,
      password: document.getElementById("passwordInput").value,
      isAdmin: true,
    };

    dispatch(setUser(updatedUserInfo));
    console.log("Signup form values:", updatedUserInfo);
    setIsModalVisible(false);
    navigate("/dashboard");
  };

  return (
    <Row>
      <Col span={24}>
        <Layout>
          <Header style={{ backgroundColor: "#ffffff" }}>
            <Row align="middle">
              <Col span={4}>
                <Image
                  src="./images/logo.png"
                  style={{ width: "60px", height: "60px" }}
                />
              </Col>
              <Col span={16}>
                <Menu
                  mode="horizontal"
                  items={menuitems}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                />
              </Col>
              <Col span={4}>
                <Flex gap="large" justify="end">
                  <SearchOutlined style={{ fontSize: "18px" }} />
                  <ShoppingCartOutlined style={{ fontSize: "18px" }} />
                  <UserOutlined
                    onClick={handleShowModal}
                    style={{ fontSize: "18px" }}
                  />
                </Flex>
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>
                {/* Access userInfo from useSelector here to display data conditionally */}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Col>

      <Modal
        title="Signup"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={() => handleSignup()}>
            Signup
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input id="usernameInput" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input id="emailInput" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password id="passwordInput" />
          </Form.Item>
          <Form.Item label="Admin" name="isAdmin">
            <Checkbox>Grant Admin Privileges</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default GeneraIndexPage;
