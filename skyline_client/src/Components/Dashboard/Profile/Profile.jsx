import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [userdata, setData]=useState(null)
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.get(`/user?email=${user.email}`)
        .then(e=>setData(e.data))
        .catch(e=> console.log(e.message))
    },[user])
    const user1 = userdata

    const SignOut =()=>{
        logOut()
        .then(() => {
            navigate('/')
            toast.success("LogOut successful!")
        })
        .catch(e => console.log(e))
    }
    return (
        <>
            <div className="w-full py-10 font-semibold bg-[#0000001f]">
                {
                    user1 &&
                    <div className="w-3/4 rounded-lg md:w-2/4 mx-auto">
                        <div className="w-full rounded-lg h-20 md:h-36 bg-emerald-200 relative flex justify-center">
                            <img className=" absolute bottom-[-40px] mx-auto w-16 md:w-24 border-2 border-black h-16 md:h-24 rounded-full z-10" src={user1.photoURL} alt="" />
                        </div>
                        <div className=" w-full py-14 bg-white relative">
                            <p className=" capitalize bg-success w-fit px-4 py-2 rounded-3xl mx-auto text-white">{user1.role}</p>
                            <p className=" w-fit text-lg mx-auto my-1">{user1.displayName}</p>
                            <p className=" w-fit mx-auto my-1"><span className="font-bold">Id:</span> {user1._id}</p>
                            <p className=" w-fit mx-auto my-1"><span className=" font-bold">Email:</span> {user.email}</p>
                            {/* <div className=" w-fit md:absolute md:right-4 md:top-2">
                                <button className="btn bg-accent w-full my-2">Update Profile</button>
                                <br />
                                <button className="btn bg-accent">Change Password</button>
                            </div> */}
                            <button onClick={SignOut} className="btn text-red-400 right-4 bottom-4 absolute btn-info">Logout</button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Profile;