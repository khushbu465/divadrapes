import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from "../Common/Breadcrumb"
import UsersTable from '../Components/HomeContent/UsersTable'

const Users = () => {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumb title="Dashboard" breadcrumbItem="All Users" />
            <UsersTable />
          </Container>
        </div>
      </div>
    </>
  )
}

export default Users
