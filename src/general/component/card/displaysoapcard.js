import { Card, Col, Image, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import product1 from "../../asset/image/product.jpg";
import "../../asset/less/typography-ls.less";
import "../../asset/less/card.less";
import { Link } from "react-router-dom";
import { getAllProductDetails } from "../../api/product";

const Displaycard = ({ category }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
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

  const filteredItems = productData.filter(product => product.category.name === category);

  return (
    <Row gutter={[16, 16]}>
      {filteredItems.map((product) => {
        const imageUrl = product.imageUrl
          ? `http://localhost:4001/${product.imageUrl}`
          : product1;

        return (
          <Col key={product._id} span={6} xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card className="product-card">
              <Row>
                <Col
                  span={24}
                  className="case-bg"
                >
                     <Image
          src={imageUrl}
          preview={false}
          style={{ height: "200px%" }}
        />
                </Col>
                <Col
                  span={24}
                  align="start"
                  style={{
                    padding: "15px 20px 5px 20px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography className="ez-ls-h4 black-green">
                    {product.title}
                  </Typography>
                  <Typography className="ez-ls-h6 black-green">
                    Rs. {product.price}
                  </Typography>
                </Col>
                <Col
                  span={24}
                  align="start"
                  style={{ padding: "15px 20px 5px 20px" }}
                >
                  <Typography className="ez-ls-h6 red">
                    Up to {product.discountPersent}% OFF
                  </Typography>
                </Col>
                <Col span={24} align="start" style={{ padding: "0 20px" }}>
                  <Link to={`/productdetails/${product._id}`}>
                    <Space align="center">
                      <Typography className="ez-ls-h6 primary">
                        Buy now{" "}
                      </Typography>
                      <ArrowRightOutlined className="arrow-icon primary" />
                    </Space>
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Displaycard;
