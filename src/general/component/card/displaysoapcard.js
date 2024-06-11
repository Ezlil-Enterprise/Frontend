import { Card, Col, Flex, Row, Tag, Typography } from 'antd';
import React from 'react';
import { ArrowRightOutlined } from "@ant-design/icons";
import product1 from "../../asset/image/product.jpg";
import "../../asset/css/typography-ls.less"
import "../../asset/less/card.less";
import Link from 'antd/es/typography/Link';
const Displaysoapcard = () => {
    return (
        <Row>
           <Col span={8} xs={24} sm={24} md={12} lg={8} xl={8}>
                      <Card className="product-card">
                        <Row  >
                          <Col
                            span={24}
                            className="case-bg"
                            style={{ backgroundImage: `url(${product1})` }}
                          >
                          </Col>

                          <Col span={24} align='start'>
                          <Typography className="ez-ls-h4 black">
                               Rose
                              </Typography>
                           
                              <Typography className="ez-ls-h6 black">
                               Rs.180
                              </Typography>
                          </Col>
                          <Col span={24} align='start'>
                            <Link to="/">
                            <Typography>Buy now <ArrowRightOutlined className="arrow-icon" /></Typography>
                              
                            </Link>
                          </Col>

                          <Col
                            span={24}
                          >
                            <Flex gap="4px 0" wrap>
                              <Tag color="geekblue">Top Seller</Tag>
                              <Tag color="purple">Seamless</Tag>
                            </Flex>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
            <Col span={8}>
          
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
        </Row>
    );
};

export default Displaysoapcard;