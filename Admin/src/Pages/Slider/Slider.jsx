import React, { useEffect, useRef, useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody } from "reactstrap";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


const Slider = () => {
    const refFrom = useRef(null);
    const [slider_img, setSlider_img] = useState();
    const [imgtype, setImgtype] = useState('');
    const [newData, setnewData] = useState([]);
    const Url = process.env.REACT_APP_BASE_URL;
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
            formData.append('imgtype', imgtype);
            const response = await fetch(`${api_url}/slider/insert`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.status === 200) {
                Swal.fire({
                    title: "success!",
                    text: " Image Upload Success!",
                    icon: "success"
                });
                // fetchImages();
                const result = await response.text();
                console.log(result, 'result')
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
            const response = await fetch(`${Url}/slider/getall`);
            const results = await response.json();
            console.log(results, 'results')
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
                            <Breadcrumb title="Dashboard" breadcrumbItem="Slider,Banner" />
                            <Row>
                                <Col lg={6}>
                                    <Card>
                                        <CardBody>
                                            <div className="add_content_form pt-1 mb-3">
                                                <h4>Slider</h4>
                                                <form onSubmit={handleUpload} ref={refFrom} className='suggestionpage contactform'>
                                                    <Row>
                                                        <Col md={8} sm={8}>
                                                            <div className="mb-3">
                                                                <label htmlFor="slider_img" className="form-label">
                                                                    Upload Image <span className='text-danger'>*</span>
                                                                </label>
                                                                <input type="file" className="form-control" name="slider_img"
                                                                    onChange={(e) => setSlider_img(e.target.files[0])} id="slider_img" required />
                                                            </div>
                                                        </Col>
                                                        <Col md={4} sm={4} className='mt-4 pt-1'>
                                                            <Button color="primary" type='submit' onClick={() => setImgtype('slider')}>
                                                                Upload <i className='bx bx-upload'></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                            <hr />
                                            <div className="table-responsive scrollableTable">
                                                <Table className="table align-middle table-nowrap  w-100 mb-0 table-bordered table-hover  usersTables">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>S.N</th>
                                                            <th className="align-middle">Image</th>
                                                            <th className="align-middle">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {newData && newData.length > 0 ? (
                                                            newData.map((data, idx) =>
                                                                data.imgtype === 'slider' ? <tr key={idx}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>
                                                                        <div className="img_box">
                                                                            <img src={`${Url}/uploads/${data.imgUrl}`} alt="" />
                                                                        </div>
                                                                    </td>
                                                                    <td><Link to={''} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                                                    </td>
                                                                </tr> : ''
                                                            )
                                                        ) : (
                                                            ''
                                                        )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg={6}>
                                    <Card>
                                        <CardBody>
                                            <div className="add_content_form pt-1 mb-3">
                                                <h4>Banner</h4>
                                                <form onSubmit={handleUpload} ref={refFrom} className='suggestionpage contactform'>
                                                    <Row>
                                                        <Col md={8} sm={8}>
                                                            <div className="mb-3">
                                                                <label htmlFor="slider_img" className="form-label">
                                                                    Upload Image <span className='text-danger'>*</span>
                                                                </label>
                                                                <input type="file" className="form-control" name="slider_img"
                                                                    onChange={(e) => setSlider_img(e.target.files[0])} id="slider_img" required />
                                                            </div>
                                                        </Col>
                                                        <Col md={4} sm={4} className='mt-4 pt-1'>
                                                            <Button color="primary" type='submit' onClick={() => setImgtype('banner')} >
                                                                Upload <i className='bx bx-upload'></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                            <hr />
                                            <div className="table-responsive scrollableTable">
                                                <Table className="table align-middle table-nowrap  w-100 mb-0 table-bordered table-hover  usersTables">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>S.N</th>
                                                            <th className="align-middle">Image</th>
                                                            <th className="align-middle">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {newData && newData.length > 0 ? (
                                                            newData.map((data, idx) =>
                                                                data.imgtype === 'banner' ? <tr key={idx}>
                                                                    <td>{idx + 1}</td>
                                                                    <td>
                                                                        <div className="img_box">
                                                                            <img src={`${Url}/uploads/${data.imgUrl}`} alt="" />
                                                                        </div>
                                                                    </td>
                                                                    <td><Link to={''} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                                                    </td>
                                                                </tr> : ''
                                                            )
                                                        ) : (
                                                            ''
                                                        )
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
        </>
    )
}

export default Slider
