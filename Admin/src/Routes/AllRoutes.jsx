import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Blog from '../Pages/Blog/Blog'
import NewJoiners from '../Pages/NewJoiners/NewJoiners'
import News from '../Pages/News/News'
import Gallery from '../Pages/Gallery/Gallery'
import Users from '../Pages/Users'
import ContactUs from '../Pages/ContactUs'
import AddBlog from '../Pages/Blog/AddBlog'
import AddNews from '../Pages/News/AddNews'
import ChangePassword from '../Pages/ChangePassword'
import PrivateRoute from './index';
import Slider from '../Pages/Slider/Slider'

const AllRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path="/Dashboard" element={<PrivateRoute Component={Dashboard} />} />
                <Route path='/Slider' element={<PrivateRoute Component={Slider} />} />
                <Route path='/Blog' element={<PrivateRoute Component={Blog} />} />
                <Route path='/AddBlog' element={<PrivateRoute Component={AddBlog} />} />
                <Route path='/News' element={<PrivateRoute Component={News} />} />
                <Route path='/ChangePassword' element={<PrivateRoute Component={ChangePassword} />} />
                <Route path='/AddNews' element={<PrivateRoute Component={AddNews} />} />
                <Route path='/NewJoiners' element={<PrivateRoute Component={NewJoiners} />} />
                <Route path='/Gallery' element={<PrivateRoute Component={Gallery} />} />
                <Route path='/Users' element={<PrivateRoute Component={Users} />} />
                <Route path='/ContactUs' element={<PrivateRoute Component={ContactUs} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
