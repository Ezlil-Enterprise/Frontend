import {
  Button,
  Col,
  Flex,
  Image,
  Radio,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import demo_prd from "../asset/image/product.jpg";
import bird_logo from "../asset/image/bird_logo.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getProductDetailsByID } from "../api/product";
import { MB05, MB10, MB20 } from "./widget";
import "../asset/less/productdetails.less";
import { addCartDetails } from "../api/cart";
import Cookies from 'js-cookie';

const Productdisplay = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetailsByID(id);
        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }
const handleAddtoCart= async()=>{
  try {
   
    const addtoCartResponse = await addCartDetails(userToken,productDetails);
    console.log(addtoCartResponse)
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}
const imageUrl = productDetails.imageUrl
? `http://localhost:4001/${productDetails.imageUrl}`
: demo_prd;
  return (
    <Row style={{ padding: "30px" }}>
      <Col span={12} style={{ padding: "20px" }}>
        <Image
          src={imageUrl}
          preview={false}
          style={{ height: "100%" }}
        />
      </Col>
      <Col span={12} style={{ padding: "20px" }}>
        <Flex gap="small" className="black-green">
          <ArrowLeftOutlined className="arrow-icon" />
          <Link to="/">
            <Typography className="ez-ls-h5-b1 underline black-green">
              Back to Product Page
            </Typography>
          </Link>
        </Flex>
        <MB10 />
        <Space size="middle">
          <Typography className="ez-ls-h2 black bold">
            {productDetails.title}
          </Typography>
          <Space>
            <Image src={bird_logo} preview={false} />
            <Tag color="#327C3F">RECOMMENDED</Tag>
          </Space>
        </Space>
        <MB05 />
        <Space size="middle">
          <Typography className="ez-ls-h2 bold">
            Rs {productDetails.discountedPrice}
          </Typography>
          <Typography className="ez-ls-h5 strike">
            Rs {productDetails.price}
          </Typography>
          <Typography className="primary ez-ls-h5">
            {productDetails.discountPersent}% off
          </Typography>
        </Space>
        <MB10 />
        <Typography className="ez-ns-h5 gray">
          {productDetails.description}
        </Typography>
        <MB05 />
        <Typography className="ez-ls-h5">Flavours</Typography>
        <MB05 />
        <Radio.Group
          defaultValue="multani_mitti"
          buttonStyle="solid"
          className="custom-radio-group"
        >
          <Radio.Button value="multani_mitti">Multani Mitti</Radio.Button>
          <Radio.Button value="Honey">Honey</Radio.Button>
          <Radio.Button value="Rose">Rose</Radio.Button>
        </Radio.Group>
        <MB20 />
        <Flex gap="small">
          <Button className="colored-background btn" shape="round">
            Buy Now
          </Button>
          <Button className="transparent-background btn" shape="round" onClick={handleAddtoCart}>
            Add to Cart
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default Productdisplay;
