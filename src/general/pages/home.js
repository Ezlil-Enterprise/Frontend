import React, { useEffect } from "react";
import { Col, Flex, Row, Tabs, Typography } from "antd";
import Homepicbanner from "../component/homepicbanner";
import Soapboard from "../asset/image/board1.jpg";
import FaceSerumboard from "../asset/image/board2.jpg";
import FaceWashboard from "../asset/image/board3.jpg";
import "../asset/css/home.less";
import "../asset/css/typography-ls.less";
import "../asset/css/typography-ns.less";
import AOS from "aos";
import "aos/dist/aos.css";

import { RightOutlined } from "@ant-design/icons";
import Displaysoapcard from "../component/card/displaysoapcard";
const Home = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  const tabitems = [
    {
      key: "soap",
      label: "Soap",
      children: (<Displaysoapcard/>),
    },
    {
      key: "face_serum",
      label: "Face Serum",
      children: "Content of Tab Pane 3",
    },
    {
      key: "face_wash",
      label: "Face Wash",
      children: "Content of Tab wash",
    },
    {
      key: "face_mask",
      label: "Face Mask",
      children: "Content of Tab Mask",
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <Homepicbanner />
      </Col>
      <Col span={12} className="container">
        <Typography className="ez-ls-h1 black">
          Explore the Ezlil collection
        </Typography>
      </Col>
      <Col span={12} className="container">
        <Flex vertical gap="small">
          <Typography className="ez-ls-h2 primary">
            Discover the difference pure ingredients make. Ezlil offers
            handcrafted organic soaps to pamper and revitalize, elevating your
            shower routine. Find the perfect blend for your needs.
          </Typography>
          <Flex align="center">
            {" "}
            <Typography className="ez-ls-h5 primary">
              Find your glow <RightOutlined className="arrow-icon" />
            </Typography>
          </Flex>
        </Flex>
      </Col>
      <Col
        span={24}
        className="product-banner"
        style={{
          backgroundImage: `url(${Soapboard})`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{ zIndex: 2 }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {" "}
            <Typography className="ez-ns-h1 secondary bold">Soaps</Typography>
            <Typography className="ez-ls-h4 brand-green bold">
              Organic love. Cleanse. Glow. Happy shower.
            </Typography>
            <Typography className="ez-ls-h5 brand-green underline">
              shop now
            </Typography>
          </Col>{" "}
          <Col span={24} className="product-banner__overlay"></Col>
        </Row>
      </Col>
      <Col
        span={24}
        className="product-banner"
        style={{
          backgroundImage: `url(${FaceSerumboard})`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{ zIndex: 2 }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {" "}
            <Typography className="ez-ns-h1 secondary bold">
              Face Serum
            </Typography>
            <Typography className="ez-ls-h4 brand-green bold">
              Earth-to-glow serum. Soft, radiant skin.
            </Typography>
            <Typography className="ez-ls-h5 brand-green underline">
              shop now
            </Typography>
          </Col>
          <Col span={24} className="product-banner__overlay"></Col>
        </Row>
      </Col>
      <Col
        span={24}
        className="product-banner"
        style={{
          backgroundImage: `url(${FaceWashboard})`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{ zIndex: 2 }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {" "}
            <Typography className="ez-ns-h1 secondary bold">
              Face Wash
            </Typography>
            <Typography className="ez-ls-h4 brand-green bold">
              Gentle organic wash. Clean, radiant, healthy you.
            </Typography>
            <Typography className="ez-ls-h5 brand-green underline">
              shop now
            </Typography>
          </Col>
          <Col span={24} className="product-banner__overlay"></Col>
        </Row>
      </Col>
      <Col span={24} align="center" className="container">
        <Typography className="ez-ls-h2 bold">This Week’s Hot Picks</Typography>
        <Tabs defaultActiveKey="soap" items={tabitems} />
      </Col>
    </Row>
  );
};

export default Home;
