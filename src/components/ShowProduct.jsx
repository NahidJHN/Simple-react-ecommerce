import React, { useContext, useState } from "react";
import Product from "./Product/Product"
import PagesCount from "./Pagination"
import fakeData from "../products"
import { cartContext } from "../App";
import { Row, Col } from "react-bootstrap";
import OrderStatus from './OrderStatus';

const ShowProduct = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const productPerPage = 10

    const indexOfLastProduct = currentPage * productPerPage
    const indexOfFirstProduct = indexOfLastProduct - productPerPage
    const currentProduct = fakeData.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(fakeData.length / 10)

    //import cart form cart context
    const { cart, setCart } = useContext(cartContext)

    const controlPage = (currentPage, i) => {
        setCurrentPage(currentPage = i)

    }

    const previousPageController = (currentPage) => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
    }

    const nextPageController = (currentPage, totalPage) => {
        setCurrentPage(currentPage < totalPage ? currentPage + 1 : currentPage)
    }

    const addToCartController = (productKey) => {
        const matchingProduct = fakeData.find(p => p.key === productKey)
        const isExits = cart.find(c => c.key === matchingProduct.key)
        if (!isExits) {
            matchingProduct.quantity = 1
            matchingProduct.tax = matchingProduct.price * 15 / 100
            setCart([...cart, matchingProduct])

        }
    }



    return (
        <>
            <Row>
                <Col md={8} sm={8}>
                    {currentProduct.map(p =>
                        <Product
                            key={p.key}
                            product={p}
                            addToCartController={addToCartController} />
                    )}
                </Col>
                <Col md={4} sm={4}>
                    <OrderStatus
                        navigateTo="review-order"
                        buttonText="Review Order"


                    />
                </Col>
            </Row>

            < PagesCount
                totalPages={totalPages}
                currentPage={currentPage}
                controlPage={controlPage}
                nextPageController={nextPageController}
                previousPageController={previousPageController}
            />

        </>
    )
};

export default ShowProduct;