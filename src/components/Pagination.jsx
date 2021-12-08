import React from 'react';
import { Pagination } from 'react-bootstrap';

const PageCount = (props) => {
    const { totalPages, controlPage, currentPage, nextPageController, previousPageController } = props

    let numberOfPage = []

    for (let i = 1; i < totalPages; i++) {
        numberOfPage.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => controlPage(currentPage, i)}>{i}</Pagination.Item>)
    }

    return (

        <Pagination style={{ width: "40%", margin: "auto", marginTop: "10px", marginBottom: "10px" }}>
            <Pagination.Item disabled={!(currentPage > 1)} onClick={() => previousPageController(currentPage)}>Previous</Pagination.Item>
            {numberOfPage}
            <Pagination.Item disabled={(currentPage === totalPages)} onClick={() => nextPageController(currentPage, totalPages)}>Next</Pagination.Item>

        </Pagination>

    );
};

export default PageCount;