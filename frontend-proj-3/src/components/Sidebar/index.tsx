// import React from 'react'
import Button from '@mui/material/Button';
import { FaAngleRight } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const isOpen = (num: number) => {
        setActiveTab(num);
    }
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        {/* dashboard */}
                        <Link to='/dashboard'>
                            <Button className={`w-100 btn ${activeTab === 1 ? 'active' : ''}`} onClick={() => { isOpen(1) }}>
                                <span className='icon'><RiDashboardHorizontalFill /></span>
                                Dashboard
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                        {/* user */}
                        <Link to='/user'>
                            <Button className={`w-100 btn ${activeTab === 2 ? 'active' : ''}`} onClick={() => { isOpen(2) }}>
                                <span className='icon'><PeopleIcon /></span>
                                Users
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                        {/* nhan vien */}
                        <Link to='/staff'>
                            <Button className={`w-100 btn ${activeTab === 5 ? 'active' : ''}`} onClick={() => { isOpen(5) }}>
                                <span className='icon'><AdminPanelSettingsIcon /></span>
                                Staff
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                        {/* history */}
                        <Link to='/history'>
                            <Button className={`w-100 btn ${activeTab === 3 ? 'active' : ''}`} onClick={() => { isOpen(3) }}>
                                <span className='icon'><RestorePageIcon /></span>
                                History
                                <span className='arrow'><FaAngleRight /></span>
                                {/* tao sub history: all va cu the */}
                            </Button>
                        </Link>
                        {/* list parking */}
                        <Link to='/parking'>
                            <Button className={`w-100 btn ${activeTab === 4 ? 'active' : ''}`} onClick={() => { isOpen(4) }}>
                                <span className='icon'><LocalParkingIcon /></span>
                                Parkings
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                        <Link to='/area'>
                            <Button className={`w-100 btn ${activeTab === 6 ? 'active' : ''}`} onClick={() => { isOpen(6) }}>
                                <span className='icon'><LayersIcon /></span>
                                Areas
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>

                    </li>

                </ul>
            </div>
        </>
    )
}

export default Sidebar