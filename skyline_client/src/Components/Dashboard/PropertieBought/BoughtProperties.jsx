import { useContext, useEffect, useState } from "react";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Item from "./Item";
import toast from "react-hot-toast";

function BoughtProperties() {
    const {user} = useContext(AuthContext)
    const [data,setData] = useState(null)
    useEffect(()=>{
        axiosSecure.get(`/makeoffered?email=${user.email}`)
        .then((e)=>{
            setData(e.data)
        })
        .catch(e=> console.log(e.message))
    },[user])
    const deleteOffer=(id)=>{
        axiosSecure.delete(`/removeoffer?id=${id}`)
        .then(()=>{
            toast.success('Romoved Offer!')
            const reaming = data.filter(f=> f._id !== id)
            setData(reaming)
        })
        .catch(e=> console.log(e.message))
    }
    return ( 
        <>
            {data ?
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
                    {
                        data.map(d => <Item deleteOffer={deleteOffer} d={d} key={d._id}></Item>)
                    }
                </div > :
                <p className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></p>
            }
        </>
     );
}

export default BoughtProperties;