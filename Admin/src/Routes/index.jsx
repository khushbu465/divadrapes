// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Footer from "../Common/Footer"
import Header from '../Common/header/Header'

const PrivateRoute = ({ Component }) => {
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };
    const isAuthenticated = !!getAuthToken();

    return isAuthenticated ?
        (
            <>
                <Header />
                <Component />
                <Footer />
            </>

        ) : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;