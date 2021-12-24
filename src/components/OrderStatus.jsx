import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { cartContext, orderCalculationContext } from '../App';
import {useNavigate} from "react-router-dom"

const OrderStatus = ({ buttonText,navigateTo }) => {
    const navigate=useNavigate()
    const { cart } = useContext(cartContext)
    const { orderCalculate, setOrderCalculate } = useContext(orderCalculationContext)


    useEffect(() => {
        let { totalItem, totalAmount, shipping, tax } = cart.reduce((totalVal, currentVal) => {
            let { quantity, price, shipping } = currentVal
            totalVal.totalItem += quantity
            let updatedAmount = Math.ceil(price * quantity)
            totalVal.totalAmount += updatedAmount
            totalVal.shipping += shipping
            totalVal.tax = parseInt((totalVal.totalAmount * 15 / 100).toFixed(2))
            return totalVal
        }, { totalItem: 0, totalAmount: 0, shipping: 0, tax: 0 })

        setOrderCalculate({ ...orderCalculate, totalProduct: totalItem, totalAmount, shippingAndHanding: shipping, tax })

    }, [cart, orderCalculate, setOrderCalculate])


    const { totalProduct, totalAmount, shippingAndHanding, tax } = orderCalculate

    let totalBeforeTax = totalAmount + shippingAndHanding
    let totalAfterTax = totalBeforeTax + tax

    return (
        <OrderWraper>
            <h4>Order Summery:</h4>
            <small>You have selected  {totalProduct} product in your cart</small><br />
            <table style={{ width: "80%" }}>
                <tr>
                    <td>Items price:</td>
                    <td>${totalAmount}</td>
                </tr>
                <tr>
                    <td>Shipping and Handing:</td>
                    <td>${shippingAndHanding}</td>
                </tr>
                <tr>
                    <td>Total before Tax:</td>
                    <td style={{ borderTop: "1px solid tomato" }}>${totalBeforeTax}</td>
                </tr>
                <tr>
                    <td>Tax :</td>
                    <td>${tax}</td>
                </tr>
                <tr style={{ borderTop: "2px solid tomato" }}>
                    <td>Total</td>
                    <td>${totalAfterTax}</td>
                </tr>
            </table>
            <ReviewOrderButton onClick={()=>navigate(`/${navigateTo}`)}>{buttonText}</ReviewOrderButton>

        </OrderWraper>

    );
};

const OrderWraper = styled.div`
    padding: 10px;
    font-size: 18px;
    font-weight: 700;
`

const ReviewOrderButton = styled.a`
    padding:7px;
    width:150px;
    font-size: 16px;
    background-color:tomato;
    color:white;
    font-weight:700;
    border-radius: 10px;
    margin-top: 2rem;
    display: inline-block;
    text-decoration: none;
    text-align:center;
    border:2px solid tomato;
    cursor:pointer;
    &:hover{
        background-color: white;
        color:tomato;
    }

`

export default OrderStatus;