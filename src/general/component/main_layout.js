import React from "react";
import { Layout, Row, Col, Avatar, Input, Flex } from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined, BellOutlined, MoonOutlined } from "@ant-design/icons";
import LeftMenu from "./left_menu";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  return (
    <>
      {userInfo?.isAdmin == true ? (
        <Layout className="main-layout">
          <LeftMenu />
          <Layout className="main-right">
            <Header style={{ backgroundColor: "#ffffff", zIndex: 999 }}>
              <Row align="middle">
                <Col span={8}>
                  <Input placeholder="Search" prefix={<SearchOutlined />} />
                </Col>
                <Col span={16}>
                  <Flex gap="large" align="center" justify="end">
                    <MoonOutlined />
                    <BellOutlined />
                    <Avatar src="./images/user.jpg" />
                  </Flex>
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
