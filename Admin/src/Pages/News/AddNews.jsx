import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import NewsAdd from '../../Components/AddComponentsForm/NewsAdd'

const AddNews = () => {
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="Add News" />
              <NewsAdd />
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNews
