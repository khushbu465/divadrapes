import React, { useState, useRef } from 'react'
import { Card, Row, Col, CardBody } from "reactstrap";
import Swal from 'sweetalert2'
import CKEditorCompo from './CKEditorCompo';

const Addblogs = () => {
    const refContainer = useRef(null);
    const [formdata, setFormdata] = useState({
        blog_heading: "",
        author: "",
        blog_des: ""
    });
    const [blogimg, setBlogimg] = useState();
    const [blog_des, setBlog_des] = useState('');
    const handleEditorChange = (newData) => {
        setBlog_des(newData);
    };
    const token = localStorage.getItem('authToken');
    const handleoncahnge = (e) => {
        const { name, value } = e.target;
        setFormdata((pre) => ({ ...pre, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDatas = new FormData();
            formDatas.append('blog_heading', formdata.blog_heading);
            formDatas.append('author', formdata.author);
            formDatas.append('blogimg', blogimg);
            formDatas.append('blog_des', blog_des);
            const api_url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(` ${api_url}/blog/insert`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDatas,
            });
            if (response.status === 200) {
                Swal.fire({
                    title: "success!",
                    text: "Blog Add Successfully!",
                    icon: "success"
                });

                console.log('Blog add successfully');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });

            }
            refContainer.current.reset();
            setBlog_des(' ');
            setFormdata({
                blog_heading: "",
                author: "",
                blog_des: ""
            })
        } catch (error) {
            console.log(error, 'something went wrong');
        }
    };

    return (
        <>
            <Row className='mt-4'>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <div className="add_content_form">
                                <form onSubmit={handleSubmit} ref={refContainer} className='suggestionpage contactform'>
                                    <Row>
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <label htmlFor="blog_heading" className="form-label">
                                                    Blog Heading <span className='text-danger'>*</span>
                                                </label>
                                                <input type="text" className="form-control" name="blog_heading" value={formdata.blog_heading} onChange={handleoncahnge} id="blog_heading" placeholder='Blog Heading' required />

                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <label htmlFor="author" className="form-label">
                                                    Author<span className='text-danger'>*</span>
                                                </label>
                                                <input type="text" className="form-control" name="author" value={formdata.author} onChange={handleoncahnge} id="author" placeholder='Author' required />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <label htmlFor="blogimg" className="form-label">
                                                    Blog Images 
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control" name="blogimg" onChange={(e) => setBlogimg(e.target.files[0])}
                                                    id="blogimg"
                                                    placeholder='Blog Images'
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col xl={12}>
                                        <label htmlFor="des">Blog  Description <span className='text-danger'>*</span></label>
                                        <CKEditorCompo data={blog_des} onChange={handleEditorChange} />
                                    </Col>
                                    {/* <div className="mb-3">
                                        <label htmlFor="blog_des" className="form-label">
                                            Blog Description <span className='text-danger'>*</span>
                                        </label>
                                        <textarea name="blog_des" id="blog_des" cols="10" placeholder='Write Blog Description Here' required className="form-control" value={formdata.blog_des} onChange={handleoncahnge} rows="5"></textarea>
                                    </div> */}
                                    <div className="mb-3 text-center mt-5">
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

export default Addblogs
