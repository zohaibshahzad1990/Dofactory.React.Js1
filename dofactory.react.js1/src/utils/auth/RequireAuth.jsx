import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Layout from "/src/components/Layout";

import useAuth from "/src/utils/auth/useAuth";

export const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();

    
    if (auth?.token) { //auth?.token) {
        return <Layout />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
};

export default RequireAuth;