/* eslint-disable jsx-a11y/anchor-is-valid */


import React, { useContext } from 'react';
import { Col, Row, Container } from "react-bootstrap"
import styled from 'styled-components';
import { cartContext } from '../App';
import { Link } from "react-router-dom"
import OrderStatus from './OrderStatus';



const ReviewOrderTemplate = (props) => {

    //import cart context for remove a product form cart
    const { cart, setCart } = useContext(cartContext)

    //distracture the product information
    const { name, img, price, seller, stock, key, quantity } = props.product

    // const { setTotalItemPrice } = props


    //increasing product quantity controller
    const increaseQuantityController = (productId) => {
        if (key === productId && stock > quantity) {
            let updatedQuantityCart = cart.map(p => {
                if (p.key === productId) {
                    p.quantity = p.quantity + 1

                }
                return p
            })
            setCart(updatedQuantityCart)
        }

    }

    //decreasing product quantity controller

    const decreaseQuantityController = (productId) => {
        if (key === productId && quantity > 1) {
            let updatedQuantityCart = cart.map(p => {
                if (p.key === productId) {
                    p.quantity = p.quantity - 1


                }
                return p
            })
            setCart(updatedQuantityCart)

        }
    }

    //removing product controller forn cart
    const removeFormCart = (productId) => {
        if (key === productId) {
            let updatedCart = cart.filter(product => product.key !== productId)
            setCart(updatedCart)
        }
    }


    return (

        <Container className="mb-3 py-3">
            <Row>
                <Col xl={3} md={12} sm={12}>
                    <ImageContainer>
                        <img src={img} alt="product" />
                    </ImageContainer>
                </Col>
                <Col xl={9} md={12} sm={8}>
                    <h5>
                        <a href="#">{name}</a>
                    </h5>
                    <Row>
                        <Col md={4} sm={12}>
                            <p>by {seller}</p>
                            <p>Only {stock} left in stock</p>
                            <Button onClick={() => increaseQuantityController(key)} className="mx-3"> + </Button>
                            <Button onClick={() => decreaseQuantityController(key)} > - </Button>
                            <Button onClick={() => removeFormCart(key)} className="mx-2">Remove</Button>
                        </Col>
                        <Col md={8} sm={12}>
                            <h2>Price: {price}</h2>
                            <h6>Product Quantity:{quantity}</h6>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}





const ReviewOrder = () => {
    const { cart } = useContext(cartContext)


    return (
        <>
            <Row>
                <Col xl={8} md={9} >
                    {cart.length < 1 ? <h2>You don,t select any product Please select a product<Link to="/product">Here</Link></h2> : cart.map((product) =>

                        <ReviewOrderTemplate
                            key={product.key}
                            product={product}
                        />

                    )}
                </Col>
                <Col xl={4} md={3}>
                    <OrderStatus
                        navigateTo="checkout"
                        buttonText="Checkout"
                    />
                </Col>

            </Row>

        </>
    )
}



export default ReviewOrder;

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
