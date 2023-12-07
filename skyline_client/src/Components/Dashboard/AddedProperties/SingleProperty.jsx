import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

function SingleProperty({ d,removeItem }) {
    const { img, title, location, agent, verification_status, price } = d
    return (
        <>
            <div className="card my-3 card-compact w-full bg-base-100 shadow-xl">
                <figure><img className=" h-52 object-cover w-full" src={img} alt={title} /></figure>
                <div className="card-body font-semibold">
                    <h2 className="card-title">{title}</h2>
                    <p className=" flex items-center"><FaLocationDot></FaLocationDot> {location}</p>
                    <p className=" flex items-center"><MdVerified></MdVerified> {verification_status}</p>
                    <p>Price Range: {price} USD</p>
                    <p className=" font-bold text-lg">Agent:</p>
                    <div className=" ml-2">
                        <img className="  w-7 h-7 rounded-full" src={agent?.img} alt="" />
                        <p>{agent?.name}</p>
                        <p>{agent?.email}</p>
                    </div>
                    <div className="card-actions justify-end">
                    <button onClick={()=>removeItem(d._id)} className="btn btn-warning mx-4">Remove</button>
                        <Link to={`/dashboard/update/${d._id}`} className={` ${verification_status=='rejected'&& 'btn-disabled'} btn btn-info`}>Update</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProperty;