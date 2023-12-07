import { useEffect, useState } from "react";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import Property from "./Property";

function ManageProperties() {
    const [properties, setProperties] = useState(null)
    useEffect(() => {
        axiosSecure.get('/manageproperties')
            .then(e => {
                setProperties(e.data)
            })
            .catch(e => console.log(e.message))
    }, [])
    return (
        <>
            <div>
                {
                    properties ?
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>title</th>
                                        <th>Location</th>
                                        <th>Agent Name</th>
                                        <th>Agent Email</th>
                                        <th>Price</th>
                                        <th>Verify</th>
                                        <th>Reject</th>
                                    </tr>
                                </thead>
                                {/* row 1 */}
                                <tbody>{
                                    properties.map((d,index )=> <Property index={index} d={d} key={d._id}></Property>)
                                }
                                </tbody>
                            </table>
                        </div>
                        :
                        <span className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></span>
                }
            </div>
        </>
    );
}

export default ManageProperties;