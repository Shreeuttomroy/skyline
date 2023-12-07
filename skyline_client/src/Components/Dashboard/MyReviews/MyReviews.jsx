import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import MyReview from "./MyReview";
import toast from "react-hot-toast";

function MyReviews() {
    const { user } = useContext(AuthContext)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        axiosSecure.get(`/myreviews?email=${user.email}`)
            .then(e => {
                if (e.data.length > 0) {
                    setReviews(e.data)
                }
            })
            .catch(e => console.log(e.message))
    }, [user])
    const removeItem = (id) => {
        axiosSecure.delete(`/removereview?id=${id}`)
            .then(e => {
                if (e.data.deletedCount > 0) {
                    toast.success("Porpertie Removed!")
                    const remeaningdata = reviews.filter(d => d._id !== id)
                    setReviews(remeaningdata)
                }
            })
            .catch(e => console.log(e.message))
    }
    return (
        <>
            {reviews ?
                <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        reviews.map(e => <MyReview removeItem={removeItem} key={e._id} e={e}></MyReview>)
                    }
                </div> :
                <div className="w-full min-h-screen flex justify-center"><p className=" font-bold text-4xl text-center self-center">No Data Found!</p></div>
            }
        </>
    );
}

export default MyReviews;