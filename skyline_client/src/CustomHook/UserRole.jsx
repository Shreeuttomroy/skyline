import { useContext } from "react"
import useAxios from "./AxiosSecure"
import { AuthContext } from "../AuthProvider/AuthProvider"
import {
    useQuery
  } from '@tanstack/react-query'

const UserRole = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxios()
    // const user1 = await axiosSecure.get(`/user?email=${user.email}`)
    const datafatch=()=>axiosSecure.get(`/user?email=${user.email}`).then(e=>e.data)
    const { data, isLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryFn: async () => datafatch,
        queryKey: ['data'],
    })

    console.log(data);
    console.log(datafatch);
    // return data;
    return [data, isLoading]
}

export default UserRole;