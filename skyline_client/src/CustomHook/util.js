// import useAxios from "./AxiosSecure";

import axios from "axios";

 export const UsePhoto=async(imgloc)=> {
    const formData = new FormData()
    formData.append('image',imgloc)
    const key = import.meta.env.VITE_IMGBB
    console.log(key);
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`,formData)
    return data;
}