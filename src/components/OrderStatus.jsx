import React from 'react';
import styled from 'styled-components';

const OrderStatus = ({ cart }) => {

    let itemsPrice = 0;
    let shippingHanding = 0
    let totalBeforeTax = 0
    let tax = 0
    let totalAfterTax = 0

    for (let i = 0; i < cart.length; i++) {
        itemsPrice += cart[i].price;
        shippingHanding += cart[i].shipping
        tax = parseFloat((cart[i].price * 15 / 100).toFixed(2))

    }

    itemsPrice = parseFloat(itemsPrice.toFixed(2))
    totalBeforeTax = parseFloat((itemsPrice + shippingHanding).toFixed(2))
    totalAfterTax = Math.ceil((totalBeforeTax + tax))



    return (
        <OrderWraper>
            <h4>Order Summery:</h4>
            <table style={{ width: "80%" }}>
                <tr>
                    <td>Items price:</td>
                    <td>${itemsPrice}</td>
                </tr>
                <tr>
                    <td>Shipping and Handing:</td>
                    <td>${shippingHanding}</td>
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

            <ReviewOrder>Review Order</ReviewOrder>

        </OrderWraper>

    );
};

const OrderWraper = styled.div`
    padding: 10px;
    font-size: 18px;
    font-weight: 700;
`

const ReviewOrder = styled.a`
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