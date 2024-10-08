import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
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
import { setUser, logout } from "../store/reducers/user";
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
  getUserDetailsByID,
  userSignin,
  userSignup,
} from "./api/authentication";
import Cookies from "js-cookie";
import Home from "./pages/home";
import HomeLanding from "./pages/home";
import Orders from "./pages/orders";
import Soaps from "./pages/products/soaps";
import Facewash from "./pages/products/shampoo";
import Productdisplay from "./component/productdisplay";
import Cart from "./pages/cart";
import AddressInfo from "./pages/address";
import Checkout from "./pages/checkout";
import { getAvatarColor, getInitials } from "../utlils/general";
import logo from "../general/asset/image/logo.png";
import { getCartDetails } from "./api/cart";

const GeneraIndexPage = () => {
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [signUpForm] = Form.useForm();
  const [signInForm] = Form.useForm();
  const [cartItemCount, setCartItemCount] = useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));

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
  useEffect(() => {
    fetchCartData();
  }, []);
  const handleSignUp = async () => {
    try {
      const values = await signUpForm.validateFields();
      const userSignUpResponse = await userSignup(values);
      if (userSignUpResponse) {
        message.success("Signup successful!");
        Cookies.set("user_token", userSignUpResponse.data.jwt, {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        const userDetailsResponse = await getUserDetailsByID(
          userSignUpResponse.data.jwt
        );
        dispatch(setUser(userDetailsResponse));

        setIsSignUpModalVisible(false);
        if (userDetailsResponse.role === "SuperAdmin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const values = await signInForm.validateFields();
      const userSignInResponse = await userSignin(values);
      if (userSignInResponse) {
        message.success("Signin successful!");

        Cookies.set("user_token", userSignInResponse.data.jwt, {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        const userToken = userSignInResponse.data.jwt;
        const userDetailsResponse = await getUserDetails(userToken);
        dispatch(setUser(userDetailsResponse));

        setIsSignInModalVisible(false);
        if (userDetailsResponse.role === "SuperAdmin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
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
    Cookies.remove("user_token");
    dispatch(logout());
    navigate("/");
  };

  const handleOrdersClick = () => {
    navigate("/orders");
  };
  const fetchCartData = async () => {
    try {
      if (userToken) {
        const cartDataResponse = await getCartDetails(userToken);
        const cartItems = cartDataResponse?.cartItems || [];
        setCartItemCount(cartItems.length);
      }
    } catch (error) {
      message.error("Error:", error);
    }
  };
  const menuitems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "shampoo", label: <Link to="/shampoo">Shampoo</Link> },
    { key: "soap", label: <Link to="/soaps">Soap</Link> },
    { key: "about", label: <Link to="/about">About</Link> },
    { key: "contact", label: <Link to="/contact">Contact</Link> },
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
        <Avatar
          style={{ backgroundColor: getAvatarColor(getInitials(userInfo)) }}
        >
          {getInitials(userInfo)}
        </Avatar>
      </Col>
      <Col span={19}>
        <Row>
          <Col span={24}>
            {userInfo ? (
              <>
                <Flex vertical justify="right" align="start">
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
        <Link to="/address_info">
          <Flex justify="space-between">
            <Typography>
              <Space>
                <TagOutlined />
                Address
              </Space>
            </Typography>
            <Typography>
              <RightOutlined />
            </Typography>
          </Flex>
        </Link>
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
                  src={logo}
                  style={{ width: "60px", height: "60px" }}
                  preview={false}
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
                    border: "none",
                  }}
                />
              </Col>
              <Col
                span={8}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Flex gap="small">
                  {" "}
                  <SearchOutlined
                    style={{ fontSize: "1.4em", marginRight: "15px" }}
                  />
                  <Dropdown overlay={userMenu}>
                    <UserOutlined
                      style={{ fontSize: "1.4em", marginRight: "15px" }}
                    />
                  </Dropdown>
                  <Badge count={cartItemCount} offset={[10, 0]} showZero>
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px" }}
                      onClick={() => navigate("/cart")}
                    />
                  </Badge>
                </Flex>
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>
                <Routes basepath="/">
                  <Route path="/" element={<HomeLanding />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/soaps" element={<Soaps />} />
                  <Route path="/shampoo" element={<Facewash />} />
                  <Route
                    path="/productdetails/:id"
                    element={<Productdisplay />}
                  />
                  <Route path="/address_info" element={<AddressInfo />} />
                  <Route path="/checkout" element={<Checkout />} />
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
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              placeholder="First Name"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input
              placeholder="Last Name"
              size="large"
              style={{ borderRadius: "15px" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
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
