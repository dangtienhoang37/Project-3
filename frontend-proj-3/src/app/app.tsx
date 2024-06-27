
// import Sidebar from "./components/Sidebar/Sidebar";

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/dashboard';

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

                    </Routes>
                </div>

            </div>

        </BrowserRouter>
    )
}
export default App;