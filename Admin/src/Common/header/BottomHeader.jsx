import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

const BottomHeader = () => {
    return (
        <>
            <div className="topnav">
                <Container fluid={true}>
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                        <div className="collapse navbar-collapse" id="topnav-menu-content">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/Dashboard"
                                        id="topnav-dashboard"
                                        role="button"
                                    >
                                        <i className="bx bx-home-circle me-2" />
                                        <span key="t-dashboards">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle arrow-none"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#topnav-pages"
                                        to={''} role="button">
                                        <i className="bx bx-image me-2" />
                                        <span key="t-apps">Slider</span> <div className="arrow-down" />
                                    </Link>
                                    <div className="dropdown-menu" id="topnav-pages">
                                        <Link to="/Slider" className="dropdown-item" key="t-chat">
                                            Slider/Banner
                                        </Link>
                                        <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/Brand"
                                        role="button"
                                    >
                                        <span key="t-apps"> Brand</span>
                                    </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/Category"
                                        role="button"
                                    >
                                        <i class="fa-solid fa-layer-group me-2"></i>
                                        <span key="t-apps"> Category</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle arrow-none"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#topnav-pages"
                                        to={''} role="button">
                                        <i className="bx bx-customize me-2" />
                                        <span key="t-apps">Offers</span> <div className="arrow-down" />
                                    </Link>
                                    <div className="dropdown-menu" id="topnav-pages">
                                        <Link to="/Offer" className="dropdown-item" key="t-chat">
                                            Offer
                                        </Link>
                                        <Link
                                            to="/Coupon"
                                            className="dropdown-item"
                                            key="t-file-manager"
                                        >
                                            Coupon
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to={''}
                                        data-bs-toggle="collapse"
                                        data-bs-target="#topnav-news"
                                        role="button"
                                    >
                                        <i className="bx bx-news me-2" />
                                        <span key="t-apps">Product</span> <div className="arrow-down" />
                                    </Link>
                                    <div className="dropdown-menu" id='topnav-news'>
                                        <Link to="/AddProduct" className="dropdown-item" key="t-chat">
                                            Add Product
                                        </Link>
                                        <Link
                                            to="/ViewProduct"
                                            className="dropdown-item"
                                            key="t-file-manager"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/Customers"
                                        role="button"
                                    >
                                        <i className="bx bx-user me-2" />
                                        <span key="t-apps"> Customers</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        to="/ContactUs"
                                        role="button"
                                    >
                                        <i className="bx bxs-user-detail me-2" />
                                        <span key="t-apps">Contacts</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </Container>
            </div>
        </>
    )
}

export default BottomHeader
