import React, {  useState } from "react";
import usFlag from "../../assets/flags/us.jpg"

const Language = () => {
    const [menu, setMenu] = useState(false);
    const toggle = () => {
        setMenu(!menu);
    }
    return (
        <>
            <div className="dropdown d-inline-block">
                <button
                    type="button"
                    className="btn header-item waves-effect"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img
                        id="header-lang-img"
                        src={usFlag}
                        alt="Header Language"
                        height={16}
                    />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                    <a
                        href="javascript:void(0);"
                        className="dropdown-item notify-item language"
                        data-lang="en"
                    >
                        <img
                            src={usFlag}
                            alt="user-image"
                            className="me-1"
                            height={12}
                        />
                        <span className="align-middle">English</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Language
