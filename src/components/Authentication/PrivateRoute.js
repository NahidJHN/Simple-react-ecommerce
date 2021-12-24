import React from 'react';
// import { userContext } from "../../App"
import { Outlet, Navigate } from "react-router-dom"
import { getUserItem } from './storageConfig';



const PrivateRoute = () => {
   let email= getUserItem()
  return email ? <Outlet /> : < Navigate to="/login"/>
  }

export default PrivateRoute;