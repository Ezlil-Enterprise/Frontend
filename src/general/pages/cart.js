import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Flex,
  Image,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { MB20 } from "../component/widget";
import Nodata from "../asset/image/EmptyCart.svg";
import { deleteCartItems, getCartDetails, updateCartItems } from "../api/cart";
import { getUserDetails } from "../api/authentication";
import Cookies from "js-cookie";
import product1 from "../asset/image/product.jpg";
import { CloseOutlined,CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const [cartData, setCartData] = useState();
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [userData, setUserData] = useState();
const navigate= useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken) {
        const userInfoResponse = await getUserDetails(userToken);
        setUserData(userInfoResponse);
        console.log(userInfoResponse);
        if (userInfoResponse) {
          fetchCartData();
        }
      }
    };

    fetchUserInfo();
  }, [userToken]);

  const fetchCartData = async () => {
    try {
      if (userToken) {
        const cartDataResponse = await getCartDetails(userToken, userData);
        console.log(cartDataResponse);
        setCartData(cartDataResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateToCart = async (productId, quantity) => {
    try {
      const addToCartResponse = await updateCartItems(userToken, productId, {
        quantity,
      });

      fetchCartData();
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleDeleteCart = async (id) => {
    try {
      const cartItemDeleteResponse = await deleteCartItems(userToken, id);

      fetchCartData(); // Refresh the cart data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      handleUpdateToCart(productId, newQuantity);
    }
  };

  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography className="ez-ls-h5 ">Cart</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "auto", backgroundColor: "#fff" }}>
        {!cartData || cartData.cartItems.length === 0 ? (
          <Flex align="center" justify="center" style={{ height: "70vh" }}>
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
                Add to Cart & Conquer Your Day!
              </Button>
            </Empty>
          </Flex>
        ) : (
          <Row style={{ padding: "20px" }}>
            {cartData.cartItems.map((item) => {
              const imageUrl = item.product.imageUrl
                ? `http://localhost:4001/${item.product.imageUrl}`
                : product1;

              return (
                <Col key={item._id} span={24} style={{ marginBottom: "20px" }}>
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
                        Rs. {item.price} {/* Show product price */}
                      </Typography>
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        defaultValue={item.quantity}
                        value={item.quantity}
                        addonBefore={
                          <Typography
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="pointer"
                          >
                            +
                          </Typography>
                        }
                        addonAfter={
                          <Typography
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="pointer"
                          >
                            -
                          </Typography>
                        }
                      />
                    </Col>
                    <Col span={4} align="center">
                      <CloseOutlined
                        onClick={() => handleDeleteCart(item._id)}
                      />
                    </Col>
                  </Row>
                </Col>
              );
            })}
      
          </Row>
        )}
      </Col>
      <MB20/>
      <Col span={24} style={{backgroundColor:"#fff",padding:"20px"}}>

      <Flex justify='space-between' align='center'>
      <Typography className="ez-ls-h6 primary"><CheckCircleOutlined />Thanks for your valuable time</Typography>
        <Typography className="ez-ls-h4">SubTotal ({cartData?.totalItems} items): Rs.{cartData?.totalPrice}</Typography>
\
        <Button className="colored-background bg-btn"  onClick={()=>navigate('/checkout')}>Place Order</Button>
      </Flex>
        
        </Col>
    </Row>
  );
};

export default Cart;
