import React, { useEffect, useRef, useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody, CardTitle, Modal, ModalHeader, ModalBody } from "reactstrap";
import Swal from 'sweetalert2'
import moment from 'moment';

const NewJoiners = () => {
  const refFrom = useRef(null);
  const [inputData, setinputData] = useState({
    name: "",
    batch: "",
  });
  const [batchyear, setBatchyear] = useState();
  const [modal, setModal] = useState(false);
  const [newData, setnewData] = useState([]);
  const [new_joiners_img, setNew_joiners_img] = useState();
  const [updateData, setUpdateData] = useState({
    name: "",
    batch: "",
  });
  const [upjoinersimg, setUpjoinersimg] = useState();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchImages();
    getyear();
  }, []);
  const token = localStorage.getItem('authToken');
  const getyear = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1978;
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    setBatchyear(years)
  };
  const onChangeSubmit = (e) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const formData = new FormData();
      formData.append('document_file', new_joiners_img);
      formData.append('name', inputData.name);
      formData.append('batch', inputData.batch);
      const response = await fetch(`${api_url}/newjoiners/insert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      // console.log(response)
      if (response.status === 200) {
        Swal.fire({
          title: "success!",
          text: "Image Upload Successfully!",
          icon: "success"
        });
        fetchImages();
        const result = await response.text();
      } else {
        console.log('server error');
      }
      refFrom.current.reset();
      setinputData({
        name: "",
        batch: "",
      })
    }
    catch (error) {
      console.log(error);
    }
  };
  const fetchImages = async () => {
    try {
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/newjoiners/getImg`);
      const results = await response.json();
      setnewData([...results].reverse());
    } catch (err) {
      console.log(err, 'images fetching error')
    }
  };
  const handleDl = async (imgId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });
    if (result.isConfirmed) {
      try {
        const api_Url = process.env.REACT_APP_BASE_URL;
        const newresponse = await fetch(`${api_Url}/newjoiners/dlImg/${imgId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // console.log(newresponse) 
        const newdata = await newresponse.json();
        if (newresponse.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: newdata.message,
            icon: 'success',
          });
          setnewData((pre) => pre.filter(newData => newData._id !== imgId));
          console.log('new joiner delete Successfully');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error deleting user',
            icon: 'error',
          });
          console.log('something went wrong');
        }
      } catch (error) {
        console.error('delete new joiner error', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error deleting user',
          icon: 'error',
        });
      }
    }
  };
  const getImgById = async (id) => {
    toggle();
    try {
      const api_Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_Url}/newjoiners/getbyid/${id}`);
      if (response.status === 200) {
        const result = await response.json();
        setUpdateData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateOnchange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  }
  const handleupdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append('document_file', upjoinersimg);
      formData.append('name', updateData.name);
      formData.append('batch', updateData.batch);
      const api_Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_Url}/newjoiners/updateimg/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.status == 200) {
        Swal.fire({
          title: "success!",
          text: "New Joiner Update Successfully!",
          icon: "success"
        });
        fetchImages();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="New Joiners" />
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle >
                        <div className="add_content_form pt-3 mb-3">
                          <form onSubmit={handleSubmit} ref={refFrom} className='suggestionpage contactform'>
                            <Row>
                              <Col md={3}>
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">
                                    New joiner name <span className='text-danger'>*</span>
                                  </label>
                                  <input type="text" className="form-control" name="name"
                                    value={inputData.name} onChange={onChangeSubmit}
                                    id="name" placeholder='Enter name' required />
                                </div>
                              </Col>
                              <Col md={3}>
                                <div className="mb-3">
                                  <label htmlFor="batch" className="form-label">
                                    Batch<span className='text-danger'>*</span>
                                  </label>
                                  <select name="batch" className="form-control" value={inputData.batch}
                                    onChange={onChangeSubmit} id='batch'>
                                    <option value='' disabled>Select Batch Year</option>
                                    {batchyear?.map((year, idx) => (
                                      <option key={idx} value={year}>
                                        {year}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                              <Col md={3}>
                                <div className="mb-3">
                                  <label htmlFor="document_file" className="form-label">
                                    Upload Image <span className='text-danger'>*</span>
                                  </label>
                                  <input type="file" className="form-control" name="document_file"
                                    onChange={(e) => setNew_joiners_img(e.target.files[0])}
                                    id="document_file" required />
                                </div>
                              </Col>
                              <Col md={3} className='mt-4 pt-1'>
                                <Button color="primary" type='submit'>
                                  Upload <i className='bx bx-upload'></i>
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </CardTitle>
                      <hr />
                      <br />
                      <div className="table-responsive scrollableTable">
                        <Table className="table align-middle table-nowrap mb-0 table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th className="align-middle">S.N</th>
                              <th className="align-middle">Name</th>
                              <th className="align-middle">Batch</th>
                              <th className="align-middle">Image</th>
                              <th className="align-middle">Date</th>
                              <th className="align-middle">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              newData?.map((image, idx) => {
                                const srNo = idx + 1;
                                const ndate = moment(image.createdAt);
                                const formattedDob = ndate.format('DD-MM-YYYY');
                                return (
                                  <tr key={idx}>
                                    <td>{srNo}</td>
                                    <td>{image.name}</td>
                                    <td>{image.batch}</td>
                                    <td>
                                      <div className="userimg">
                                        {
                                          image.imageUrl ? (
                                            <img src={image.imageUrl} style={{ height: '50px', width: '50px', borderRadius: '5px' }} alt="" />
                                          ) : (
                                            <img src="https://media.istockphoto.com/id/1442933582/tr/vekt%C3%B6r/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=orfn0hE2ar86AEOUXLCue8tS0IMzTRcb3EFvfW4orq0=" style={{ height: '50px', width: "50px", borderRadius: "5px" }} alt="" />
                                          )
                                        }
                                      </div>
                                    </td>
                                    <td>{formattedDob}</td>
                                    <td>
                                      <a href="javascript: void(0);" onClick={() => getImgById(image._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></a>
                                      <a href="javascript: void(0);" onClick={() => handleDl(image._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></a>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} size="md" toggle={toggle} >
        <ModalHeader toggle={toggle}> Update New Joiners Image</ModalHeader>
        <ModalBody>
          <div className="upadteform">
            {
              updateData && (
                <>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        New joiner name
                      </label>
                      <input type="text" className="form-control" name="name"
                        value={updateData.name} onChange={updateOnchange}
                        id="name" placeholder='Enter name' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="batch" className="form-label">
                        Batch
                      </label>
                      <select name="batch" className="form-control" value={updateData.batch}
                        onChange={updateOnchange} id='batch'>
                        <option value='' disabled>Select Batch Year</option>
                        {batchyear?.map((year, idx) => (
                          <option key={idx} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Row>
                      <Col xl={8} lg={8} sm={8} className='col-8'>
                        <div className="mb-3">
                          <label htmlFor="document_file" className="form-label">
                            Upload Image
                          </label>
                          <input type="file" className="form-control" name="document_file"
                            onChange={(e) => setUpjoinersimg(e.target.files[0])}
                            id="document_file" />
                        </div>
                      </Col>
                      <Col xl={4} lg={4} sm={4} className='col-4'>
                        <div className="already_uplaoedimg text-end pt-4">
                          <img src={updateData.imageUrl} className='galleryimgbox' alt="" />
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3 text-center mt-4">
                      <button type="submit" onClick={() => handleupdate(updateData._id)} className="btn btn-primary">
                        Update <i className='bx bx-edit-alt'></i>
                      </button>
                    </div>
                  </form>
                </>
              )
            }
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default NewJoiners
