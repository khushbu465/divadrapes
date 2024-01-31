import React, { useState } from 'react'
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const MegaMenu = () => {
    const [menu, setMenu] = useState(false);

    return (
        <>
            <Dropdown className=" dropdown-mega d-none d-lg-block ms-2"
                isOpen={menu}
                toggle={() => setMenu(!menu)}>
                <DropdownToggle
                    className="header-item waves-effect" style={{ background: "transparent" }}
                    caret
                >
                    <span key="t-megamenu">Mega Menu</span>
                    <i className="mdi mdi-chevron-down" />
                </DropdownToggle>
                <DropdownMenu className=" dropdown-megamenu">
                    <Row>
                        <Col sm={8}>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5 className="font-size-14" key="t-ui-components">
                                        UI Components
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <a href="javascript:void(0);" key="t-lightbox">
                                                Lightbox
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-range-slider">
                                                Range Slider
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-sweet-alert">
                                                Sweet Alert
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-rating">
                                                Rating
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-forms">
                                                Forms
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-tables">
                                                Tables
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-charts">
                                                Charts
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="font-size-14" key="t-applications">
                                        Applications
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <a href="javascript:void(0);" key="t-ecommerce">
                                                Ecommerce
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-calendar">
                                                Calendar
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-email">
                                                Email
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-projects">
                                                Projects
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-tasks">
                                                Tasks
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-contacts">
                                                Contacts
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="font-size-14" key="t-extra-pages">
                                        Extra Pages
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <a href="javascript:void(0);" key="t-light-sidebar">
                                                Light Sidebar
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-compact-sidebar">
                                                Compact Sidebar
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-horizontal">
                                                Horizontal layout
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-maintenance">
                                                Maintenance
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-coming-soon">
                                                Coming Soon
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-timeline">
                                                Timeline
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-faqs">
                                                FAQs
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h5 className="font-size-14" key="t-ui-components">
                                        UI Components
                                    </h5>
                                    <ul className="list-unstyled megamenu-list">
                                        <li>
                                            <a href="javascript:void(0);" key="t-lightbox">
                                                Lightbox
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-range-slider">
                                                Range Slider
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-sweet-alert">
                                                Sweet Alert
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-rating">
                                                Rating
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-forms">
                                                Forms
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-tables">
                                                Tables
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" key="t-charts">
                                                Charts
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-5">
                                    <div>
                                        <img
                                            src="assets/images/megamenu-img.png"
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default MegaMenu
