import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, CardBody } from 'reactstrap'

const OptionCard = (props) => {
    return (
        <>
            <Col xl={3} lg={3} md={4} sm={6} className='col-12'>
                <Card className="mini-stats-wid">
                    <CardBody className='bgcolorone'>
                        <Link to={props.linkhere}>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="fw-medium fs-5">
                                        {props.title}
                                    </p>
                                    <h4 className="text-dark  mt-2 mb-0">10</h4>
                                </div>
                                <div className="avatar-sm rounded-circle  align-self-center mini-stat-icon">
                                    <span className="avatar-title rounded-circle ">
                                        <i
                                            className={
                                                "bx " + props.iconClass + " font-size-24"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default OptionCard
