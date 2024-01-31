import React, { useEffect, useState } from "react";
import { Card, Row, Col, CardBody, CardTitle, Table } from "reactstrap";
import moment from 'moment';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const DataTables = () => {
    const [userdata, setUserdata] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchinput, setSearchinput] = useState();

    useEffect(() => {
        getUsers();
    }, []);
    const token = localStorage.getItem('authToken');

    const getUsers = async () => {
        try {
            const apiUrl = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${apiUrl}/registrations/getusers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            // console.log(result,'result')
            setUserdata(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const deleteUser = async (userid) => {
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
                const response = await fetch(`${api_Url}/registrations/deleteUser/${userid}`, {
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
                    setUserdata((prevUsers) => prevUsers.filter(userdata => userdata._id !== userid));
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
    };
    const handlesearch = async (e) => {
        const searchvalue = e.target.value;
        setSearchinput(searchvalue);
        try {
            const api_Url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${api_Url}/registrations/api/search?q=${searchinput}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setSearchResults(data);
            console.log(searchResults);
        } catch (error) {
            console.error(error);
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
                                    <h5>  All Users</h5>
                                    <p className="fw-normal">View all registered users here</p>
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
                            <div className="table-responsive scrollableTable">
                                <Table className="table align-middle table-nowrap  w-100 mb-0 table-bordered table-hover  usersTables">
                                    <thead className="table-light">
                                        <tr>
                                            <th>S.N</th>
                                            <th className="align-middle">Name</th>
                                            <th className="align-middle">DOB</th>
                                            <th className="align-middle">Marital Status</th>
                                            <th className="align-middle">Married Name</th>
                                            <th className="align-middle">Profession</th>
                                            <th className="align-middle">Organization</th>
                                            <th className="align-middle">Designation</th>
                                            <th className="align-middle">Mobile No</th>
                                            <th className="align-middle">WhatsApp No</th>
                                            <th className="align-middle">Email ID</th>
                                            <th className="align-middle">Current Country</th>
                                            <th className="align-middle">City</th>
                                            <th className="align-middle">Batch</th>
                                            <th className="align-middle">Year Of Leaving School</th>
                                            <th className="align-middle">Last Class </th>
                                            <th className="align-middle">Gender</th>
                                            <th className="align-middle">Graduation(Year,College) </th>
                                            <th className="align-middle">Post Graduation(Year,College) </th>
                                            <th className="align-middle">TTC/DLEd(Year,College) </th>
                                            <th className="align-middle">B.Ed(Year,College) </th>
                                            <th className="align-middle">Image</th>
                                            <th className="align-middle">Document Image</th>
                                            <th className="align-middle">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchinput ?
                                            (
                                                searchResults == '' ? (
                                                    <>
                                                        <tr>
                                                            <td colspan="15" className="react-bs-table-no-data">No data to display.</td>
                                                        </tr>
                                                    </>

                                                ) : (
                                                    searchResults?.map((users, index) => {
                                                        const serialNumber = index + 1;
                                                        const dob = moment(users.dob);
                                                        const formattedDob = dob.format('DD-MM-YYYY');
                                                        return (
                                                            <tr key={index}>
                                                                <td>{serialNumber}</td>
                                                                <td>{users.first_name}&nbsp;{users.middle_name}&nbsp;{users.last_name}</td>
                                                                <td>{formattedDob}</td>
                                                                <td>{users.marital_status}</td>
                                                                <td>{users.married_name}</td>
                                                                <td>{users.profession}</td>
                                                                <td>{users.organization}</td>
                                                                <td>{users.designation}</td>
                                                                <td>{users.mobile_number}</td>
                                                                <td>{users.whatsapp_number}</td>
                                                                <td>{users.email}</td>
                                                                <td>{users.country}</td>
                                                                <td>{users.city}</td>
                                                                <td>{users.batch}</td>
                                                                <td>{users.yol}</td>
                                                                <td>{users.last_class}</td>
                                                                <td>{users.gender}</td>
                                                                {
                                                                    users.graduation ? (
                                                                        <td>{users.graduation.graduation_year},&nbsp;{users.graduation.college}</td>
                                                                    ) : (
                                                                        <td>No Data </td>
                                                                    )
                                                                }
                                                                {
                                                                    users.post_graduation ? (
                                                                        <td>{users.post_graduation.graduation_year},&nbsp;{users.post_graduation.college}</td>
                                                                    ) : (
                                                                        <td>No Data </td>
                                                                    )
                                                                }
                                                                {
                                                                    users.ttc_dled ? (
                                                                        <td>{users.ttc_dled.year},&nbsp;{users.ttc_dled.college}</td>
                                                                    ) : (
                                                                        <td>No Data </td>
                                                                    )
                                                                }
                                                                {
                                                                    users.bEd ? (
                                                                        <td>{users.bEd.year},&nbsp;{users.bEd.college}</td>
                                                                    ) : (
                                                                        <td>No Data </td>
                                                                    )
                                                                }
                                                                <td><div className="userimg">
                                                                    <img src={users.passport_size_photo_url} className='galleryimgbox' alt="" />
                                                                </div></td>
                                                                <td><div className="userimg">
                                                                    <img src={users.doc_url} className='galleryimgbox' alt="" />
                                                                </div></td>
                                                                <td>
                                                                    <Link to={''} onClick={() => deleteUser(users._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            ) : (
                                                userdata.map((users, index) => {
                                                    const serialNumber = index + 1;
                                                    const dob = moment(users.dob);
                                                    const formattedDob = dob.format('DD-MM-YYYY');
                                                    return (
                                                        <tr key={index}>
                                                            <td>{serialNumber}</td>
                                                            <td>{users.first_name}&nbsp;{users.middle_name}&nbsp;{users.last_name}</td>
                                                            <td>{formattedDob}</td>
                                                            <td>{users.marital_status}</td>
                                                            <td>{users.married_name}</td>
                                                            <td>{users.profession}</td>
                                                            <td>{users.organization}</td>
                                                            <td>{users.designation}</td>
                                                            <td>{users.mobile_number}</td>
                                                            <td>{users.whatsapp_number}</td>
                                                            <td>{users.email}</td>
                                                            <td>{users.country}</td>
                                                            <td>{users.city}</td>
                                                            <td>{users.batch}</td>
                                                            <td>{users.yol}</td>
                                                            <td>{users.last_class}</td>
                                                            <td>{users.gender}</td>
                                                            {
                                                                users.graduation ? (
                                                                    <td>{users.graduation.graduation_year},&nbsp;{users.graduation.college}</td>
                                                                ) : (
                                                                    <td>No Data </td>
                                                                )
                                                            }
                                                            {
                                                                users.post_graduation ? (
                                                                    <td>{users.post_graduation.graduation_year},&nbsp;{users.post_graduation.college}</td>
                                                                ) : (
                                                                    <td>No Data </td>
                                                                )
                                                            }
                                                            {
                                                                users.ttc_dled ? (
                                                                    <td>{users.ttc_dled.year},&nbsp;{users.ttc_dled.college}</td>
                                                                ) : (
                                                                    <td>No Data </td>
                                                                )
                                                            }
                                                            {
                                                                users.bEd ? (
                                                                    <td>{users.bEd.year},&nbsp;{users.bEd.college}</td>
                                                                ) : (
                                                                    <td>No Data </td>
                                                                )
                                                            }
                                                            <td><div className="userimg">
                                                                <img src={users.passport_size_photo_url} className='galleryimgbox' alt="" />
                                                            </div></td>
                                                            <td><div className="userimg">
                                                                <img src={users.doc_url} className='galleryimgbox' alt="" />
                                                            </div></td>
                                                            <td>
                                                                <Link to={''} onClick={() => deleteUser(users._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
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
        </>
    )
}

export default DataTables
