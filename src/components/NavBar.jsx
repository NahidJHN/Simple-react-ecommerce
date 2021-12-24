import React, { useContext } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import { userContext } from '../App';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app"
import fireBaseConfig from "./config"
import { getUserItem, removeUserItem } from '../components/Authentication/storageConfig'
//initialize fireBase app
let app = initializeApp(fireBaseConfig)
const auth = getAuth(app);



const NavBar = (props) => {
    const [user, setUser] = useContext(userContext)
    const email = getUserItem()

    console.log(user)
    const handleLogOut = () => {
        signOut(auth).then(() => {
            setUser({ email: "", displayName: "" })
            removeUserItem()
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>

                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/product">Shop</Nav.Link>
                    <Nav.Link as={Link} to="/review-order">Order Review</Nav.Link>
                    <Nav.Link href="#pricing">Managening Inventory</Nav.Link>


                </Nav>
                <Nav.Link className="ms-auto" as={Link} to="/review-order"><FontAwesomeIcon icon={faShoppingCart} /> My Cart ({props.cart.length})</Nav.Link>

                {email ? <Nav.Link onClick={handleLogOut} className="ms-auto" as={Link} to="/login"><FontAwesomeIcon icon={faUser} />
                    Logout
                </Nav.Link> : <Nav.Link className="ms-auto" as={Link} to="/login"><FontAwesomeIcon icon={faUser} />
                    Login
                </Nav.Link>}


            </Container>
        </Navbar>
    );
};
export default NavBar;