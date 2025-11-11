import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "../../index.css"
import Navbar from "../../components/common/Navbar/Navbar";
import Footer from "../../components/common/Footer/Footer";
const Dashboard = () => {
    return (
        <>
        {/* <div className="flex flex-col md:flex-row">
            <div className=" ">
            <Sidebar></Sidebar>
            </div>
            <div className="flex-1 py-8">
                <Outlet></Outlet>
            </div>   
        </div>
        <Footer></Footer>
        <ToastContainer></ToastContainer> */}
         <div className='bg-base-200'>
            <div className="max-w-7xl mx-auto min-h-screen bg-base-200">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer />
            </div>
        </>
    );
};

export default Dashboard;