import React, { useState, useEffect } from 'react'
import { Card, Row, Col, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BlogTable = () => {

  const [modal, setModal] = useState(false);
  const [newsdetail, setNewsdetail] = useState([]);
  const [updatedNews, setUpdatedNews] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchinput, setSearchinput] = useState();
  const toggle = () => setModal(!modal);
  useEffect(() => {
    fetchnews();
  }, []);
  const token = localStorage.getItem('authToken');
  const fetchnews = async () => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${base_url}/news/getnews`);
      const results = await response.json();
      setNewsdetail(results);
      // console.log(results, 'results')
    } catch (error) {
      console.error(error);
    }
  };
  const dlnews = async (newsid) => {

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
        const newresponse = await fetch(`${api_Url}/news/dlnews/${newsid}`, {
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
          setNewsdetail((pre) => pre.filter(newsdetail => newsdetail._id !== newsid));
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
  const getNewsById = async (id) => {
    toggle();
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_url}/news/getnewsdetails/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUpdatedNews(data);
      } else {
        console.error(`fetch data error`);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setUpdatedNews((prdata) => ({ ...prdata, [name]: value }));
  };
  const handleupdate = async (nid) => {
    try {
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/news/updatenews/${nid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNews),
      });
      if (response.ok) {
        Swal.fire({
          title: "success!",
          text: "News Update Successfully!",
          icon: "success"
        });
        const updatedDoc = await response.json();
        setModal(false);
        setNewsdetail((prevnews) => prevnews.map((user) => user._id === updatedDoc._id ? { ...user, ...updatedDoc } : user));
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const handlesearch = async (e) => {
    const searchinputs = e.target.value;
    setSearchinput(searchinputs);
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${apiUrl}/news/search/api?q=${searchinput}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error)
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
                  <h5>  News And Events</h5>
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
                <table className="table align-middle table-nowrap mb-0 usersTables">
                  <thead className="table-light">
                    <tr>
                      <th className="align-middle">S.N</th>
                      <th className="align-middle">News Headline</th>
                      <th className="align-middle">Description</th>
                      <th className="align-middle">Date</th>
                      <th className="align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {searchinput ?
                      (
                        searchResults == '' ? (
                          <tr>
                            <td colspan="10" className="react-bs-table-no-data">No data to display.</td>
                          </tr>
                        ) : (
                          <ShowResults results={searchResults} dlnews={dlnews} updatenews={updateNews} />
                        )
                      ) : (
                        <ShowResults results={newsdetail} dlnews={dlnews} updateNews={updateNews} />
                      )
                    } */}


                    {searchinput ?
                      (
                        searchResults == '' ? (
                          <>
                            <tr>
                              <td colspan="10" className="react-bs-table-no-data">No data to display.</td>

                            </tr>
                          </>

                        ) : (
                          searchResults?.map((ndata, index) => {
                            const srno = index + 1;
                            const ndate = moment(ndata.createdAt);
                            const formatteddt = ndate.format('DD-MM-YYYY');
                            const dateParts = formatteddt.split('-');
                            const month = parseInt(dateParts[1], 10) - 1; // Months in JavaScript are 0-indexed
                            const day = parseInt(dateParts[0], 10);
                            const year = parseInt(dateParts[2], 10);
                            const myDate = new Date(year, month, day);
                            const formattedDateString = myDate.toLocaleString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            });
                            return (
                              <tr>
                                <td>{srno}</td>
                                <td>
                                  {ndata.heading}
                                </td>
                                <td>{ndata.description}</td>
                                <td>{formattedDateString}</td>
                                <td>
                                  <Link to={''} onClick={() => getNewsById(ndata._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></Link>
                                  <Link to={''} onClick={() => dlnews(ndata._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                </td>
                              </tr>
                            )
                          }
                          )
                        )
                      ) : (
                        newsdetail?.map((ndata, index) => {
                          const srno = index + 1;
                          const ndate = moment(ndata.createdAt);
                          const formatteddt = ndate.format('DD-MM-YYYY');
                          const dateParts = formatteddt.split('-');
                          const month = parseInt(dateParts[1], 10) - 1; // Months in JavaScript are 0-indexed
                          const day = parseInt(dateParts[0], 10);
                          const year = parseInt(dateParts[2], 10);
                          const myDate = new Date(year, month, day);
                          const formattedDate = myDate.toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          });
                          return (
                            <tr>
                              <td>{srno}</td>
                              <td>
                                {ndata.heading}
                              </td>
                              <td>{ndata.description}</td>
                              <td>{formattedDate}</td>
                              <td>
                                <Link to={''} onClick={() => getNewsById(ndata._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></Link>
                                <Link to={''} onClick={() => dlnews(ndata._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
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
      <Modal isOpen={modal} size="md" toggle={toggle} >
        <ModalHeader toggle={toggle}> Update News </ModalHeader>
        <ModalBody>
          <div className="upadteform">
            {
              updatedNews && (
                <>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Row>
                      <Col xl={12} lg={12} sm={12} className='col-12'>
                        <div className="mb-3">
                          <label htmlFor="heading" className="form-label">
                            News Headline
                          </label>
                          <input type="text" className="form-control" name="heading" value={updatedNews.heading} onChange={handleonchange} id="heading" placeholder='News Heading' />
                        </div>
                      </Col>
                      <Col xl={12} lg={12} sm={12} className='col-12'>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">
                            description
                          </label>
                          <textarea className="form-control" cols="10" name="description" value={updatedNews.description} onChange={handleonchange} id="description" placeholder='Write News Description Here' rows="5"></textarea>
                        </div>
                      </Col>
                    </Row>
                    <div className="mb-3 text-center mt-3">
                      <button type="submit" className="btn btn-primary" onClick={() => handleupdate(updatedNews._id)}>
                        Update <i className='bx bx-edit-alt'></i>
                      </button>
                    </div>
                  </form>
                </>
              )
            }

          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default BlogTable

