import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function Private({children}) {
    const {user,loading}= useContext(AuthContext)
    const location = useLocation()
    if (loading) {
        return <p className=" w-full h-screen flex justify-center"><span className=" self-center loading loading-bars loading-lg"></span></p>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}}></Navigate>;
}

export default Private;