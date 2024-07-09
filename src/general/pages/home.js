import React, { useEffect, useState } from "react";
import { Col, Flex, Row, Space, Tabs, Typography, Image, Card } from "antd";
import Homepicbanner from "../component/homepicbanner";
import Soapboard from "../asset/image/board1.jpg";
import FaceSerumboard from "../asset/image/board2.jpg";
import FaceWashboard from "../asset/image/board3.jpg";
import "../asset/less/home.less";
import "../asset/less/typography-ls.less";
import "../asset/less/typography-ns.less";
import Prhelpdesk from "../asset/image/contact_us.svg";
import Messageinfo from "../asset/image/messageinfo.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { MB10, MB100, MB20, MB30 } from "../component/widget";
import { RightOutlined } from "@ant-design/icons";
import Displaysoapcard from "../component/card/displaysoapcard";
import Displayserumcard from "../component/card/displayserumcard";
import Displayfacewashcard from "../component/card/displayfacewashcard";

import Link from "antd/es/typography/Link";
import Footercomponent from "../component/card/footer";
import { getAllProductDetails } from "../api/product";
const HomeLanding = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    AOS.init({});
    const fetchProductData = async () => {
      try {
        const response = await getAllProductDetails();
        console.log("Fetched Product Data:", response);
        setProductData(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductData();
  }, []);

  const tabitems = [
    {
      key: "soap",
      label: "Soap",
      children: <Displaysoapcard />,
    },
    {
      key: "face_serum",
      label: "Face Serum",
      children: <Displayserumcard />,
    },
    {
      key: "face_wash",
      label: "Face Wash",
      children: <Displayfacewashcard />,
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
        <Typography className="ez-ls-h1 black-green">
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
      <Col span={24} align="center">
        {" "}
        <Link to="/">
          <Space align="center">
            <Typography className="ez-ls-h6 underline primary">
              view all{" "}
            </Typography>
            <RightOutlined className="arrow-icon primary" />
          </Space>
        </Link>
      </Col>

      <Col span={24} className="container">
        <Typography className="ez-ls-h2 bold" style={{ textAlign: "center" }}>
          Support
        </Typography>
        <MB20 />
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Card
              style={{
                padding: "20px",
                borderRadius: "12px",
                height: "310px",
              }}
            >
              {" "}
              <Row>
                <Col span={12}>
                  <Flex vertical>
                    <Typography className="ez-ls-h5 gray">
                      One-on-One with Ezlil
                    </Typography>
                    <Typography className="ez-ls-h3 bold black-green">
                      Your personal helpdesk
                    </Typography>
                    <MB20 />
                    <Typography>
                      At Ezlil, we prioritize your experience with friendly
                      support, making your shopping experience personal.
                    </Typography>
                    <MB10 />
                    <Typography className="ez-ls-h6 black-green underline">
                      Let's chat
                    </Typography>
                  </Flex>
                </Col>
                <Col span={12}>
                  <Image src={Messageinfo} preview={false} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{
                padding: "20px",
                borderRadius: "12px",
                height: "310px",
              }}
            >
              {" "}
              <Row>
                <Col span={12}>
                  <Flex vertical>
                    <Typography className="ez-ls-h5 gray">
                      Ezlil Care
                    </Typography>
                    <Typography className="ez-ls-h3 bold black-green">
                      Our Support team is here to help
                    </Typography>
                    <MB20 />
                    <Typography>
                      The best option depends on what aspect you want to
                      emphasize: Ezlil's role, the benefits of franchising, or a
                      call to action.
                    </Typography>
                    <MB10 />
                    <Typography className="ez-ls-h6 black-green underline">
                      Explore more
                    </Typography>
                  </Flex>
                </Col>
                <Col span={12}>
                  <Image src={Prhelpdesk} preview={false} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Footercomponent />
      </Col>
    </Row>
  );
};

export default HomeLanding;
