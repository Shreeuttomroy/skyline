import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./log.png";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from 'react-hot-toast';

function Navbar() {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    const navLink =
        <>
            <li><NavLink to={''}>Home</NavLink></li>
            <li><NavLink to={'/allproperties'}>All Properties</NavLink></li>
            {
                !user ?
                    <>
                        <li><NavLink to={'/login'}>Login Now</NavLink></li>
                        <li><NavLink to={'/signup'}>Register Now</NavLink></li>
                    </> :
                    <li className=" flex lg:hidden"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>

            }
        </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
                toast.success("LogOut successful!")
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className="navbar bg-base-200">
                <div className="navbar-start">
                    <a className=" m-3 text-xl"><img className=" w-20 h-12" src={logo} alt="" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLink}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[11] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLink}
                        </ul>
                    </div>
                    {
                        user ?
                            <>
                            <li className=" hidden lg:flex btn bg-info mx-3"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                                <div className="dropdown">
                                    <label tabIndex={0}>
                                        <img className=" w-12 h-12 rounded-full" src={user.photoURL} alt="User" />
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm py-4 font-bold dropdown-content mt-3 right-0 z-[11] p-2 shadow bg-base-100 rounded-box w-52">
                                        <button onClick={handleLogOut}>LogOut Now</button>
                                    </ul>
                                </div>
                            </> :
                            <Link to={'/signup'} className="btn">Join Us</Link>
                    }
                </div>
            </div>
        </>
    );
}

export default Navbar;