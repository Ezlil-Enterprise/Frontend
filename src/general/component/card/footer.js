import { Col, Divider, Flex, Image, Row, Space, Typography } from "antd";
import "../../asset/less/footer.less";
import WhiteLogo from "../../asset/image/white-logo.png";
import {
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  XOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import React from "react";
import { MB05, MB10, MB20, MB30 } from "../widget";

const Footercomponent = () => {
  return (
    <Row className="footer-container" style={{ backgroundColor: "#083300" }}>
      <Col span={2}>
        <Image src={WhiteLogo} preview={false} className="footer-title-image" />
      </Col>
      <Col span={22} className="footer-title">
        <Typography className="ez-ns-h5 typo-green">
          Shop with confidence. Ezlil creates secure and reliable platforms for
          natural beauty brands, making your shopping experience smooth and
          easy.
        </Typography>
      </Col>
      <Col span={24}>
        <MB20 />
      </Col>
      <Col span={16}>
        <Space>
          <GlobalOutlined className="social-media-icon typo-green" />
          <Typography className="ez-ls-h6 typo-green">Erode</Typography>
        </Space>

        <MB05 />
        <Space>
          <MailOutlined className="social-media-icon typo-green" />
          <Typography className="ez-ls-h6 typo-green">
            ezlil.enterprise@gmail.com
          </Typography>
        </Space>

        <MB05 />
        <Flex gap="large">
          <InstagramOutlined className="social-media-icon brand-green" />
          <FacebookOutlined className="social-media-icon brand-green" />
          <LinkedinOutlined className="social-media-icon brand-green" />
          <XOutlined className="social-media-icon brand-green" />
        </Flex>
      </Col>
      <Col span={4}>
        <Flex vertical gap="small">
          <Typography className="ez-ls-h6 typo-green bold">Products</Typography>
          <Typography className="ez-ls-h6 typo-green">Soap</Typography>
          <Typography className="ez-ls-h6 typo-green">Face Serum</Typography>
          <Typography className="ez-ls-h6 typo-green">Face wash</Typography>
          <Typography className="ez-ls-h6 typo-green">Face Mask</Typography>
        </Flex>
      </Col>
      <Col span={4}>
        {" "}
        <Flex vertical gap="small">
          <Typography className="ez-ls-h6 typo-green bold">About</Typography>
          <Typography className="ez-ls-h6 typo-green">Overview </Typography>
          <Typography className="ez-ls-h6 typo-green">Partnerships</Typography>
          <Typography className="ez-ls-h6 typo-green">Awards and Recognitions</Typography>
        </Flex>
      </Col>
     <Divider style={{backgroundColor:"#DCFFD5"}}/>
     <Col span={24}>
     <Flex justify='space-between'>
        <Typography className="ez-ns-h6 typo-green">Privacy Policy</Typography>
        <Typography className="ez-ns-h6 typo-green">© Copyright 2024. All Rights Reserved.</Typography>
        <Typography className="ez-ns-h6 typo-green">Terms & Conditions</Typography>
     </Flex>
     </Col>
    </Row>
  );
};

export default Footercomponent;
