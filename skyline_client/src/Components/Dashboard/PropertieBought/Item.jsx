import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Item({ d, deleteOffer }) {
    const { img, title, location, a_name, status, amount, transaction_id } = d
    return (
        <>
            <div className="card my-3 card-compact w-full bg-base-100 shadow-xl">
                <figure><img className=" h-52 object-cover w-full" src={img} alt={title} /></figure>
                <div className="card-body font-semibold">
                    <h2 className="card-title">{title}</h2>
                    <p className=" flex items-center"><FaLocationDot></FaLocationDot> {location}</p>
                    <p className=" flex items-center">Status : {status}</p>
                    <p>Amount: {amount} USD</p>
                    <p className=" font-bold text-lg">Agent:</p>
                    <div className=" ml-2">
                        <p>{a_name}</p>
                    </div>
                    <div>
                        {
                            transaction_id ?
                                <p className=" w-full">Transaction Id: <span className=" text-xs">{transaction_id}</span></p>
                                :
                                <div className="card-actions justify-end flex">
                                    {
                                        d?.status == "accepted" &&
                                        <Link to={`/dashboard/paynow/${d._id}`} className="btn btn-info">Pay Now</Link>
                                    }
                                    {
                                        d?.status !== "bought" &&
                                        <button onClick={() => deleteOffer(d._id)} className=" btn btn-error">Remove</button>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;