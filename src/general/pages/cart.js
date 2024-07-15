import React, { useEffect, useState } from "react";
import { Button, Col, Empty, Flex, Row, Typography } from "antd";
import { MB20 } from "../component/widget";
import Nodata from "../asset/image/EmptyCart.svg";
import { getCartDetails } from "../api/cart";
import { getUserDetails } from "../api/authentication";
import Cookies from "js-cookie";
const Cart = () => {
  const [cartData, setCartData] = useState();
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken) {
        const userInfoResponse = await getUserDetails(userToken);
        setUserData(userInfoResponse);
        console.log(userInfoResponse);
        if (userInfoResponse) {
          fetchcartdata();
        }
      }
    };

    fetchUserInfo();
  }, []);

  const fetchcartdata = async () => {
    try {
      if (userToken) {
        console.log(userToken);
        const cartDataResponse = await getCartDetails(userToken, userData);
        console.log(cartDataResponse);
        setCartData(cartDataResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography className="ez-ls-h5 ">Cart</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "70vh", backgroundColor: "#fff" }}>
        {!cartData || cartData.cartItems.length === 0 ? (
          <Flex align="center" justify="center" style={{ height: "100%" }}>
            {" "}
            <Empty
              image={Nodata}
              imageStyle={{
                height: "150px",
              }}
              description={
                <Typography className="ez-ls-h6 gray">
                  Your Shopping Cart is empty!
                </Typography>
              }
            >
              <Button type="primary" style={{ backgroundColor: "#158600" }}>
                Add to Cart & Conquer Your Day!{" "}
              </Button>
            </Empty>
          </Flex>
        ) : (
          <div>hello</div>
        )}
      </Col>
    </Row>
  );
};

export default Cart;
