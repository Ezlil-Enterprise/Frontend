import { Col, Row } from 'antd';
import React from 'react';

const Product = () => {
    return (
       <Row gutter={[32,32]}>
        <Col span={24}>
<Typography>Hello</Typography>
        </Col>
       </Row>
    );
};

export default Product;