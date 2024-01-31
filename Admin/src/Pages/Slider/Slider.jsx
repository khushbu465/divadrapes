import React, { useEffect, useRef, useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody, CardTitle, Modal, ModalHeader, ModalBody } from "reactstrap";
import Swal from 'sweetalert2'
import moment from 'moment';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"

const Slider = () => {
    const refFrom = useRef(null);
    const [slider_img, setSlider_img] = useState();
    const [newData, setnewData] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const api_url = process.env.REACT_APP_BASE_URL;
            const formData = new FormData();
            formData.append('slider_img', slider_img);
            const response = await fetch(`http://localhost:5500/slider/insert`, {
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
                    text: "Slider Image Upload Successfully!",
                    icon: "success"
                });
                // fetchImages();
                const result = await response.text();
            } else {
                console.log('server error');
            }
            refFrom.current.reset();
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchImages = async () => {
        try {
            const Url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`http://localhost:5500/slider/getall`);
            const results = await response.json();
            setnewData([...results].reverse());
        } catch (err) {
            console.log(err, 'images fetching error')
        }
    };
    return (
        <>
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <Container fluid={true}>
                            <Breadcrumb title="Dashboard" breadcrumbItem="Slider" />
                            <Row>
                                <Col lg={12}>
                                    <Card>
                                        <CardBody>
                                            <div className="add_content_form pt-3 mb-3">
                                                <form onSubmit={handleUpload} className='suggestionpage contactform'>
                                                    <Row>
                                                        <Col md={6}>
                                                            <div className="mb-3">
                                                                <label htmlFor="slider_img" className="form-label">
                                                                    Upload Image <span className='text-danger'>*</span>
                                                                </label>
                                                                <input type="file" className="form-control" name="slider_img"
                                                                    onChange={(e) => setSlider_img(e.target.files[0])} id="slider_img" required />
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
                                            <hr />
                                            <br />
                                            <div className="table-responsive scrollableTable">

                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            {/* <Modal isOpen={modal} size="md" toggle={toggle} >
                <ModalHeader toggle={toggle}> Update New Joiners Image</ModalHeader>
                <ModalBody>
                    <div className="upadteform">
                        {
                            updateData && (
                                <>
                                    <form onSubmit={(e) => e.preventDefault()}>
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
            </Modal> */}
        </>
    )
}

export default Slider
