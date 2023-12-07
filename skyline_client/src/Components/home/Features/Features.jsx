import { useEffect, useState } from "react";
import Feature from "./Fearture";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";

function Features() {
    const [propdata, setProp] = useState(null)


    useEffect(()=>{
        // fetch('properties.json')
        // .then(e=> e.json())
        axiosSecure.get('/features')
        .then(e=>{
            // const r = e.slice(0,4)
            setProp(e.data)
        })
        .catch(e=> console.log(e))
    },[])

    return ( 
        <>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-2 my-6">
            {
                propdata &&
                propdata.map(d=><Feature key={d.title} d={d}></Feature>)
            }
        </div>
        </>
     );
}

export default Features;