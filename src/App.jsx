import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import styled from "styled-components"
import Header from "./components/Header";
import ShowProduct from './components/ShowProduct';
import { Route, Routes, Navigate } from "react-router-dom";
import ReviewOrder from './components/ReviewOrder';
import Login from './components/Authentication/login';
import Checkout from "./components/Checkout"
import PrivateRoute from './components/Authentication/PrivateRoute';
import NotFound from "./components/NotFound"

export const cartContext = createContext()
export const orderCalculationContext = createContext()
export const userContext = createContext()


const initialValues = {
  totalProduct: 0,
  totalAmount: 0,
  shippingAndHanding: 0,
  tax: 0
}

const initUser = {
  email: "",
  displayName: ""
}

function App() {
  const [user, setUser] = useState(initUser)
  const [cart, setCart] = useState([])
  const [orderCalculate, setOrderCalculate] = useState(initialValues)

  return (
    <userContext.Provider value={[user, setUser]}>
      <cartContext.Provider value={{ cart, setCart }}>
        <orderCalculationContext.Provider value={{ orderCalculate, setOrderCalculate }}>
          <Container>
            <Header cart={cart} />
            <Routes>
              <Route path="/" element={<Navigate to="/product" />} />
              <Route path="product" element={<ShowProduct />} />
              <Route path="review-order" element={<ReviewOrder />} />
              <Route path="login" element={<Login />} />
              <Route path="checkout" element={<PrivateRoute />}>
                <Route element={<Checkout />} />
              </Route>
            <Route path="*" element={<NotFound />} />
   </Routes>
          </Container>
      
        </orderCalculationContext.Provider>
      </cartContext.Provider>
    </userContext.Provider>

  );
}

const Container = styled.div`
  width:100%;
`

export default App;
