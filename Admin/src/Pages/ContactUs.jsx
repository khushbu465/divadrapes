import React, { useState, useEffect } from 'react'
import { Container, Row, Card, Col, CardBody, Table } from 'reactstrap'
import Breadcrumb from "../Common/Breadcrumb"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

const ContactUs = () => {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchinput, setSearchinput] = useState();

    useEffect(() => {
        fetchItems();
    }, []);
    const token = localStorage.getItem('authToken');

    const fetchItems = async () => {
        try {
            const base_url = process.env.REACT_APP_BASE_URL;
            // console.log(base_url,'base_url')
            const response = await fetch(`${base_url}/contacts/getuser`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const results = await response.json();
            setData(results);
            // console.log(results)
        } catch (error) {
            console.error(error);
        }
    };

    const dlcontacts = async (userid) => {
        console.log(userid)
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
                const response = await fetch(`${api_Url}/contacts/dlContact/${userid}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const newdata = await response.json();
                if (response.ok) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: newdata.message,
                        icon: 'success',
                    });
                    setData((prevUsers) => prevUsers.filter(data => data._id !== userid));
                    console.log('user Delete Successfully');
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error deleting user',
                        icon: 'error',
                    });
                    console.log('something went wrong');
                }
            } catch (error) {
                console.error('delete user error', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Error deleting user',
                    icon: 'error',
                });
            }
        }
    }
    const handlesearch = async (e) => {
        const searchvalue = e.target.value;
        setSearchinput(searchvalue);
        try {
            const api_Url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${api_Url}/contacts/search/api?q=${searchinput}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setSearchResults(data);
            console.log(data, 'response')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className="main-content">
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumb title="Dashboard" breadcrumbItem="Contact Us" />
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md={8}>
                                                <h5> All Contacts</h5>
                                            </Col>
                                            <Col md={4} className="text-end">
                                                <div className="searching_optipn text-end">
                                                    <Row>
                                                        <Col md={4} className="mt-1">
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
                                        <div className="table-responsive scrollableTable mt-3">
                                            <Table className="table align-middle table-bordered table-hover table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>S.N</th>
                                                        <th className="align-middle">Name</th>
                                                        <th className="align-middle">Mobile No</th>
                                                        <th className="align-middle">Email ID</th>
                                                        <th className="align-middle">Subject</th>
                                                        <th className="align-middle">Type</th>
                                                        <th className="align-middle">Message</th>
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
                                                                searchResults.map((userdata, idx) => {
                                                                    const serNum = idx + 1;
                                                                    return (
                                                                        <tr>
                                                                            <td>{serNum}</td>
                                                                            <td>{userdata.name}</td>
                                                                            <td>{userdata.mobile_number}</td>
                                                                            <td>{userdata.email}</td>
                                                                            <td>{userdata.Subject}</td>
                                                                            <td>{userdata.type}</td>
                                                                            <td>{userdata.msg}</td>
                                                                            <td>
                                                                                <Link to={''} onClick={() => dlcontacts(userdata._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>

                                                                            </td>
                                                                        </tr>
                                                                    )

                                                                })
                                                            )
                                                        ) : (
                                                            data.map((userdata, idx) => {
                                                                const serNum = idx + 1;
                                                                return (
                                                                    <tr>
                                                                        <td>{serNum}</td>
                                                                        <td>{userdata.name}</td>
                                                                        <td>{userdata.mobile_number}</td>
                                                                        <td>{userdata.email}</td>
                                                                        <td>{userdata.Subject}</td>
                                                                        <td>{userdata.type}</td>
                                                                        <td>{userdata.msg}</td>
                                                                        <td>
                                                                            <Link to={''} onClick={() => dlcontacts(userdata._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
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

        </>
    )
}

export default ContactUs
