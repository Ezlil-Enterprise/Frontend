import { Breadcrumb, Col, Row, Typography } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { MB20 } from "../../component/widget";
import Displaysoapcard from "../../component/card/displaysoapcard";
import Displaycard from "../../component/card/displaysoapcard";
import Footercomponent from "../../component/card/footer";
const Soaps = () => {
  return (
    <Row>
      <Col span={24}>
        <Row className="container">
          <Col span={24}>
            <Typography className="ez-ls-h2 bold">
              Ezlil's Natural Soaps
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
                  title: "Soaps",
                },
              ]}
            />
          </Col>
          <MB20 />
          <Col span={24}>
            <Displaycard category={"Soap"} />
          </Col>
        </Row>
        <Footercomponent />
      </Col>
    </Row>
  );
};

export default Soaps;
