import React, {useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';

function LandingPage() {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        axios.post('api/product/products')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setProducts(response.data.products);
                } else {
                    console.log(response.data.err);
                }
            })

        
    }, [])

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card        
                    cover={<img src={`http://localhost:5000/${product.images[0]}`} />}
                >
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>        
            </Col>
        )
    })
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>
        
            <Row gutter={16, 16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage

