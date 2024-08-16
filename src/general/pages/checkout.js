import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  message,
  Divider,
  Image,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserDetails } from "../api/authentication";
import { MB05, MB10, MB20 } from "../component/widget";
import { getCartDetails } from "../api/cart";
import product1 from "../asset/image/product.jpg";
import { placeOrder } from "../api/order";
import Footercomponent from "../component/card/footer";
import { MIDDLEWARE_API_URL, PINCODE_API_URL } from "../../constants";

const Checkout = () => {
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [userData, setUserData] = useState();
  const [addressData, setAddressData] = useState(null);
  const [cartData, setCartData] = useState();
  const [form] = Form.useForm();
  const shippingCharges = 30;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken) {
        const userInfoResponse = await getUserDetails(userToken);
        setUserData(userInfoResponse);
      }
    };

    const fetchCartData = async () => {
      try {
        if (userToken) {
          const cartDataResponse = await getCartDetails(userToken);
          setCartData(cartDataResponse);
        }
      } catch (error) {
        message.error("Error:", error);
      }
    };

    fetchUserInfo();
    fetchCartData();
  }, [userToken]);

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    if (postalCode.length === 6) {
      try {
        const response = await axios.get(
          `${PINCODE_API_URL}/pincode/${postalCode}`
        );
        if (response.data && response.data[0].Status === "Success") {
          const { PostOffice } = response.data[0];
          if (PostOffice && PostOffice.length > 0) {
            const city = PostOffice[0].District;
            const state = PostOffice[0].State;
            form.setFieldsValue({
              city,
              state,
            });
          }
        } else {
          message.error("Invalid postal code");
        }
      } catch (error) {
        message.error("Failed to fetch location data");
      }
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setAddressData(values);
      message.success("Address saved successfully");
    } catch (error) {
      message.error("Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const options = {
        key: "",
        amount: cartData?.totalPrice * 100,
        currency: "INR",
        name: "Ezlil",
        description: "Order Payment",
        handler: async (response) => {
          const payment_id = response.razorpay_payment_id;

          const orderResponse = await placeOrder(
            userToken,
            {
              addressData: addressData || userData.address,
            },
            payment_id
          );

          if (orderResponse) {
            message.success("Order placed successfully");
          } else {
            message.error("Order placement failed");
          }
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const payment = new Razorpay(options);
      payment.open();
    } catch (error) {
      message.error("Order is not placed");
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Row className="container">
          <Col
            span={24}
            style={{ backgroundColor: "#fff", padding: "20px" }}
            align="center"
          >
            <Typography className="ez-ls-h5">Checkout</Typography>
          </Col>
          <MB20 />
          <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
            {!userData?.address || userData.address.length === 0 ? (
              <Row>
                <Col span={24}>
                  <Typography className="ez-ls-h4 ">Add address</Typography>
                </Col>
                <MB10 />
                <Col span={24}>
                  <Form form={form} layout="vertical">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name",
                            },
                          ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="addressLine1"
                          label="Address Line 1"
                          rules={[
                            {
                              required: true,
                              message: "Please input address line 1",
                            },
                          ]}
                        >
                          <Input placeholder="Address Line 1" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="addressLine2" label="Address Line 2">
                          <Input placeholder="Address Line 2" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="city"
                          label="City"
                          rules={[
                            {
                              required: true,
                              message: "Please input your city",
                            },
                          ]}
                        >
                          <Input placeholder="City" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="state"
                          label="State"
                          rules={[
                            {
                              required: true,
                              message: "Please input your state",
                            },
                          ]}
                        >
                          <Input placeholder="State" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="zipCode"
                          label="Postal Code"
                          rules={[
                            {
                              required: true,
                              message: "Please input your postal code",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Postal Code"
                            onChange={handlePostalCodeChange}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="mobile"
                          label="Mobile"
                          rules={[
                            {
                              required: true,
                              message: "Please input Mobile Number",
                            },
                          ]}
                        >
                          <InputNumber placeholder="Phone" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          className="transparent-background"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Row>
                {userData.address && (
                  <Col
                    span={24}
                    style={{ backgroundColor: "#fff", padding: "20px" }}
                  >
                    <Typography className="ez-ls-h5 gray_v2">
                      Shipping Address
                    </Typography>
                    <MB05 />
                    <Row>
                      {userData.address.map((address, index) => (
                        <Col
                          span={12}
                          className="custom-address-card"
                          key={index}
                        >
                          <Typography className="ez-ls-h5">
                            {address.name}
                          </Typography>
                          <Divider />
                          <Typography className="ez-ls-h6">
                            {address.addressLine1}
                          </Typography>
                          <Typography className="ez-ls-h6">
                            {address.city},{address.state}
                          </Typography>
                          <Typography className="ez-ls-h6">
                            {address.zipCode}
                          </Typography>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                )}
              </Row>
            )}
          </Col>
          <MB20 />
          {addressData && (
            <Col span={24} style={{ backgroundColor: "#fff", padding: "20px" }}>
              <Typography className="ez-ls-h5 gray_v2">
                Shipping Address
              </Typography>
              <MB05 />
              <Row>
                <Col span={12} className="custom-address-card">
                  <Typography className="ez-ls-h5">
                    {addressData.name}
                  </Typography>
                  <Divider />
                  <Typography className="ez-ls-h6">
                    {addressData.addressLine1}
                  </Typography>
                  <Typography className="ez-ls-h6">
                    {addressData.city},{addressData.state}
                  </Typography>
                  <Typography className="ez-ls-h6">
                    {addressData.zipCode}
                  </Typography>
                </Col>
              </Row>
            </Col>
          )}
          <MB20 />
          <Col span={24} style={{ backgroundColor: "#fff" }}>
            <Row style={{ padding: "20px" }}>
              <Col span={24}>
                <Typography className="ez-ls-h5 gray_v2">
                  Ordered Items
                </Typography>
              </Col>
              {cartData?.cartItems?.map((item) => {
                const imageUrl = item.product.imageUrl
                  ? `${MIDDLEWARE_API_URL}/${item.product.imageUrl}`
                  : product1;

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
                        <Typography className="ez-ls-h6">
                          {item.product.title}
                        </Typography>
                      </Col>

                      <Col span={4}>
                        <Typography className="ez-ls-h7">
                          X {item.quantity}
                        </Typography>
                      </Col>
                      <Col span={4}>
                        <Typography className="ez-ls-h7">
                          ₹ {item.price}
                        </Typography>
                      </Col>
                    </Row>
                    <MB20 />
                  </Col>
                );
              })}
              <Col span={12}></Col>
              <Col span={12}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Typography className="ez-ls-h6 gray_v2">
                    Items Subtotal :
                  </Typography>
                  <Typography className="ez-ls-h6 black">
                    ₹{cartData?.totalPrice}
                  </Typography>
                </div>
                <MB10 />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Typography className="ez-ls-h6 gray_v2">
                    Shipping Charges :
                  </Typography>
                  <Typography className="ez-ls-h6 gray_v2">
                    {cartData?.totalItems > 5 ? "Free" : `₹${shippingCharges}`}
                  </Typography>
                </div>

                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className="ez-ls-h6">Total :</Typography>
                  <Typography className="ez-ls-h5 black">
                    ₹
                    {cartData?.totalItems > 5
                      ? cartData?.totalPrice
                      : cartData?.totalPrice + shippingCharges}
                  </Typography>
                </div>
                <MB05 />
                <Button
                  style={{ width: "100%" }}
                  disabled={
                    (!userData?.address || userData.address.length === 0) &&
                    !addressData
                      ? true
                      : false
                  }
                  className="colored-background"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Footercomponent />
      </Col>
    </Row>
  );
};

export default Checkout;
