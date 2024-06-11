import React from "react";
import { Col, Row, Space, Typography } from "antd";
import Land from "../asset/image/landing.jpg";
import "../asset/css/typography-ls.less";
import "../asset/css/global.less";
const Homepicbanner = () => {
  return (
    <Row style={{ height: "90vh" }}>
      <Col
        span={24}
        className="home-landing-banner"
        style={{
          backgroundImage: `url(${Land})`,
        
        }}
      >
        <Space direction='vertical'>
          {" "}
          <Typography className="ez-ls-h1 secondary">
            Ezlil Solutions
          </Typography>
          <Typography className="ez-ls-h3 brand-green">
            Experience the difference organic makes. Crafted with pure,
            plant-based ingredients, our soaps gently cleanse and nourish,
            leaving your skin feeling soft and radiant. Shop now and discover a
            healthier shower routine.
          </Typography>
          <Typography className="ez-ls-h5 brand-green underline">Join Now</Typography>
        </Space>
      </Col>
    </Row>
  );
};

export default Homepicbanner;
