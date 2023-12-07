import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_URL || import.meta.env.VITE_URI,
});
// export const axiosPublic = axios.create({
//     baseURL: import.meta.env.VITE_URL ||  import.meta.env.VITE_URI
// });