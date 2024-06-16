import { Button, Col, Empty, Flex, Row, Typography } from "antd";
import React from "react";
import { MB20 } from "../component/widget";
import Nodata from "../asset/image/nodata.svg";

const Orders = () => {
  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography className="ez-ls-h5 ">My Orders</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "70vh", backgroundColor: "#fff" }}>
        <Flex align="center" justify="center" style={{ height: "100%" }}>
          {" "}
          <Empty
            image={Nodata}
            imageStyle={{
              height: "150px",
            }}
            description={
              <Typography className="ez-ls-h6 gray">
                Orders Not Found !
              </Typography>
            }
          >
            <Button type="primary" style={{ backgroundColor: "#158600" }}>
              Add to Cart & Conquer Your Day!{" "}
            </Button>
          </Empty>
        </Flex>
      </Col>
    </Row>
  );
};

export default Orders;
