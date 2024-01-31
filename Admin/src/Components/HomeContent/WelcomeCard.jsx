import React from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

const WelcomeCard = () => {
    return (
        <>
            <Col xl={4}>
                <Card className="overflow-hidden">
                    <div className="bg-primary bg-soft">
                        <Row>
                            <Col xs="7">
                                <div className="text-primary p-3">
                                    <h5 className="text-light mt-3">Welcome Back !</h5>
                                    <p className='text-light'></p>
                                </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                                <img src="assets/images/profile-img.png" alt="" className="img-fluid" />
                            </Col>
                        </Row>
                    </div>
                    <CardBody className="pt-0">
                        <Row>
                            <Col sm="4">
                                <div className="avatar-md profile-user-wid mb-4">
                                    <img
                                        src="https://www.svgrepo.com/show/335455/profile-default.svg"
                                        alt=""
                                        className="img-thumbnail rounded-circle"
                                    />
                                </div>
                                <h5 className="font-size-15 text-truncate">Admin</h5>
                                {/* <p className="text-muted mb-0 text-truncate">UI/UX Designer</p> */}
                            </Col>
                            <Col sm="8">
                                <div className="text-center pt-4 mt-3">
                                    <h5>OSASMCIC <br />Dashboard</h5>
                                </div>

                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default WelcomeCard
