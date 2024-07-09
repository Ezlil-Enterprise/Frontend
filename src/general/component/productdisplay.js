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
import React from "react";
import "../asset/less/productdetails.less";
import demo_prd from "../asset/image/product.jpg";
import bird_logo from "../asset/image/bird_logo.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import demo_background from "../asset/image/demo_background.png";
import { MB05, MB10, MB20 } from "./widget";
const Productdisplay = () => {
  return (
    <Row style={{ padding: "30px" }}>
      <Col span={12} style={{ padding: "20px" }}>
        <Image src={demo_prd} preview={false} style={{ height: "100%" }} />
      </Col>
      <Col span={12} style={{ padding: "20px" }}>
        <Flex gap="small" className="black-green">
          <ArrowLeftOutlined className="arrow-icon" />{" "}
          <Typography className="ez-ls-h5-b1 underline black-green">
            Back to Product Page
          </Typography>
        </Flex>
        <MB10 />
        <Space size="middle">
          <Typography className="ez-ls-h2 black bold">Organic Soap</Typography>
          <Space>
            <Image src={bird_logo} preview={false} />
            <Tag color="#327C3F">RECOMMEDED</Tag>
          </Space>
        </Space>
        <MB05 />
        <Space size="middle">
          <Typography className="ez-ls-h2 bold">Rs 80.00</Typography>
          <Typography className="ez-ls-h5 strike">Rs 89.00</Typography>
          <Typography className="primary ez-ls-h5">20% off</Typography>
        </Space>
        <MB10 />
        <Typography className="ez-ns-h5 gray">
          A luxurious, all-natural soap made with organic lavender essential oil
          and nourishing ingredients. Perfect for all skin types, leaving your
          skin feeling soft and refreshed. A luxurious, all-natural soap made
          with organic lavender essential oil and nourishing ingredients.
          Perfect for all skin types, leaving your skin feeling soft and
          refreshed.
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
          <Button className="transparent-background btn" shape="round">
            Add to Cart
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default Productdisplay;
