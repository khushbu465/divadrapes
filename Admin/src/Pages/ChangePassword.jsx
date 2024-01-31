import React, { useRef, useState } from 'react'
import { Container, Row, Card, Col, CardBody, Button } from 'reactstrap'
import Breadcrumb from "../Common/Breadcrumb"
import Swal from 'sweetalert2';

const ChangePassword = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        oldpwd: "",
        newpwd: "",
    })
    const handleonchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: 'admin',
            oldpwd: formData.oldpwd,
            newpwd: formData.newpwd,
        }
        try {
            const token = localStorage.getItem('authToken');
            const api_url = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${api_url}/adminusers/changepassword`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.status === 1) {
                Swal.fire({
                    title: result.message,
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Invalid old password!',
                    text: result.message,
                    icon: 'error',
                });
            }
            formRef.current.reset()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumb title="Dashboard" breadcrumbItem="Change Password" />
                        <Row className='mt-4'>
                            <Col lg={2}></Col>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <div className="add_content_form py-4 px-2">
                                            <form onSubmit={handlesubmit} ref={formRef}>
                                                <Row>
                                                    <Col xl={6}>
                                                        <label htmlFor="oldpwd">Old Password <span className='text-danger'>*</span></label>
                                                        <input
                                                            name="oldpwd"
                                                            type="text"
                                                            onChange={handleonchange}
                                                            placeholder="Enter Old Password"
                                                            className="form-control form-control-lg"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xl={6}>
                                                        <label htmlFor="newpwd">New Password <span className='text-danger'>*</span></label>
                                                        <input
                                                            name="newpwd"
                                                            type="text"
                                                            onChange={handleonchange}
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter New Password" required
                                                        />
                                                    </Col>
                                                    <Col md={12} className='text-center mt-4'>
                                                        <Button color="primary" type='submit' >
                                                            Change
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </form>
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

export default ChangePassword
