import toast from "react-hot-toast";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";

function User({d,index}) {
    const {displayName,email,role} = d
    const makeAdmin=()=>{
        axiosSecure.patch(`/makeadmin?id=${d._id}`)
        .then(()=>{
            toast.success("Make Admin Successfull!")
        })
        .catch(e=> console.log(e.message))
    }
    const makeAgent=()=>{
        axiosSecure.patch(`/makeagent?id=${d._id}`)
        .then(()=>{
            toast.success("Make Agent Successfull!")
        })
        .catch(e=> console.log(e.message))
    }
    const markFraud=()=>{
        axiosSecure.patch(`/markfraud?id=${d._id}`)
        .then(()=>{
            toast.success("Marked Fraud Successfull!")
        })
        .catch(e=> console.log(e.message))
    }
    const deleteUser=()=>{
        axiosSecure.delete(`/deleteuser?id=${d._id}`)
        .then(()=>{
            toast.success("Deleted User!")
        })
        .catch(e=> console.log(e.message))
    }
    return (
        <>
            <tr>
                <th>{index+1}</th>
                <td>{displayName}</td>
                <td>{email}</td>
                <td><button onClick={makeAdmin} className={ `btn btn-info ${role === 'fraud' || role === 'admin' && 'btn-disabled'}`}>Make Admin</button></td>
                <td><button onClick={makeAgent} className={ `btn btn-info ${role === 'fraud' || role === 'agent' && 'btn-disabled'}`}>Make Agent</button></td>
                <td><button onClick={markFraud} className=" btn btn-info">Mark as Fraud</button></td>
                <td><button onClick={deleteUser} className=" btn btn-error">Delete</button></td>
            </tr>
        </>
    );
}

export default User;