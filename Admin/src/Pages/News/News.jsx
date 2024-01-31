import React from 'react'
import Header from '../../Common/header/Header'
import { Container } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import Footer from "../../Common/Footer"
import NewsTable from '../../Components/TableContent/NewsTable'

const News = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb title="Dashboard" breadcrumbItem="News And Events" />
            <NewsTable />
          </Container>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default News
