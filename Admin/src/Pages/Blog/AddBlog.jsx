import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import BlogAdd from '../../Components/AddComponentsForm/BlogAdd'

const AddBlog = () => {
    return (
        <>
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <Container fluid={true}>
                            <Breadcrumb title="Dashboard" breadcrumbItem="Add Blog" />
                            <BlogAdd />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBlog
