import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

const ShowResults = (props, dlnews, updateNews) => {
    return (
        <>
            {
                props.results.map((ndata, index) => {
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
                            <td> {ndata.heading} </td>
                            <td>{ndata.description}</td>
                            <td>{formattedDateString}</td>
                            <td>
                                <Link to={''} onClick={() => updateNews(ndata._id)} class="text-success p-1"><i class="bx bxs-edit-alt"></i></Link>
                                <Link to={''} onClick={() => dlnews(ndata._id)} class="text-danger p-1"><i class="bx bxs-trash"></i></Link>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default ShowResults
