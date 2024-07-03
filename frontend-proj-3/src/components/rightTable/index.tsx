// define table template
import { FormControl, Select, Button } from "@mui/material"

import React from "react"
import MenuItem from '@mui/material/MenuItem';
import { FaEye } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

import './index.css'



const rightTable: React.FC = () => {
    const [showBy, setShowBy] = React.useState('');
    const [catagoryBy, setcatagoryBy] = React.useState('');
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 p-3 ">
                    <h4 className="hd">Area </h4>
                    {/* <div className="row cardFilter mt-3">
                        <div className="col-md-3 mb-3">
                            <h4>SHOW BY</h4>
                            <FormControl size="small" className='w-100'>
                                <Select
                                    value={showBy}
                                    onChange={(e) => setShowBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                        <div className="col-md-3">
                            <h4>CATAGORY BY</h4>
                            <FormControl size="small" className='w-100'>
                                <Select
                                    value={catagoryBy}
                                    onChange={(e) => setcatagoryBy(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className='w-100'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                    </div> */}
                    <div className="table-responsive">
                        <table className='table table-bordered v-align'>
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">UID</th>
                                    <th scope="col" style={{ width: '250px' }}>Name</th>
                                    <th scope="col">Area</th>
                                    <th scope="col">Capacity</th>
                                    <th scope="col">Still empty</th>
                                    <th scope="col">Price per hour</th>
                                    <th scope="col" className=''>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <div className="d-flex InforBox">
                                            <div className="infor">
                                                <h6>bai do xe 0111111111111111111111111111111111111111111111111111111111111111</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Hai ba trung</td>
                                    <td>25</td>
                                    <td>5</td>
                                    <td>6000vnd</td>
                                    <td>
                                        <div className="actions d-flex align-items-center w-100">
                                            <Button color='secondary'><FaEye /></Button>
                                            <Button color='success'><FaPencil /></Button>
                                            <Button color='error'><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default rightTable