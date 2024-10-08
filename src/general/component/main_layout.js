import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Avatar, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../../store/reducers/user";
import {
  SearchOutlined,
  BellOutlined,
  MoonOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LeftMenu from "../../admin/components/left_menu.js";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../api/authentication.js";
import { getAvatarColor, getInitials } from "../../utlils/general.js";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userToken = Cookies.get("user_token");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken) {
        const userInfoResponse = await getUserDetails(userToken);
        dispatch(setUser(userInfoResponse));
      }
    };

    fetchUserInfo();
  }, [location.pathname, userToken, dispatch]);

  const handleLogout = () => {
    Cookies.remove("user_token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {userInfo?.role === "SuperAdmin" ? (
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
                    <BellOutlined />
                    <LogoutOutlined onClick={handleLogout} />
                    <Avatar
                      style={{
                        backgroundColor: getAvatarColor(getInitials(userInfo)),
                      }}
                    >
                      {getInitials(userInfo)}
                    </Avatar>
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
