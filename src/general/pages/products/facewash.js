import { Breadcrumb, Col, Row, Typography } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { MB20 } from "../../component/widget";
import Displayfacewashcard from "../../component/card/displayfacewashcard";

const Facewash = () => {
  return (
    <Row className="container">
      <Col span={24}>
        <Typography className="ez-ls-h2 bold">
          Ezlil's Natural Face Wash
        </Typography>
      </Col>
      <MB20 />
      <Col span={24}>
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: <span>Collection</span>,
            },
            {
              title: "Face Wash",
            },
          ]}
        />
      </Col>
      <MB20 />
      <Col span={24}>
        <Displayfacewashcard />
      </Col>
    </Row>
  );
};

export default Facewash;
