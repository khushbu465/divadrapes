import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Modal, ModalBody, ModalHeader, Col, Row } from 'reactstrap'
import Swal from 'sweetalert2'

const SliderTable = ({ Alldata }) => {
    const [modal, setModal] = useState(false);
    const [getByIdData, setsetgetByIdData] = useState([]);
    const [upimage, setUpimage] = useState();

    const toggle = () => setModal(!modal);

    const token = localStorage.getItem('authToken');
    const Url = process.env.REACT_APP_BASE_URL;
    const update_imgae = async (id) => {
        toggle();
        try {
            const response = await fetch(`${Url}/sliders/getBy_id/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const result = await response.json();
                setsetgetByIdData(result);
            } else {
                console.log('server error')
            }
        } catch (err) { console.log(err) }
    }
    const handle_update = async (id) => {
        try {
            const formData = new FormData();
            formData.append('slider_img', upimage);
            const response_two = await fetch(`${Url}/sliders/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (response_two.status === 200) {
                Swal.fire({
                    title: "success!",
                    text: " Image Update Successfully!",
                    icon: "success"
                });
                setModal(false);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: " Something went wrong!",
                    icon: "error"
                });
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="table-responsive scrollableTable">
                <Table className="table align-middle table-nowrap  w-100 mb-0 table-bordered table-hover  usersTables">
                    <thead className="table-light">
                        <tr>
                            <th>S.N</th>
                            <th className="align-middle">Image</th>
                            <th className="align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alldata && Alldata.length > 0 ? (
                            Alldata.map((data, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="img_box">
                                            <img src={`${Url}/uploads/${data.imgUrl}`} onClick={() => update_imgae(data._id)} className="cursor-pointer" alt="" />
                                        </div>
                                    </td>
                                    <td><Link to={''} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                                    </td>
                                </tr>
                            )
                        ) : (
                            ''
                        )
                        }
                    </tbody>
                </Table>
            </div>

            {/* ------img modal------- */}
            <Modal isOpen={modal} size="md" toggle={toggle} >
                <ModalHeader toggle={toggle}> Image</ModalHeader>
                <ModalBody>
                    <div className="upadteform">
                        {getByIdData ? (
                            <>
                                <div className="images_here_style">
                                    <img src={`${Url}/uploads/${getByIdData.imgUrl}`} alt="" />
                                </div>
                                <div className="input_fild_here">
                                    <Row>
                                        <Col md={2}></Col>
                                        <Col md={8}>
                                            <form>
                                                <div className="mb-3 mt-4">
                                                    <input type="file" className='form-control' name='update_img' onChange={(e) => setUpimage(e.target.files[0])} />
                                                </div>
                                                <div className="btn_here text-center mt-3">
                                                    <button className='btn btn-primary' onClick={() => handle_update(getByIdData._id)} > Update <i className='fa fa-edit'></i></button>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        ) : ' '}

                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default SliderTable
