import React, {useEffect,useState} from 'react'
import { FaCode } from 'react-icons/fa';
import ImageSlider from '../../utils/ImageSlider';
import axios from 'axios';
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body);
    }, [])

    const loadMoreHanlder = () => {
        let skip = Skip + Limit
        
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }

    const getProducts = (body) => {       
        axios.post('api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.products]);
                    } else {
                        setProducts(response.data.products);
                    }
                    setPostSize(response.data.postSize);
                } else {
                    alert('상품을 가져오는데 실패했습니다.')
                    console.log(response.data.err);
                }
            })  
    }
    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<ImageSlider images={product.images}/>}
                >
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        )
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                console.log(data[key].array);
                array = data[key].array;
            }
        }
        console.log(array);
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters};
        if(category === 'price') {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        } else {
            newFilters[category] = filters;
        }
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>

            <Row gutter={[16, 16]} xs={24}>
                <Col lg={12}>
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, 'continents')}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* RaidoBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, 'price')}/>
                </Col>
            </Row>
            
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage

