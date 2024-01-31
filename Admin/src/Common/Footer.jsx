import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <Container fluid={true}>
                    <Row>
                        <Col sm={6}>© OSASMCICLKO</Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Powered by - <Link to="https://onebigbit.com/" target='_blank'>OneBigBit Technologies Private Limited </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer
