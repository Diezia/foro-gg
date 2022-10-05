import React from "react";
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const auth:any = {'token':localStorage.getItem("jwt")}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes