import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import Item from "./Item";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

function Wishlist() {
    const [properties, setProperties] = useState(null)
    const {user} =useContext(AuthContext)
    const email = user?.email

    useEffect(() => {
        axiosSecure.get(`/wishlist?email=${email}`)
            .then(e => {
                setProperties(e.data)
            })
            .catch(e => console.log(e.message))
    }, [email])
    const removeItem=(id)=>{
        axiosSecure.delete(`/removeitem?id=${id}`)
        .then(e=>{
            if(e.data.deletedCount>0){
                toast.success("Porpertie Removed!")
                const remeaningdata = properties.filter(d=> d._id !== id)
                setProperties(remeaningdata)

            }
        })
        .catch(e=> console.log(e.message))
    }
    return (
        <>
            {properties ?
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
                    {
                        properties.map(d => <Item removeItem={removeItem} d={d} key={d._id}></Item>)
                    }
                </div > :
                <p className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></p>
            }
        </>
    );
}

export default Wishlist;