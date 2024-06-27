
import { Link } from 'react-router-dom'
import logo from '../../assets/imgs/logo.webp'
import { MdOutlineMenuOpen } from "react-icons/md";
import Button from '@mui/material/Button';
import SearchBox from '../Searchbox';
import { MdOutlineLightMode } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { FaBell } from "react-icons/fa6";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
import { FaUser } from "react-icons/fa";
import './index.css'




const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openMyAccDrop = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <header className="d-flex align-items-center">
                <div className='container-fluid w-100'>
                    <div className="row d-flex align-items-center w-100">
                        {/*logo wrapper */}
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className='d-flex align-items-center logo'>
                                <img src={logo} />
                                <span className='ml-2'>PARKING SYSTEM</span>
                            </Link>
                        </div>

                        <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                            <Button className='rounded-circle mr-3'>
                                <MdOutlineMenuOpen />
                            </Button>
                            <SearchBox />
                        </div>

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ">
                            <Button className='rounded-circle mr-3 icon-header'>
                                <MdOutlineLightMode />
                            </Button>
                            <Button className='rounded-circle mr-3 icon-header'>
                                <MdMail />
                            </Button>

                            <Button className='rounded-circle mr-3 icon-header'>
                                <FaBell />
                            </Button>
                            <Button className='rounded-circle mr-3 icon-header'>
                                <MdOutlineMenuOpen />
                            </Button>


                            <div className="myAccWrapper">
                                <Button className='myAcc d-flex align-items-center' onClick={openMyAccDrop} >
                                    <div className='userImg'>
                                        <span className='rounded-circle'>
                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="" />
                                        </span>
                                    </div>
                                    <div className="userInfor">
                                        <h4>Hoang hoi ne</h4>
                                        <p className='mb-0'>@hoang</p>
                                    </div>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleCloseMyAcc}
                                    onClick={handleCloseMyAcc}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleCloseMyAcc}>
                                        <ListItemIcon>
                                            <FaUser />
                                        </ListItemIcon>
                                        My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleCloseMyAcc}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Add another account
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAcc}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseMyAcc}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>


            </header>
        </>
    )
}

export default Header