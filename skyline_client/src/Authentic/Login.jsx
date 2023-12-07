import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosSecure } from "../CustomHook/AxiosSecure";
// import useAxios from "../CustomHook/AxiosSecure";

function Login() {
    const { signupWihtGoogle, signInWithEmail } = useContext(AuthContext)
    const navigate = useNavigate()
    const loca = useLocation()
    const location = loca?.state?.from?.pathname || "/"
    // if(user){
    //     return <Navigate to={location}></Navigate>
    // }
    console.log(typeof location);
    // const axiosSecure = useAxios()
    const { register, handleSubmit } = useForm()
    const onSubmit = data => {
        const { email, password } = data
        signInWithEmail(email, password)
            .then(() => {
                toast.success("Login Successful!")
                navigate(location)
            })
            .catch(e => toast.error(e.message))
    }
    const handlePopup = async () => {
        try {
            const result = await signupWihtGoogle()
            if (result) {
                const e = result.user
                const user = {
                    displayName: e.displayName,
                    email: e.email,
                    photoURL: e.photoURL,
                    role: "general"
                }
                await axiosSecure.post("/user", { user })
                navigate('/')
                toast.success("Login Successful!")
            }
        } catch (e) {
            toast.error(e.message)
        }
    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email')} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password')} placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p className=" w-fit mx-auto">Haven`t Account,<Link className=" font-bold underline" to={'/signup'}>Register Now</Link></p>
                        <p className=" text-xl font-bold text-center">Or</p>
                        <div className="form-control my-4">
                            <button onClick={handlePopup} className=" text-white mx-auto btn hover:bg-green-800 bg-success">Login With Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;