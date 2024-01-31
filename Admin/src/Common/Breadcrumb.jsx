import React from 'react'
import { Row, Col, BreadcrumbItem } from "reactstrap"
import { Link } from "react-router-dom"

const Breadcrumb = (props) => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">{props.breadcrumbItem}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <BreadcrumbItem>
                                    <Link to="#">{props.title}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    <Link to="#">{props.breadcrumbItem}</Link>
                                </BreadcrumbItem>
                            </ol>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Breadcrumb
