import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
const NavBar = (props) => {
    // console.log(props.cart)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/product">Shop</Nav.Link>
                    <Nav.Link as={Link} to="/review-order">Order Review</Nav.Link>
                    <Nav.Link href="#pricing">Managening Inventory</Nav.Link>


                </Nav>
                <Nav.Link className="ms-auto" as={Link} to="/review-order"><FontAwesomeIcon icon={faShoppingCart} /> My Cart ({props.cart.length})</Nav.Link>
            </Container>
        </Navbar>
    );
};
export default NavBar;