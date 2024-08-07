import React from "react";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MB05 } from "../../../general/component/widget";

const Dashboard = () => {
  return (
    <Row gutter={[16, 16]} className="common-padding">
      <Col span={24}>
        <Typography className="ez-ls-h4 bold">Dashboard</Typography>
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
            <Typography className="ez-ls-h4 bold">Dashboard</Typography>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;
