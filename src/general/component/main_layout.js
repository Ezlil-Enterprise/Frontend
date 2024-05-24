import React, { useEffect } from "react";
import { Layout, Row, Col, Avatar, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../../store/reducers/user";
import {
  SearchOutlined,
  BellOutlined,
  MoonOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LeftMenu from "./left_menu";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    } else {
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
    if (location.pathname === "/") {
      dispatch(logout());
    }
  }, [dispatch, location.pathname, navigate]);

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {userInfo?.email === "adm@gmail.com" ? (
        <Layout className="main-layout">
          <LeftMenu />
          <Layout className="main-right">
            <Header style={{ backgroundColor: "#ffffff", zIndex: 999 }}>
              <Row align="middle">
                <Col span={8}>
                  <Input placeholder="Search" prefix={<SearchOutlined />} />
                </Col>
                <Col span={16}>
                  <Space
                    size="large"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <MoonOutlined />
                    <BellOutlined />
                    <LogoutOutlined onClick={handleLogout} />
                    <Avatar src="./images/user.jpg" />
                  </Space>
                </Col>
              </Row>
            </Header>
            <div className="content-wrapper">
              <Content className="content">{children}</Content>
            </div>
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <Content className="content">{children}</Content>
        </Layout>
      )}
    </>
  );
};

export default MainLayout;
