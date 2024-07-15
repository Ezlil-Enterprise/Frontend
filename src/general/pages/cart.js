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
import { deleteCartItems, getCartDetails } from "../api/cart";
import { getUserDetails } from "../api/authentication";
import Cookies from "js-cookie";
import product1 from "../asset/image/product.jpg";
import { CloseOutlined } from "@ant-design/icons";
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
const handledeltecart=async(id)=>{
  try{
    const cartItemDeleteResponse=await deleteCartItems(userToken,id);
    console.log(cartItemDeleteResponse);
  }catch(error){
    console.error("Error:",error);

  }
}
  return (
    <Row className="container">
      <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
        <Typography className="ez-ls-h5 ">Cart</Typography>
      </Col>
      <MB20 />
      <Col span={24} style={{ height: "auto", backgroundColor: "#fff" }}>
        {!cartData || cartData.cartItems.length === 0 ? (
          <Flex align="center" justify="center" style={{ height: "70vh" }}>
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
          <Row style={{ padding: "20px" }}>
            {cartData.cartItems.map((item) => {
              const imageUrl = item.product.imageUrl
                ? `http://localhost:4001/${item.product.imageUrl}`
                : product1;

              return (
                <Col key={item._id} span={24} style={{ marginBottom: "20px" }}>
                  <Row justify="space-evenly" align='middle'>
                    <Col span={4}>
                      <Image
                        src={imageUrl}
                        preview={false}
                        style={{ borderRadius: "15px" }}
                      />
                    </Col>
                    <Col span={8} align='center'>
                      <Typography className="ez-ls-h5">
                        {item.product.title}
                      </Typography>
                      <Typography className="ez-ls-h6">
                        {item.product.description}
                      </Typography>
                    </Col>
                    <Col span={4}>
                    
                        <Typography className="ez-ls-h5-b1">
                          Rs. {item.product.price}
                        </Typography>
                      
                  
                    </Col>
                    <Col span={4}>
                    <InputNumber
                          addonBefore="+"
                          addonAfter="-"
                          defaultValue={1}
                        />
                    </Col>
                    <Col span={4} align='center'>
                    <CloseOutlined onClick={()=> handledeltecart(item.product._id)}/></Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Cart;
