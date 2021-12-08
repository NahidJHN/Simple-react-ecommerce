import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import { Form } from "react-bootstrap"

const Header = (props) => {
    return (
        <>
            <Logo>
                <img src="/images/logo.png" alt="" />
            </Logo>
            <NavBar cart={props.cart} />
            <SearchBox>
                <Form.Label>Search Product</Form.Label>
                <Form.Control type="search" placeholder="Search Here" />
            </SearchBox>


        </>
    );
};



const Logo = styled.div`
    padding:10px;
    width:100%;
    text-align:center;
    & img{
        width:20%;
    

    }
`
const SearchBox = styled.div`
padding:1rem;
background:#0a0a0a;
margin:auto

`


export default Header;