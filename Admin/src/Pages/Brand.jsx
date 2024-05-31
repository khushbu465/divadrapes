import React, { useEffect, useRef, useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../Common/Breadcrumb"
import { Card, Row, Col, CardBody } from "reactstrap";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import BrandTable from '../Components/TableContent/BrandTable';

const Brand = () => {
  const [brandName, setBrandname] = useState();
  const [brandImg, setBrandImg] = useState();

  const token = localStorage.getItem('authToken');
  const api_url = process.env.REACT_APP_BASE_URL;

  const handle_add = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('brand_img', brandImg);
      formData.append('brand_name', brandName);
      const response = await fetch(`${api_url}/brands/insert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "success!",
          text: " Brand Add Successfully!",
          icon: "success"
        });
        // fetchImages();
        const result = await response.text();
        console.log(result, 'result')
      } else {
        console.log('server error');
      }
      // refFrom.current.reset();
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="Brand" />
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="add_content_form pt-1 mb-3">
                        <h4>Brand</h4>
                        <form handle={handle_add} className='suggestionpage contactform'>
                          <Row>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="brand_name" className="form-label">
                                  Brand Name <span className='text-danger'>*</span>
                                </label>
                                <input type="text" className="form-control" value={brandName} placeholder='Brand Name' onChange={(e) => setBrandname(e.target.value)} name="brand_name"
                                  id="brand_name" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="Brand_img" className="form-label">
                                  Brand Image <span className='text-danger'>*</span>
                                </label>
                                <input type="file" className="form-control" onChange={(e) => setBrandImg(e.target.files[0])} name="Brand_img"
                                  id="Brand_img" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4} className='mt-4 pt-1'>
                              <Button color="primary" type='submit'>
                                Add Brand <i className='bx bx-upload'></i>
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </div>
                      <hr />
                      {/* <BrandTable Alldata='j'/> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Brand
