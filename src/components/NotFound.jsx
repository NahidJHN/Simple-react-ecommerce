import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Container>
            <div>
                <span className="text-muted"> Error Code : 404</span>
                <h1> Not Found</h1>
            </div>
        </Container>
    );
};


const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;   
    font-family: monospace;
`
export default NotFound;