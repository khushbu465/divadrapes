import React, { useEffect, useRef, useState } from 'react'
import { Container, Table, Button } from 'reactstrap'
import Breadcrumb from "../../Common/Breadcrumb"
import { Card, Row, Col, CardBody } from "reactstrap";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import SliderTable from './SliderTable';


const Slider = () => {
    const refFrom = useRef(null);
    const [slider_img, setSlider_img] = useState();
    const [imgtype, setImgtype] = useState('');
    const [bannerdata, setBannerdata] = useState([]);
    const [sliderData, setSliderData] = useState([]);

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
            const sliderdatas = results.filter(item => item.imgtype === 'slider');
            setSliderData([...sliderdatas].reverse());
            const bannerdatas = results.filter(item => item.imgtype === 'banner');
            setBannerdata([...bannerdatas].reverse());
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
                                            <SliderTable Alldata={sliderData} />
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
                                            <SliderTable Alldata={bannerdata} />
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
