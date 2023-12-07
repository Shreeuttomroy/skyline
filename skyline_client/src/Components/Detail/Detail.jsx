import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../CustomHook/AxiosSecure";
import { useParams } from "react-router-dom";
import Review from "./Review";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
// import axios from "axios";

function Detail() {

    // const axiosSecure = useAxios()
    const [data, setData] = useState(null)
    const { user } = useContext(AuthContext)
    const [reviewdata, setReviewdata] = useState(null)
    const { id } = useParams()
    const { register, handleSubmit } = useForm()
    useEffect(() => {
        axiosSecure.get(`/details/${id}`)
            .then(e => {
                setData(e.data[0])
                console.log(e.data);
                if (e.data.length > 0) {
                    setReviewdata(e.data[1])
                    console.log(e.data[1]);
                }
            })
            .catch(e => console.log(e.message))
    }, [id])


    const addWishlist = () => {
        const datas = {
            "img": data.img,
            "title": data.title,
            "location": data.location,
            "agent": data.agent,
            "status": data.status,
            "price": data.price,
            "u_email": user.email,
            "id":data._id
        }
        axiosSecure.post('/wishlist', { datas })
            .then(() => {
                toast.success('Successfully Wishlisted')
            })
            .catch(e => toast.error(e.message))
    }

    const addreview = (d) => {

        const cdate = new Date()
        console.log(cdate.toISOString());
        const review = {
            "title": data.title,
            "agent": {
                "name": data.agent.name,
                "email": data.agent.email
            },
            "time": cdate.toISOString(),
            "id": data._id,
            "description": d.description,
            "review": {
                "img": user.photoURL,
                "name": user.displayName,
                "email": user.email
            }
        }
        console.log(review);
        axiosSecure.post('/review', { review })
            .then(() => toast.success("Thanks for your review"))
            .catch(e => console.log(e.message))
    }

    return (
        <><div className=" mx-4 py-5">
            {
                data &&
                <>
                    <div className=" my-3">
                        <img className=" w-full h-[300px] md:h-[400px] lg:h-[600px] rounded-md" src={data.img} alt={data.title} />
                        <div>
                            <p className=" text-xl font-semibold my-4">{data.title}</p>
                            <p className=" text-xl font-bold">Details:</p>
                            <div className=" ml-4 my-2">
                                <p>{data.dsc}</p>
                                <p className=" text-lg font-semibold">Features:</p>
                                <ul className=" ml-4 list-disc">
                                    {
                                        data.features &&
                                        data.features.map(d => <li className="ml-6" key={d}>{d}</li>)
                                    }
                                </ul>
                            </div>
                            <p><span className=" font-bold">Price:</span> {data.price}</p>
                            <p className=" font-bold">Agent Information:</p>
                            <div>
                                <p><span className=" font-bold">Email:</span>{data.agent.email}</p>
                                <p><span className="font-bold">Name:</span> {data.agent.name}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-info text-white my-4" onClick={addWishlist}>Add Wishlist</button>
                    </div>
                    <div>
                        <div>
                            <form className=" w-2/3 md:w2/4 lg:w-1/3 md:flex md:h-28" onSubmit={handleSubmit(addreview)}>
                                {/* <input className=" w-full h-full bg-slate-100 border-black border-[1px]" type="text" /> */}
                                <textarea name="review" {...register('description')} className=" w-full h-full bg-slate-100 border-black border-[1px] p-2" id="" cols="30" rows="10"></textarea>
                                <button className="btn bg-info text-white hover:bg-slate-400">Add Review</button>
                            </form>
                        </div>
                        <div className=" my-4">
                            {
                                reviewdata ?
                                    reviewdata?.map(d => <Review key={d._id} d={d}></Review>) :
                                    <div>
                                        <p>No reviews....</p>
                                    </div>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
        </>
    );
}

export default Detail;