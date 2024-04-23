import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomHeader from './BottomHeader';
import Swal from 'sweetalert2';

// import MegaMenu from './MegaMenu';

const Header = () => {
    const navigate = useNavigate();
    function toggleFullscreen() {
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    const handlelogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('authToken');
                const api_url = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${api_url}/adminusers/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const results = await response.json();
                if (results.status === 1) {
                    navigate('/');
                    localStorage.removeItem('authToken');
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error ',
                        icon: 'error',
                    });
                    console.log('errror')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box ">
                            <Link to="/Dashboard" className="logo logo-light ">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo.png" alt="" height={30} />
                                </span>
                                <span className="logo-lg">
                                    <img src="/assets/images/logo.png" alt="" height={50} />
                                </span>
                            </Link>
                        </div>
                        <div className="schoolname">
                            <Link to="/Dashboard">
                                <h3>Diva<span className='text-light'>Drapes</span></h3>
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                            data-bs-toggle="collapse"
                            data-bs-target="#topnav-menu-content"
                        >
                            <i className="fa fa-fw fa-bars" />
                        </button>
                        {/* <MegaMenu/> */}
                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button
                                type="button"
                                className="btn header-item noti-icon waves-effect"
                                data-bs-toggle="fullscreen"
                                onClick={toggleFullscreen}
                            >
                                <i className="bx bx-fullscreen" />
                            </button>
                        </div>

                        <div className="dropdown d-inline-block">
                            <button
                                type="button"
                                className="btn header-item waves-effect"
                                id="page-header-user-dropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    className="rounded-circle header-profile-user"
                                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                                    alt="Header Avatar"
                                />
                                <span className="d-none d-xl-inline-block ms-1" key="t-henry">
                                    Admin
                                </span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link className="dropdown-item" to="/ChangePassword">
                                    <i className="bx bx-user font-size-16 align-middle me-1" />
                                    <span key="t-profile">Change Password</span>
                                </Link>
                                <div className="dropdown-divider" />
                                <Link className="dropdown-item text-danger" onClick={handlelogout} to={''}>
                                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                                    <span key="t-logout">Logout</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <BottomHeader />
        </>
    )
}

export default Header
