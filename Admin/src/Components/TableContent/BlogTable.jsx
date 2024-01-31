import React, { useEffect, useState } from 'react'
import { Card, Row, Col, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import CKEditorCompo from '../AddComponentsForm/CKEditorCompo';


const BlogTable = () => {
    const [modal, setModal] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchinput, setSearchinput] = useState();
    const [updatedblog, setUpdatedblog] = useState({
        blog_heading: "",
        author: "",
        blog_des: ""
    });
    const [blogimg, setBlogimg] = useState();
    const [blog_des, setBlog_des] = useState('');
    const handleEditorChange = (newData) => {
        setBlog_des(newData);
    };
    const toggle = () => setModal(!modal);
    useEffect(() => {
        getblogs();
    }, []);
    const token = localStorage.getItem('authToken');

    const getblogs = async () => {
        try {
            const api_url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${api_url}/blog/getall`);
            const results = await response.json();
            setBlogs([...results].reverse());
            // console.log(results);
        } catch (error) {
            console.error(error);
        }
    };
    const removeBlog = async (bid) => {
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
                const newresponse = await fetch(`${api_Url}/blog/deleteblog/${bid}`, {
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
                    setBlogs((pre) => pre.filter(blogs => blogs._id !== bid));
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error deleting Blog',
                        icon: 'error',
                    });
                    console.log('something went wrong');
                }
            } catch (error) {
                console.error('Blog delete error', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error deleting Blog',
                    icon: 'error',
                });
            }
        }
    };
    const handlesearch = async (e) => {
        const searchinputs = e.target.value;
        setSearchinput(searchinputs);
        try {
            const apiUrl = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${apiUrl}/blog/search/api?q=${searchinput}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.log(error)
        }
    };
    const GetBlogById = async (blogid) => {
        toggle();
        try {
            const api_url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${api_url}/blog/getblogbyId/${blogid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const result = await response.json();
                setUpdatedblog(result);
                // console.log(result, 'result')
            } else {
                console.error(`fetch data error`);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };
    const updateonchange = (e) => {
        const { name, value } = e.target;
        setUpdatedblog((predata) => ({ ...predata, [name]: value }));
    };
    // console.log(updatedblog, 'updatedblog')
    const handleUpdate = async (id) => {
        try {
            const formdata = new FormData();
            formdata.append('blog_heading', updatedblog.blog_heading);
            formdata.append('author', updatedblog.author);
            formdata.append('blog_des', blog_des);
            formdata.append('blogimg', blogimg);
            const Url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${Url}/blog/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formdata,
            });
            if (response.ok) {
                Swal.fire({
                    title: "success!",
                    text: "Blog Update Successfully!",
                    icon: "success"
                });
                const newBlog = await response.json();
                // console.log(newBlog, 'newBlog')
                // setOldblog(newBlog);
                getblogs();
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
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={8}>
                                    <h5>  All Blogs  </h5>
                                </Col>
                                <Col md={4} className="text-end">
                                    <div className="searching_optipn text-end">
                                        <Row>
                                            <Col md={4} className="mt-2">
                                                <label htmlFor="searchiong">search:</label>
                                            </Col>
                                            <Col md={8}>
                                                <input type="search" onChange={handlesearch} placeholder="Search Here" className="form-control" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <div className="table-responsive scrollableTable">
                                <table className="table align-middle table-nowrap mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="align-middle">S.N</th>
                                            <th className="align-middle">Blog Heading</th>
                                            <th className="align-middle">Description</th>
                                            <th className="align-middle">Author</th>
                                            <th className="align-middle">Blog Image</th>
                                            <th className="align-middle">Date</th>
                                            <th className="align-middle">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchinput ?
                                            (
                                                searchResults == '' ? (
                                                    <>
                                                        <tr>
                                                            <td colspan="10" className="react-bs-table-no-data">No data to display.</td>

                                                        </tr>
                                                    </>

                                                ) : (
                                                    searchResults?.map((bimg, idx) => {
                                                        const srnum = idx + 1;
                                                        const postdate = moment(bimg.createdAt);
                                                        const formatdt = postdate.format('DD-MM-YYYY');
                                                        const blogDesc = bimg.blog_des;
                                                        const formattedContent = blogDesc.split('\n').map((paragraph, index) => (
                                                            <React.Fragment key={index} >
                                                                {paragraph}
                                                                {index < blogDesc.length - 1 && <br />}
                                                            </React.Fragment>
                                                        ));
                                                        return (
                                                            <tr>
                                                                <td>{srnum}</td>
                                                                <td>{bimg.blog_heading}</td>
                                                                <td>{formattedContent}</td>
                                                                <td>{bimg.author}</td>
                                                                <td>
                                                                    <div className="userimg">
                                                                        <img src={bimg.blogimg} className='galleryimgbox' alt="blogimg" />
                                                                    </div>
                                                                </td>
                                                                <td>{formatdt}</td>
                                                                <td>
                                                                    <Link to={''} onClick={() => GetBlogById(bimg._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></Link>
                                                                    <Link to={''} onClick={() => removeBlog(bimg._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            ) : (
                                                blogs?.map((bimg, idx) => {
                                                    const srnum = idx + 1;
                                                    const postdate = moment(bimg.createdAt);
                                                    const formatdt = postdate.format('DD-MM-YYYY');
                                                    const blogDesc = bimg.blog_des;
                                                    const unsafeHtmlContent = blogDesc;
                                                    const sanitizedHtmlContent = DOMPurify.sanitize(unsafeHtmlContent);
                                                    const formattedContent = blogDesc.split('\n').map((paragraph, index) => (
                                                        <React.Fragment key={index} >
                                                            {paragraph}
                                                            {index < blogDesc.length - 1 && <br />}
                                                        </React.Fragment>
                                                    ));
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{srnum}</td>
                                                            <td>{bimg.blog_heading}</td>
                                                            {/* <td>{formattedContent}</td> */}
                                                            <td> <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
                                                            </td>
                                                            <td>{bimg.author}</td>
                                                            <td>
                                                                <div className="userimg">
                                                                    <img src={bimg.blogimg} className='galleryimgbox' alt="blogimg" />
                                                                </div>
                                                            </td>
                                                            <td>{formatdt}</td>
                                                            <td>
                                                                <a href="javascript: void(0);" onClick={() => GetBlogById(bimg._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></a>
                                                                <a href="javascript: void(0);" onClick={() => removeBlog(bimg._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modal} size="lg" toggle={toggle} >
                <ModalHeader toggle={toggle}> Update Blog</ModalHeader>
                <ModalBody>
                    <div className="upadteform">
                        {
                            updatedblog && (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <Row>
                                        <Col xl={6} lg={6} sm={6} className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="blog_heading" className="form-label">
                                                    Blog Heading
                                                </label>
                                                <input type="text" className="form-control" name="blog_heading" value={updatedblog.blog_heading} onChange={updateonchange} id="blog_heading" placeholder='Blog Heading' />
                                            </div>
                                        </Col>
                                        <Col xl={6} lg={6} sm={6} className='col-6'>
                                            <div className="mb-3">
                                                <label htmlFor="author" className="form-label">
                                                    Author
                                                </label>
                                                <input type="text" className="form-control" name="author" value={updatedblog.author} onChange={updateonchange} id="author" placeholder='Author' required />

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={8} lg={8} sm={8} className='col-8'>
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
                                        <Col xl={4} lg={4} sm={4} className='col-4'>
                                            <div className="already_uplaoedimg text-end pt-4">
                                                <img src={updatedblog.blogimg} className='galleryimgbox' alt="blogimg" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xl={12}>
                                            <label htmlFor="des">Blog Description*</label>
                                            <CKEditorCompo data={blog_des} onChange={handleEditorChange} />
                                        </Col>
                                    </Row>
                                    {/* <div className="mb-3">
                                        <label htmlFor="blog_des" className="form-label">
                                            Blog Description
                                        </label>
                                        <textarea name="blog_des" id="blog_des" cols="10" placeholder='Write Blog Description Here' className="form-control" value={updatedblog.blog_des} onChange={updateonchange} rows="5"></textarea>
                                    </div> */}
                                  
                                    <div className="mb-3 text-center mt-4">
                                        <button type="submit" className="btn btn-primary" onClick={() => handleUpdate(updatedblog._id)}>
                                            Update <i className='bx bx-edit-alt'></i>
                                        </button>
                                    </div>
                                </form>
                            )
                        }

                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default BlogTable
