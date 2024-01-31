import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import BlogTable from '../../Components/TableContent/BlogTable'

const Blog = () => {
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="Blog" />
              <BlogTable />
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog
