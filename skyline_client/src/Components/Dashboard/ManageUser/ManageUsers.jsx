import { useEffect, useState } from "react";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import User from "./User";

function ManageUsers() {
    const [users, setUser] = useState(null)
    useEffect(() => {
        axiosSecure.get('/alluser')
            .then(e => {
                setUser(e.data)
            })
            .catch(e => console.log(e.message))
    }, [])
    return (
        <>
            <div>
                {
                    users ?
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Make Admin</th>
                                        <th>Make Agent</th>
                                        <th>Mark Fraud</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {/* row 1 */}
                                <tbody>{
                                    users.map((d,index )=> <User index={index} d={d} key={d._id}></User>)
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

export default ManageUsers;