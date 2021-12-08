import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import styled from "styled-components"
import Header from "./components/Header";
import ShowProduct from './components/ShowProduct';
import { Route, Routes } from "react-router-dom";
import ReviewOrder from './components/ReviewOrder';


export const cartContext = createContext()

function App() {

  const [cart, setCart] = useState([])


  return (
    <cartContext.Provider value={{ cart, setCart }}>

      <Container>
        <Header cart={cart} />
        <Routes>
          <Route path="product" element={<ShowProduct />} />
          <Route path="review-order" element={<ReviewOrder />} />
        </Routes>


      </Container>

    </cartContext.Provider>


  );
}

const Container = styled.div`
  width:100%;
`

export default App;
