import React from "react";
import { Button, Carousel, Col, Row, Image, Typography } from "antd";
import Demo from "../asset/image/demo_product.png";
import "../asset/less/typography-ls.less";
import "../asset/css/global.css";
import { MB10 } from "./widget";

const Homepicbanner = () => {
  return (
    <Row style={{ padding: "48px", backgroundColor: "#fff" }}>
      <Col
        span={24}
        style={{ backgroundColor: "#D5DCD7", borderRadius: "24px" }}
      >
        <Carousel effect="fade">
          <div>
            <Row style={{ padding: "48px" }}>
              <Col span={24}>
                <Typography className="ez-ls-h4 gray_v2">Skincare</Typography>
              </Col>
              <Col span={24}>
                <Typography className="ez-ls-h1-s1 black">
                  Body Lotion
                </Typography>
              </Col>
              <Col
                span={24}
                style={{
                  backgroundImage: `url(${Demo})`,
                  backgroundRepeat: "no-repeat",
                  height: "100%",
                  backgroundPosition: "center",
                }}
              >
                <Typography className="ez-ls-hs1" style={{ zIndex: "-1" }}>
                  Nature Care
                </Typography>
              </Col>
              <MB10 />
              <Col span={24} align="start">
                <Button className="colored-background bg-btn" shape="round">
                  Buy Now
                </Button>
              </Col>
              <MB10 />
              <Col
                span={24}
                align="end"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div style={{ width: "30%" }}>
                  <Typography className="ez-ls-h4 bold">Description</Typography>
                  <Typography className="ez-ls-h5 gray_v2">
                    Using the power of nature to produce the most beautiful glow
                    to your Skin.
                  </Typography>
                  <Typography className="ez-ls-h4 bold primary">
                    Read More
                  </Typography>
                </div>
              </Col>
              <MB10 />
            </Row>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default Homepicbanner;
