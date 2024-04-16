import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Customers from '../Pages/Customers'
import ContactUs from '../Pages/ContactUs'
import ChangePassword from '../Pages/ChangePassword'
import PrivateRoute from './index';
import Slider from '../Pages/Slider/Slider'
import AddProduct from '../Pages/Products/AddProduct'
import ViewProduct from '../Pages/Products/ViewProduct'
import Brand from '../Pages/Brand'
import Offer from '../Pages/Offers/Offer'
import Coupon from '../Pages/Offers/Coupon'
import Category from '../Pages/Category'

const AllRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path="/Dashboard" element={<PrivateRoute Component={Dashboard} />} />
                <Route path='/Slider' element={<PrivateRoute Component={Slider} />} />
                <Route path='/Brand' element={<PrivateRoute Component={Brand} />} />
                <Route path='/Category' element={<PrivateRoute Component={Category} />} />
                <Route path='/Offer' element={<PrivateRoute Component={Offer} />} />
                <Route path='/Coupon' element={<PrivateRoute Component={Coupon} />} />
                <Route path='/AddProduct' element={<PrivateRoute Component={AddProduct} />} />
                <Route path='/ViewProduct' element={<PrivateRoute Component={ViewProduct} />} />
                <Route path='/ChangePassword' element={<PrivateRoute Component={ChangePassword} />} />
                <Route path='/Customers' element={<PrivateRoute Component={Customers} />} />
                <Route path='/ContactUs' element={<PrivateRoute Component={ContactUs} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
