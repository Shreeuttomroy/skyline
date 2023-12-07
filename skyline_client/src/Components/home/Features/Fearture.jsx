import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";

function Feature({ d }) {
    const {img,title,location,price,verification_status}=d
    return (
        <>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img className=" h-52 object-cover w-full" src={img} alt={title} /></figure>
                <div className="card-body font-semibold">
                    <h2 className="card-title">{title}</h2>
                    <p className=" flex items-center"><FaLocationDot></FaLocationDot> {location}</p>
                    <p className=" flex items-center"><MdVerified></MdVerified> {verification_status}</p>
                    <p>Price Range: {price} USD</p>
                    <div className="card-actions justify-end">
                        <Link to={`/details/${d._id}`} className="btn btn-info">Details</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feature;