import { Card, Col, Flex, Row, Space, Tag, Typography } from "antd";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import product1 from "../../asset/image/product.jpg";
import "../../asset/less/typography-ls.less";
import "../../asset/less/card.less";
import Link from "antd/es/typography/Link";
const Displayfacewashcard = () => {
  return (
    <Row gutter={[16,16]}>
      <Col span={6} xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card className="product-card">
          <Row>
            <Col
              span={24}
              className="case-bg"
              style={{ backgroundImage: `url(${product1})` }}
            ></Col>

            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px", backgroundColor: "#fff" }}
            >
              <Typography className="ez-ls-h4 black">
                Rose Petal face wash
              </Typography>

              <Typography className="ez-ls-h6 black">Rs.160</Typography>
            </Col>
            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px" }}
            >
              <Typography className="ez-ls-h6 red">Up to 10% OFF</Typography>
            </Col>
            <Col span={24} align="start" style={{ padding: "0 20px" }}>
              <Link to="/">
                <Space align="center">
                  <Typography className="ez-ls-h6 primary">Buy now </Typography>
                  <ArrowRightOutlined className="arrow-icon primary" />
                </Space>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6} xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card className="product-card">
          <Row>
            <Col
              span={24}
              className="case-bg"
              style={{ backgroundImage: `url(${product1})` }}
            ></Col>

            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px", backgroundColor: "#fff" }}
            >
              <Typography className="ez-ls-h4 black">
                Rose Petal face wash
              </Typography>

              <Typography className="ez-ls-h6 black">Rs.160</Typography>
            </Col>
            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px" }}
            >
              <Typography className="ez-ls-h6 red">Up to 10% OFF</Typography>
            </Col>
            <Col span={24} align="start" style={{ padding: "0 20px" }}>
              <Link to="/">
                <Space align="center">
                  <Typography className="ez-ls-h6 primary">Buy now </Typography>
                  <ArrowRightOutlined className="arrow-icon primary" />
                </Space>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6} xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card className="product-card">
          <Row>
            <Col
              span={24}
              className="case-bg"
              style={{ backgroundImage: `url(${product1})` }}
            ></Col>

            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px", backgroundColor: "#fff" }}
            >
              <Typography className="ez-ls-h4 black">
                Rose Petal face wash
              </Typography>

              <Typography className="ez-ls-h6 black">Rs.160</Typography>
            </Col>
            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px" }}
            >
              <Typography className="ez-ls-h6 red">Up to 10% OFF</Typography>
            </Col>
            <Col span={24} align="start" style={{ padding: "0 20px" }}>
              <Link to="/">
                <Space align="center">
                  <Typography className="ez-ls-h6 primary">Buy now </Typography>
                  <ArrowRightOutlined className="arrow-icon primary" />
                </Space>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6} xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card className="product-card">
          <Row>
            <Col
              span={24}
              className="case-bg"
              style={{ backgroundImage: `url(${product1})` }}
            ></Col>

            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px", backgroundColor: "#fff" }}
            >
              <Typography className="ez-ls-h4 black">
                Rose Petal face wash
              </Typography>

              <Typography className="ez-ls-h6 black">Rs.160</Typography>
            </Col>
            <Col
              span={24}
              align="start"
              style={{ padding: "15px 20px 5px 20px" }}
            >
              <Typography className="ez-ls-h6 red">Up to 10% OFF</Typography>
            </Col>
            <Col span={24} align="start" style={{ padding: "0 20px" }}>
              <Link to="/">
                <Space align="center">
                  <Typography className="ez-ls-h6 primary">Buy now </Typography>
                  <ArrowRightOutlined className="arrow-icon primary" />
                </Space>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Displayfacewashcard;
