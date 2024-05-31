import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

const BrandTable = ({ Alldata }) => {
    const token = localStorage.getItem('authToken');
    const Url = process.env.REACT_APP_BASE_URL;
    return (
        <>
            <div className="table-responsive scrollableTable">
                <Table className="table align-middle table-nowrap  w-100 mb-0 table-bordered table-hover  usersTables">
                    <thead className="table-light">
                        <tr>
                            <th>S.N</th>
                            <th className="align-middle">Brand Name</th>
                            <th className="align-middle">Image</th>
                            <th className="align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Alldata && Alldata.length > 0 ? (
                            Alldata?.map((data, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <div className="img_box">
                                            <img src={`${Url}/uploads/${data.imgUrl}`} className="cursor-pointer" alt="" />
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
        </>
    )
}

export default BrandTable
