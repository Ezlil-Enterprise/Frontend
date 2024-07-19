import {
  Button,
  Col,
  Empty,
  Flex,
  Row,
  Typography,
  Image,
  Card,
  Divider,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { MB05, MB10, MB20 } from "../component/widget";
import Nodata from "../asset/image/nodata.svg";
import { orderHistory } from "../api/order";
import Cookies from "js-cookie";
import { getProductDetailsByID } from "../api/product";
import { formatDate } from "../../utlils/date";
import { addCartDetails } from "../api/cart";

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

  const handleAddtoCart = async (id) => {
    try {
      const productDetails = await getProductDetailsByID(id);
      const addtoCartResponse = await addCartDetails(userToken, productDetails);
      console.log(addtoCartResponse);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "35px" }}>
        <Typography className="ez-ls-h5">My Orders</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "auto", backgroundColor: "#fff" }}>
        {orderData.length === 0 ? (
          <Flex align="center" justify="center" style={{ height: "70vh" }}>
            <Empty
              image={Nodata}
              imageStyle={{ height: "150px" }}
              description={
                <Typography className="ez-ls-h6 gray">
                  Orders Not Found!
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
            {orderData.map((order) => (
              <Col key={order._id} span={24} style={{ marginBottom: "20px" }}>
                <Card title={`Order ID: ${order._id}`} hoverable>
                  <Flex style={{ padding: "20px" }}>
                    {" "}
                    <Typography>{formatDate(order.orderDate)}</Typography>
                  </Flex>
                  {order.orderItems.map((item) => {
                    const imageUrl = item.product.imageUrl
                      ? `http://localhost:4001/${item.product.imageUrl}`
                      : "defaultProductImagePath"; // replace 'defaultProductImagePath' with the path of a default product image if needed

                    return (
                      <Row key={item._id} style={{ marginBottom: "20px" }}>
                        <Col span={24}>
                          <Flex justify="space-around" align="center">
                            <Image
                              width={80}
                              height={80}
                              src={imageUrl}
                              alt={item.product.name}
                              preview={false}
                              style={{ borderRadius: "10px" }}
                            />

                            <Typography className="ez-ls-h6">
                              {item.product.name}
                            </Typography>
                            <Typography>Price: ₹{item.price}</Typography>
                            <Typography>
                              Quantity:
                              <Typography>{item.quantity}</Typography>
                            </Typography>

                            <Button
                              type="primary"
                              danger
                              onClick={() => handleAddtoCart(item.product._id)}
                            >
                              Add to cart
                            </Button>
                          </Flex>
                        </Col>
                      </Row>
                    );
                  })}
                  <Divider />
                  <MB05 />
                  <Flex justify="end" gap="small">
                    <Typography>Order Status: </Typography>
                    <Tag color="green">{order.orderStatus}</Tag>
                  </Flex>
                  <MB05 />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Orders;
