import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom"
import { getUserItem } from './storageConfig';



const PrivateRoute = () => {
  const location = useLocation()
  let email = getUserItem()
  return email ? <Outlet /> : < Navigate replace state={{ from: location }} to="/login" />
}

export default PrivateRoute;