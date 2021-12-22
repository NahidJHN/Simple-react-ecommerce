import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';


const Header = (props) => {
    return (
        <>
            <Logo>
                <img src="/images/logo.png" alt="" />
            </Logo>
            <NavBar cart={props.cart} />
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



export default Header;