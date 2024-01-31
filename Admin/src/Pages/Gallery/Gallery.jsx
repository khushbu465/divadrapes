import React, { useEffect, useRef, useState } from 'react'
import { Container, Table } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody, Modal, ModalHeader, ModalBody, TabPane, TabContent, NavItem, NavLink, Nav } from "reactstrap";
import Swal from 'sweetalert2'
import moment from 'moment'
import { Link } from 'react-router-dom'
import classnames from 'classnames';

const Gallery = () => {
  const refFrom = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [allImages, setAllimages] = useState([]);
  const [modal, setModal] = useState(false);
  const [secondmodal, setSeccondmodal] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updateImg, setUpdateImg] = useState([]);
  const [oldImg, setOlgImg] = useState();
  const [singleimg, setSingleimg] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [galleryid, setGalleryid] = useState();
  const [imgIndex, setImgIndex] = useState();

  const toggle = () => setModal(!modal);
  const openmodal = () => setSeccondmodal(!secondmodal);
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    fecthImages();
  }, []);
  const token = localStorage.getItem('authToken');

  const fecthImages = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${apiUrl}/gallery/getGallery`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();
      setAllimages([...results].reverse());
      // setAllimages(results);
    } catch (error) {
      console.log(error, "images not fetch")
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const galleryimg of selectedImages) {
      formData.append('galleryimg', galleryimg);
    }
    formData.append('description', description);
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_url}/gallery/insert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "success!",
          text: "Data saved Successfully!",
          icon: "success"
        });
        fecthImages();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log("error")
      }
      refFrom.current.reset();
      setDescription(' ');
    } catch (error) {
      console.error('Error uploading images:', error.message);
    }
  };
  const deleteImgs = async (gId) => {
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
        const apiUrl = process.env.REACT_APP_BASE_URL;
        const response = await fetch(`${apiUrl}/gallery/deleteimgs/${gId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Gallery Images Delete successfully!',
            icon: 'success',
          });
          setAllimages((preimg) => preimg.filter(allImages => allImages._id !== gId));
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Gallery Images not deleting ',
            icon: 'error',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Gallery Images not deleting ',
          icon: 'error',
        });
      }
    }
  };
  const getGalleryById = async (uId) => {
    toggle();
    try {
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/gallery/getgalleryimg/${uId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const result = await response.json();
        setUpdateData(result)
      }
    } catch (error) {
      console.log(error, "not fecth")
    }
  };
  const updateOnchange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
  }
  const handleupdate = async (GId) => {
    try {
      const formdata = new FormData();
      for (const galleryimg of updateImg) {
        formdata.append('galleryimg', galleryimg);
      }
      formdata.append('description', updateData.description);
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/gallery/updategallery/${GId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formdata,
      });
      // console.log(response, 'response')
      if (response.status === 200) {
        Swal.fire({
          title: "success!",
          text: "Gallery Update Successfully!",
          icon: "success"
        });
        const updatedGallery = await response.json();
        setAllimages((predata) => predata.map((data) => data._id === updatedGallery._id ? { ...data, ...updatedGallery } : data));
        setModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log(error)
    }
  };
  const handleOneImg = async (gId, index) => {
    openmodal();
    setGalleryid(gId)
    setImgIndex(index);
    const Url = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${Url}/gallery/getOneImg/${gId}/${index}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      setOlgImg(result);
    } else {
      console.log('error');
    }
  };
  const deleteOneimg = async () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${apiUrl}/gallery/deleteImage/${galleryid}/${oldImg}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      Swal.fire({
        title: 'Deleted!',
        text: ' Images Delete successfully!',
        icon: 'success',
      });
      fecthImages();
      setSeccondmodal(false);
    } else {
      console.log('error')
    }
  };
  const updateOneimg = async () => {
    try {
      const formImg = new FormData();
      formImg.append('galleryimg', singleimg);
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/gallery/updateOne/${galleryid}/${imgIndex}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formImg,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "success!",
          text: "Image Update Successfully!",
          icon: "success"
        });
        fecthImages();
        setSeccondmodal(false);
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      console.log(err, 'error')
    }
  };
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb title="Dashboard" breadcrumbItem="Gallery" />
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="add_content_form pt-3 mb-3">
                        <form onSubmit={handleUpload} ref={refFrom} enctype="multipart/form-data">
                          <Row>
                            <Col md={4}>
                              <div className="mb-3">
                                <label htmlFor="galleryimg" className="form-label">
                                  Upload Gallery Images <span className='text-danger'>*</span>
                                </label>
                                <input type="file" accept="image/*"
                                  multiple className="form-control form-control-lg" name="galleryimg"
                                  onChange={(e) => setSelectedImages(e.target.files)}
                                  id="galleryimg" required />
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                  Description <span className='text-danger'>*</span>
                                </label>
                                <input type="text" className="form-control form-control-lg" name="description"
                                  value={description} onChange={(e) => setDescription(e.target.value)}
                                  id="description" placeholder='Enter Description' required />
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="mb-3 text-left mt-4 pt-1">
                                <button type="submit" className="btn btn-primary">
                                  Upload <i className='bx bx-upload'></i>
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </div>
                      <hr />
                      <br />
                      <div className="table-responsive scrollableTable">
                        <Table className="table align-middle table-nowrap mb-0 table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th className="align-middle">S.N</th>
                              <th className="align-middle">Image</th>
                              <th className="align-middle">Description</th>
                              <th className="align-middle">Date</th>
                              <th className="align-middle">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allImages.map((img, idx) => {
                                const gId = img._id;
                                const sr = idx + 1;
                                const postdate = moment(img.createdAt);
                                const formatdt = postdate.format('DD-MM-YYYY');
                                const gImg = img.images;
                                return (
                                  <tr key={idx}>
                                    <td>{sr}</td>
                                    <td>
                                      <Row>
                                        {gImg.map((pic, index) =>
                                          <Col key={index} md={1} className='bg-info border mt-1 p-1 galleryimgbox'>
                                            <div className="userimg" onClick={() => handleOneImg(gId, index)} >
                                              <img src={pic} alt="" />
                                            </div>
                                          </Col>
                                        )}
                                      </Row>
                                    </td>
                                    <td><p>{img.description}</p></td>
                                    <td>{formatdt}</td>
                                    <td>
                                      <Link to={''} onClick={() => getGalleryById(img._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></Link>
                                      <Link to={''} onClick={() => deleteImgs(img._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
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
      <Modal isOpen={secondmodal} size="md" toggle={openmodal} >
        <ModalHeader toggle={openmodal} > Action on particular image</ModalHeader>
        <ModalBody className='pt-0'>
          <div className="updateImage">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')} >
                  <i className='fa fa-edit'></i> Update
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}  >
                  <i className='fa fa-trash'></i>  Delete
                </NavLink>
              </NavItem>
              {/* Add more tabs as needed */}
            </Nav>
            <TabContent className='p-4 pb-0' activeTab={activeTab}>
              <TabPane tabId="1">
                {
                  oldImg && (
                    <form>
                      <Row>
                        <Col xl={8} md={8} sm={8} className='col-8'>
                          <label htmlFor='galleryimg'>Choose Image</label>
                          <input
                            name="galleryimg"
                            type="file"
                            onChange={(e) => setSingleimg(e.target.files[0])}
                            className="form-control form-control-lg" id='galleryimg'
                          />
                        </Col>
                        <Col xl={4} md={4} sm={4} className='col-4'>
                          <div className="already_uplaoedimg pt-4">
                            <img src={oldImg.imageDetails} className='updatedimg' alt="" />
                          </div>
                        </Col>
                        <Col md={12} className='text-center mt-3 mb-3'>
                          <buttn className='btn btn-outline-success btn-rounded' type='submit' onClick={updateOneimg}>
                            Update <i className='bx bx-edit-alt'></i>
                          </buttn>
                        </Col>
                      </Row>
                    </form>
                  )
                }
              </TabPane>
              <TabPane tabId="2">
                <p>You want to delete this image? &emsp;&emsp; <Link to={''} onClick={deleteOneimg}><b>Delete</b></Link></p>
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal} size="md" toggle={toggle} >
        <ModalHeader toggle={toggle}> Update Gallery Image</ModalHeader>
        <ModalBody>
          <div className="upadteform">
            {
              updateData && (
                <>
                  <form onSubmit={(e) => e.preventDefault()} ref={refFrom} enctype="multipart/form-data">
                    <div className="mb-3">
                      <label htmlFor="galleryimg" className="form-label">
                        Upload Gallery Images
                      </label>
                      <input type="file" accept="image/*"
                        multiple className="form-control form-control-lg" name="galleryimg"
                        onChange={(e) => setUpdateImg(e.target.files)}
                        id="galleryimg" />
                      <p align="right " className='text-success mb-0 mt-0 fw-bold'>Uploaded Image {updateData.images ? updateData.images.length : 0}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input type="text" className="form-control form-control-lg" name="description"
                        onChange={updateOnchange} value={updateData.description}
                        id="description" placeholder='Enter Description' />
                    </div>
                    <div className="mb-3 text-center mt-4">
                      <button type="submit" className="btn btn-primary" onClick={() => handleupdate(updateData._id)} >
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

export default Gallery
