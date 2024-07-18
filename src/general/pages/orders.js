import {
  Button,
  Col,
  Empty,
  Flex,
  Row,
  Typography,
  Image,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { MB20 } from "../component/widget";
import Nodata from "../asset/image/nodata.svg";
import { orderHistory } from "../api/order";
import Cookies from "js-cookie";
import { CloseOutlined } from "@ant-design/icons";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));

  useEffect(() => {
    const fetchOrdersHistory = async () => {
      try {
        if (userToken) {
          const orderDataResponse = await orderHistory(userToken);
          console.log(orderDataResponse);
          setOrderData(orderDataResponse);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchOrdersHistory();
  }, [userToken]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Handle quantity change
  };

  const handleDeleteCart = (itemId) => {
    // Handle delete cart item
  };

  // Debugging logs to check the state of orderData
  console.log("Order Data:", orderData);

  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography className="ez-ls-h5">My Orders</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "70vh", backgroundColor: "#fff" }}>
        {orderData.length === 0 ? (
          <Flex align="center" justify="center" style={{ height: "100%" }}>
            <Empty
              image={Nodata}
              imageStyle={{ height: "150px" }}
              description={
                <Typography className="ez-ls-h6 gray">
                  Orders Not Found !
                </Typography>
              }
            >
              <Button type="primary" style={{ backgroundColor: "#158600" }}>
                Add to Cart & Conquer Your Day!
              </Button>
            </Empty>
          </Flex>
        ) : (
          <Row style={{ padding: "20px" }}>
            {orderData.map((order) =>
              order.orderItems.map((item) => {
                const imageUrl = item.product.imageUrl
                  ? `http://localhost:4001/${item.product.imageUrl}`
                  : "defaultProductImagePath"; // replace 'defaultProductImagePath' with the path of a default product image if needed

                return (
                  <Col
                    key={item._id}
                    span={24}
                    style={{ marginBottom: "20px" }}
                  >
                    <MB20 />
                    <Row justify="space-evenly" align="middle">
                      <Col span={4}>
                        <Image
                          src={imageUrl}
                          preview={false}
                          style={{ borderRadius: "15px" }}
                        />
                      </Col>
                      <Col span={8} align="center">
                        <Typography className="ez-ls-h5">
                          {item.product.title}
                        </Typography>
                        <Typography className="ez-ls-h6">
                          {item.product.description}
                        </Typography>
                      </Col>
                      <Col span={4}>
                        <Typography className="ez-ls-h5-b1">
                          Rs. {item.price}
                        </Typography>
                      </Col>
                    </Row>
                  </Col>
                );
              })
            )}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Orders;
