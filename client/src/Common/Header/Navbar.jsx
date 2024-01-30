import React from 'react'
import Topnav from './Topnav'
import MiddleNav from './MiddleNav'
import BottomNav from './BottomNav'

const Navbar = () => {
    return (
        <>
            <header className="header-area header-style-4 header-height-2">
                <Topnav />
                <MiddleNav />
                <BottomNav />
            </header>

        </>
    )
}

export default Navbar
