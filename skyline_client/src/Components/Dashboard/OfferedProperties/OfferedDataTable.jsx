import toast from "react-hot-toast"
import { axiosSecure } from "../../../CustomHook/AxiosSecure"

function OfferedDataTable({d,index}) {
    const {title,location,name,email,amount} = d
    const rejectItem=()=>{
        const id = d._id
        axiosSecure.patch(`/rejectproperty?id=${id}`)
        .then(()=>{
            toast.error("Offer Rejected!")
        })
        .catch(e=> console.log(e.message))
    }
    const acceptItem=()=>{
        const id = d._id
        const pid = d.id
        axiosSecure.patch(`/acceptproperty?id=${id}`)
        .then(()=>{
            axiosSecure.patch(`/rejectproperties?id=${pid}`)
            .then(()=>{
                toast.success("Offer Accepted")
            })
            .catch(e=> console.log(e.message))
        })
        .catch(e=> console.log(e.message))
    }
    return (
        <>
            <tr>
                <th>{index+1}</th>
                <td>{title}</td>
                <td>{location}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{amount}</td>
                <td><button onClick={acceptItem} className="btn btn-info">Accept</button></td>
                <td><button onClick={rejectItem} className=" btn btn-error">Reject</button></td>
            </tr>
        </>
    );
}

export default OfferedDataTable;