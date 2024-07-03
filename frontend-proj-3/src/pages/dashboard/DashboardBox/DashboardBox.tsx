// import React from 'react'
// import { FaUserCircle } from 'react-icons/fa'

const DashboardBox = (props: any) => {
    return (
        <div className="dashboardBox" style={{
            backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}>
            <div className="d-flex w-100 ">
                <div className="col1">
                    <h4 className="text-white mb-0">{props.name ? props.name : ''}</h4>
                    <span className="text-white">277</span>
                </div>
                <div className="ms-auto pe-20">
                    <span className="icon ">
                        {props.icon ? props.icon : ''}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default DashboardBox