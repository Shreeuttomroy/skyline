import { useEffect, useState } from "react";
import { axiosSecure } from "../../CustomHook/AxiosSecure";
import Propertie from "./Propertie";

function AllProperties() {
    const [properties, setProperties] = useState(null)

    useEffect(() => {
        axiosSecure.get('/allproperties')
            .then(e => {
                setProperties(e.data)
            })
            .catch(e => console.log(e.message))
    }, [])
    return (
        <>
            {properties ?
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
                    {
                        properties.map(d => <Propertie d={d} key={d._id}></Propertie>)
                    }
                </div > :
                <p className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></p>
            }
        </>
    );
}

export default AllProperties;