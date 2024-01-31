import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, CardBody, Card, Container } from "reactstrap"
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const handleonchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handlelogin = async (e, v) => {
    e.preventDefault();
    const payload = {
      username: formData.username,
      password: formData.password
    }
    // console.log(payload)
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`http://localhost:5500/adminuser/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const results = await response.json();
      if (results.status === 1) {
        const token = results.data.token;
        localStorage.setItem('authToken', token);
        navigate('/Dashboard');
      } else {
        Swal.fire({
          title: 'Invalid credentials!',
          text: results.message,
          icon: 'error',
        });
      }
    } catch (error) {
      console.log(error, 'error')
    }
  };
  return (
    <>
      <div className="account-pages ">
        <div className="background_layer pt-sm-5 ">
          <Container className="pt-5">
            <Row className=" justify-content-left">
              <Col md={8} lg={6} xl={5} >
                <Card className=" overflow-hidden  loginCard">
                  <div className="bg-transparent">
                    <Row>

                      <Col md={8} sm={8} className='text-left col-8'>
                        <div className="text-light text-left  p-4">
                          <h5 className=" h1 mt-3" style={{ color: "#e32c53" }}>Login</h5>
                        </div>
                      </Col>
                      <Col md={4} sm={4} className="col-4 align-self-center ">
                        <img
                          src="assets/images/logo.png"
                          alt=""
                          className="Login_logo"
                        />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-4">
                    <div className="p-2">
                      <form onSubmit={handlelogin} className="form-horizontal login_Pageform" >
                        <Row className=" gy-3">
                          <Col xl={12}>
                            <div className="mb-3">
                              <label htmlFor='username'>Username <span className='text-danger'> *</span></label>
                              <input
                                name="username"
                                type="text" onChange={handleonchange}
                                className="form-control form-control-lg"
                                placeholder="Enter username" required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor='password'>Password <span className='text-danger'> *</span></label>
                              <input
                                name="password"
                                type="password" onChange={handleonchange}
                                className="form-control form-control-lg"
                                placeholder="Enter Password"
                                required
                              />
                            </div>
                          </Col>
                          <Col xl={12} className='mt-0 mb-4'>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked />
                              <label className="form-check-label" htmlFor="flexCheckChecked">
                                Remember me
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-4 gy-3">
                          <div className="col-xl-12 d-grid mt-2">
                            <button className="btn  waves-effect waves-light" type="submit" >
                              Log In  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                            </button>
                          </div>
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

export default Login
