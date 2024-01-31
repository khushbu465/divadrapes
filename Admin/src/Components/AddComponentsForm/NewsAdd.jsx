import React, { useRef, useState } from 'react'
import { Card, Row, Col, CardBody } from "reactstrap";
import Swal from 'sweetalert2'

const NewsAdd = () => {
    const refFrom = useRef(null);
    const [formdata, setFormdata] = useState({
        news_heading: "",
        news_des: "",
    });
    const handleonChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const token = localStorage.getItem('authToken');
    const submitnews = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                heading: formdata.news_heading,
                description: formdata.news_des,
            }
            const base_url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${base_url}/news/insert`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.status === 200) {
                Swal.fire({
                    title: "success!",
                    text: "News Add Successfully!",
                    icon: "success"
                });
                console.log('News add successfully');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.error('Failed to add news');
            }
            refFrom.current.reset();
            setFormdata({
                news_heading: "",
                news_des: "",
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Row className='mt-4'>
                <Col lg={2}></Col>
                <Col lg={8}>
                    <Card>
                        <CardBody>
                            <div className="add_content_form">
                                <form onSubmit={submitnews} ref={refFrom} className='suggestionpage contactform'>
                                    <div className="mb-3">
                                        <label htmlFor="news_heading" className="form-label">
                                            News Headline <span className='text-danger'>*</span>
                                        </label>
                                        <input type="text" className="form-control" name="news_heading" value={formdata.news_heading} onChange={handleonChange} id="news_heading" placeholder='News Headline' required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="news_des" className="form-label">
                                            News Description <span className='text-danger'>*</span>
                                        </label>
                                        <textarea className="form-control" cols="10" name="news_des" value={formdata.news_des} onChange={handleonChange} id="news_des" placeholder='Write News Description Here' required rows="5"></textarea>
                                    </div>
                                    <div className="mb-3 text-center mt-4">
                                        <button type="submit" className="btn btn-primary">
                                            Add  <i className='bx bx-plus-circle'></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default NewsAdd
