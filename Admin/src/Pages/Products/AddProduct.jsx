import React, { useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody } from "reactstrap";

const AddProduct = () => {
  const [formData, setFormData] = useState({
  
  })
  const handle_onchange = (e) => {
    const {name,value} =e.target;
    setFormData((prev)=>({
      ...prev,[name]:value,
    }))

  }
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="Add Product" />
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="add_content_form pt-1 mb-3">
                        <form className='suggestionpage contactform'>
                          <Row>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="product_name" className="form-label">
                                  Product Name <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Name" name="product_name"
                                  id="product_name" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="product_title" className="form-label">
                                  Product Title <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Title" name="product_title"
                                  id="product_title" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="product_category" className="form-label">
                                  Product Category <span className='text-danger'>*</span>
                                </label>
                                <select name="product_category" id="product_category" className='form-control'>
                                  <option value="product_category">Select Product Category</option>
                                  <option value="product_category">product_category</option>
                                </select>
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="product_subcategory" className="form-label">
                                  Product Sub Category <span className='text-danger'>*</span>
                                </label>
                                <select name="product_subcategory" id="product_subcategory" className='form-control'>
                                  <option value="product_subcategory">Select Product Category</option>
                                  <option value="product_subcategory">product_subcategory</option>
                                </select>
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="modal_name" className="form-label">
                                  Modal Name <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Modal Name" name="modal_name"
                                  id="modal_name" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="mrp" className="form-label">
                                  Product Mrp<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product MRP" name="mrp"
                                  id="mrp" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="discount" className="form-label">
                                  Discount<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Discount" name="discount"
                                  id="discount" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="offer" className="form-label">
                                  Offer<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product offer" name="offer"
                                  id="offer" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="offer" className="form-label">
                                  Offer<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product offer" name="offer"
                                  id="offer" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="brand" className="form-label">
                                  Brand<span className='text-danger'>*</span>
                                </label>
                                <select name="brand" id="brand" className='form-control'>
                                  <option value="brand">Select Brand</option>
                                  <option value="brand">Brand</option>
                                </select>
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="stock" className="form-label">
                                  Stock<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Stock" name="stock"
                                  id="stock" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="highlights" className="form-label">
                                  Highlights<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Product Highlights" name="highlights"
                                  id="highlights" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="highlights" className="form-label">
                                  Manufacturer<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Manufacturer" name="highlights"
                                  id="highlights" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="highlights" className="form-label">
                                  Packer<span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Packer" name="highlights"
                                  id="highlights" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="itemweight" className="form-label">
                                  Item Weight <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder="Item Weight" name="itemweight"
                                  id="itemweight" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="genericname" className="form-label">
                                  Generic Name <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder=" Generic Name" name="genericname"
                                  id="genericname" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                  Price <span className='text-danger'>*</span>
                                </label>
                                <input type="text " className="form-control" onChange={handle_onchange} placeholder=" Price" name="price"
                                  id="price" required />
                              </div>
                            </Col>
                            <Col md={4} sm={4}>
                              <div className="mb-3">
                                <label htmlFor="color" className="form-label">
                                  Color<span className='text-danger'>*</span>
                                </label>
                                <select name="color" id="color" className='form-control'>
                                  <option value="color">Select Color</option>
                                  <option value="color">Color</option>
                                </select>
                              </div>
                            </Col>
                            <Col md={6} sm={6}>
                              <div className="mb-3">
                                <label htmlFor="size" className="form-label">
                                  Size<span className='text-danger'>*</span>
                                </label>
                                <select name="size" id="size" className='form-control'>
                                  <option value="size">Select size</option>
                                  <option value="size">size</option>
                                </select>
                              </div>
                            </Col>
                            <Col md={6} sm={6}>
                              <div className="mb-3">
                                <label htmlFor="product_img" className="form-label">
                                  Product Image <span className='text-danger'>*</span>
                                </label>
                                <input type="file" className="form-control" onChange={handle_onchange} multiple name="product_img"
                                  id="product_img" required />
                              </div>
                            </Col>
                            <Col md={6} sm={6}>
                              <div className="mb-3">
                                <label htmlFor="short_des" className="form-label">
                                  Short Description <span className='text-danger'>*</span>
                                </label>
                                <textarea placeholder='Short Description' className='form-control' name="short_des" id="short_des" cols="10" rows="5"></textarea>
                              </div>
                            </Col>
                            <Col md={6} sm={6}>
                              <div className="mb-3">
                                <label htmlFor="long_des" className="form-label">
                                  Long Description <span className='text-danger'>*</span>
                                </label>
                                <textarea placeholder='Long Description' className='form-control' name="long_des" id="long_des" cols="10" rows="5"></textarea>
                              </div>
                            </Col>
                            <Col md={12} sm={12} className='mt-4 pt-1 text-center'>
                              <Button color="primary" type='submit'>
                                Add Product <i className='bx bx-plus-circle'></i>
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </div>
                      <hr />
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

export default AddProduct
