/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Col, Row, Container } from "react-bootstrap"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    let { addToCartController } = props
    let { name, img, seller, price, stock, star, features, key } = props.product;


    let starIcon = star > 0 ? [<a href="#"><FontAwesomeIcon icon={faStar} /></a>] : null

    for (let i = 1; i < star; i++) {
        starIcon.push(<a href="#"><FontAwesomeIcon icon={faStar} /></a>)

    }
    return (
        <Container className="mb-3 py-3">
            <Row>
                <Col xl={3} md={12} sm={12}>
                    <ImageContainer>
                        <img src={img} alt={name.split(' ').slice(0, 3).join()} />
                    </ImageContainer>
                </Col>

                <Col xl={9} md={12} sm={8}>
                    <h5>
                        <a href="#">{name}</a>
                    </h5>
                    <Row>
                        <Col md={4} sm={12}>
                            <p>by {seller}</p>
                            <h3>{price}</h3>
                            <p>Only {stock} left in stock</p>
                            <Button onClick={() => addToCartController(key)}>Add to cart</Button>
                        </Col>
                        <Col md={8} sm={12}>
                            <StarIconWraper>
                                {starIcon}

                            </StarIconWraper>
                            <h2>Features</h2>
                            <ul>
                                {features.map(f =>
                                    <li>{f.description}:{f.value}</li>
                                )}
                            </ul>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    );
};

const ImageContainer = styled.div`
    padding:5px;
    & img{
        width:150px;
    }
`

const Button = styled.button`
    padding:5px 10px;
    color:white;
    font-weight:700;
    background-color: #ff9800;
    border-radius:5px;
`

const StarIconWraper = styled.div`
    & a{
        color:#ff9800
    }
`

export default Product;