import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/user";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
  RightOutlined,
  LogoutOutlined,
  TagOutlined,
} from "@ant-design/icons";
import "./asset/less/authentication.less";
import {
  getUserDetails,
  getUserDetailsByEmail,
  userSignin,
  userSignup,
} from "./api/authentication";
import Cookies from "js-cookie";
import Home from "./pages/home";
import HomeLanding from "./pages/home";
import Orders from "./pages/orders";
import Soaps from "./pages/products/soaps";
import Facewash from "./pages/products/facewash";
import Productdisplay from "./component/productdisplay";

const GeneraIndexPage = () => {
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [signUpForm] = Form.useForm();
  const [signInForm] = Form.useForm();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleShowSignUpModal = () => {
    signUpForm.resetFields();
    setIsSignUpModalVisible(true);
  };

  const handleShowSignInModal = () => {
    signInForm.resetFields();
    setIsSignInModalVisible(true);
  };

  const handleCancel = () => {
    setIsSignUpModalVisible(false);
    setIsSignInModalVisible(false);
  };

  const handleSignUp = async () => {
    try {
      const values = await signUpForm.validateFields();

      const userSignUpResponse = await userSignup(values);
      if (userSignUpResponse) {
        message.success("Signup successful!");
        Cookies.set("user_token", userSignUpResponse.email, {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        setIsSignUpModalVisible(false);
        if (userSignUpResponse.role === "SuperAdmin") navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const values = await signInForm.validateFields();
      const userSignInResponse = await userSignin(values);
      console.log(userSignInResponse);
      if (userSignInResponse) {
        message.success("Signin successful!");
        if (userSignInResponse.role === "SuperAdmin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        Cookies.set("user_token", userSignInResponse.data.jwt, {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        const userToken = userSignInResponse.data.jwt;
        const userDetailsResponse = await getUserDetails(userToken);

        setIsSignInModalVisible(false);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error(`Error: ${error.response.statusText}`);
      }
    } else if (error.request) {
      message.error("Network error. Please try again.");
    } else {
      message.error("An unknown error occurred.");
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_email");
    dispatch(logout());
    navigate("/");
  };
  const handleOrdersClick = () => {
    window.location.href = "/orders";
  };
  const menuitems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "face-wash", label: <Link to="/facewash">Face Wash</Link> },
    { key: "soap", label: <Link to="/soaps">Soap</Link> },
    { key: "face-mask", label: "Face Mask" },
  ];

  const userMenu = (
    <Row
      style={{
        backgroundColor: "#f5f5f5",
        width: "280px",
        padding: "20px",
        borderRadius: "15px",
      }}
      align="middle"
      justify="center"
      gutter={[16, 16]}
    >
      <Col span={5}>
        <Avatar size="large" icon={<UserOutlined />} />
      </Col>
      <Col span={19}>
        <Row>
          <Col span={24}>
            {userInfo ? (
              <>
                <Flex vertical justify="right" align="start">
                  {" "}
                  <Typography>Welcome {userInfo.firstName}</Typography>
                  <Link onClick={handleLogout}>Logout</Link>
                </Flex>
              </>
            ) : (
              <>
                <Typography>Welcome to Ezlil</Typography>
                <Button type="link" onClick={handleShowSignInModal}>
                  Sign in
                </Button>
                <Button type="link" onClick={handleShowSignUpModal}>
                  Sign up
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={24} onClick={handleOrdersClick}>
        <Flex justify="space-between">
          <Typography>
            <Space>
              <OrderedListOutlined />
              Orders
            </Space>
          </Typography>
          <Typography>
            <RightOutlined />
          </Typography>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex justify="space-between">
          <Typography>
            <Space>
              <UserOutlined />
              Account
            </Space>
          </Typography>
          <Typography>
            <RightOutlined />
          </Typography>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex justify="space-between">
          <Typography>
            <Space>
              <TagOutlined />
              Copoun
            </Space>
          </Typography>
          <Typography>
            <RightOutlined />
          </Typography>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex justify="space-between">
          <Typography>
            <Space>
              <LogoutOutlined />
              Logout
            </Space>
          </Typography>
          <Typography>
            <RightOutlined />
          </Typography>
        </Flex>
      </Col>
    </Row>
  );

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
              <Col span={12}>
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
              <Col
                span={8}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <SearchOutlined
                  style={{ fontSize: "1.4em", marginRight: "20px" }}
                />
                <ShoppingCartOutlined
                  style={{ fontSize: "1.4em", marginRight: "20px" }}
                />
                <Dropdown overlay={userMenu}>
                  <UserOutlined style={{ fontSize: "1.4em" }} />
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>
                <Routes basepath="/">
                  <Route path="/*" element={<HomeLanding />} />
                  <Route path="/orders/*" element={<Orders />} />
                  <Route path="/soaps/*" element={<Soaps />} />
                  <Route path="/facewash/*" element={<Facewash />} />
                  <Route path="/productdetails" element={<Productdisplay />} />
                </Routes>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Col>

      <Modal
        open={isSignUpModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Form
          layout="vertical"
          style={{ backgroundColor: "#F5F5F5" }}
          form={signUpForm}
        >
          <Typography.Title level={4}>Sign up/Create Account</Typography.Title>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              id="usernameInput"
              placeholder="Username"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              id="usernameInput"
              placeholder="Username"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              id="emailInput"
              placeholder="Email"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              addonBefore="+91"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              id="passwordInput"
              placeholder="Password"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              key="submit"
              type="primary"
              onClick={handleSignUp}
              style={{
                width: "40%",
                borderRadius: "25px",
                backgroundColor: "#066F39",
              }}
            >
              Signup
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        open={isSignInModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Form
          layout="vertical"
          style={{ backgroundColor: "#F5F5F5" }}
          form={signInForm}
        >
          <Typography.Title level={4}>Sign in</Typography.Title>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              id="emailInput"
              placeholder="Email"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              id="passwordInput"
              placeholder="Password"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              key="submit"
              type="primary"
              onClick={handleSignIn}
              style={{
                width: "40%",
                borderRadius: "25px",
                backgroundColor: "#066F39",
              }}
            >
              Signin
            </Button>
          </div>
        </Form>
      </Modal>
    </Row>
  );
};

export default GeneraIndexPage;
