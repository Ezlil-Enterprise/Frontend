import React from "react";
import { Col, Flex, Row, Space, Typography } from "antd";
import Homepicbanner from "../component/homepicbanner";
import "../asset/css/typography-v1.less";
import { RightOutlined } from "@ant-design/icons";
const Home = () => {
  return (
    <Row>
      <Col span={24}>
        <Homepicbanner />
      </Col>
      <Col span={12} className="container">
        <Typography className="ez-v1-h1 black">
          Explore the Ezlil collection
        </Typography>
      </Col>
      <Col span={12} className="container">
        <Flex vertical gap='small'>
          <Typography className="ez-v1-h3 primary">
            Discover the difference pure ingredients make. Ezlil offers
            handcrafted organic soaps to pamper and revitalize, elevating your
            shower routine. Find the perfect blend for your needs.
          </Typography>
          <Flex align='center'>  <Typography className="ez-v1-h5 primary" >Find your glow <RightOutlined  className="arrow-icon"/></Typography></Flex>     
          
           
        </Flex>
      </Col>
      <Col span={24} >

      </Col>
    </Row>
  );
};

export default Home;
