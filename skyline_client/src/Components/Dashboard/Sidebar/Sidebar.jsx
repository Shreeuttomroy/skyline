
import { NavLink } from "react-router-dom";

function Sidebar({ userdata }) {
    const { role } = userdata
    return (
        <>
            <div className=" h-screen">
                <ul className="menu menu-sm p-4 w-80 h-full bg-base-200 text-base-content">
                    <li className=' h-10 shadow'><NavLink to={'/dashboard/profile'}>Profile</NavLink></li>
                    {
                        role == 'admin' &&
                        <>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/manageproperties'}>Manage Properties</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/manageusers'}>Manage Users</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/managereviews'}>Manage Reviews</NavLink></li>
                        </>
                    }
                    {
                        role == 'agent' &&
                        <>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/addproperty'}>Add Property</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/addedproperties'}>Added Properties</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/soldproperties'}>Sold Properties</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/requestedproperties'}>Requested Properties</NavLink></li>
                        </>
                    }
                    {
                        role == 'general' &&
                        <>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/wishlist'}>Wishlist</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/propertiesbought'}>Properties Bought</NavLink></li>
                            <li className=' h-10 shadow'><NavLink to={'/dashboard/myreviews'}>My Reviews</NavLink></li>
                        </>
                    }
                </ul>
            </div>
        </>
    );
}

export default Sidebar;