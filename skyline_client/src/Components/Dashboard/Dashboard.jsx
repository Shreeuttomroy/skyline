
import Sidebar from "./Sidebar/Sidebar";
import logo from "../SharedComponents/log.png"
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../CustomHook/AxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    const [userdata, setData] = useState(null)
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiosSecure.get(`/user?email=${user.email}`)
            .then(e => setData(e.data))
            .catch(e => console.log(e.message))
    }, [user])
    return (
        <>
            <Toaster
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 2000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}></Toaster>
            <div>
                {
                    !userdata ?
                        <p className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></p> :
                        <div>
                            <div className="navbar bg-base-200">
                                <div className="navbar-start">
                                    <Link to={"/"} className=" m-3 text-xl"><img className=" w-20 h-12" src={logo} alt="" /></Link>
                                </div>
                                <div className=" navbar-end drawer">
                                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                    <div className="drawer-content">
                                        {/* Page content here */}
                                        <label htmlFor="my-drawer" className="btn drawer-button"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                                    </div>
                                    <div className=" z-20 drawer-side md:hidden">
                                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                        {/* <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content"> */}
                                        {/* Sidebar content here */}
                                        {/* <li><a>Sidebar Item 1</a></li>
                                            <li><a>Sidebar Item 2</a></li>

                                        </ul> */}
                                        <Sidebar userdata={userdata}></Sidebar>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex">
                                <div className=" w-fit hidden md:flex">
                                    <Sidebar userdata={userdata}></Sidebar>
                                </div>
                                <div className=" w-full">
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    );
}

export default Dashboard;