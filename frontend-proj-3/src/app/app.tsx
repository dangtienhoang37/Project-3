
// import Sidebar from "./components/Sidebar/Sidebar";

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/dashboard';
import UserPage from '../pages/user';
import AreaPage from '../pages/area';
import HistoryPage from '../pages/history';
import ParkingPage from '../pages/parking';
import StaffPage from '../pages/staff';


import './app.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter >
            <Header />
            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>
                <div id="content">
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/user' element={<UserPage />} />
                        <Route path='/area' element={<AreaPage />} />
                        <Route path='/parking' element={<ParkingPage />} />
                        <Route path='/staff' element={<StaffPage />} />
                        <Route path='/history' element={<HistoryPage />} />




                    </Routes>
                </div>

            </div>

        </BrowserRouter>
    )
}
export default App;