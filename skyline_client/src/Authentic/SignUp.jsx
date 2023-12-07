import { useForm } from "react-hook-form"
import { UsePhoto } from "../CustomHook/util";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { axiosSecure } from "../CustomHook/AxiosSecure";

function SignUp() {
    const { creatuserwithemail, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const imgloc = data.photo[0]
        const image = await UsePhoto(imgloc)
        const user = {
            displayName: data.name,
            email: data.email,
            photoURL: image?.data?.url,
            role: "general"
        }
        creatuserwithemail(data?.email, data?.password)
            .then(() => {
                updateUserProfile(data.name, image.data.url)
                    .then(() => {
                        axiosSecure.post("/user", { user })
                        navigate('/')
                        toast.success("Register Successful!")
                    })
                    .catch(e => toast.error(e.message))
            })
            .catch(e => toast.error(e.message))
    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="file" {...register('photo')} className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name')} placeholder="Name" className="input input-bordered" required />
                            </div>
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
                                <input type="password" {...register('password', {
                                    min: 6, pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{6,}$/
                                })} placeholder="password" className="input input-bordered" required />
                                {
                                    errors?.password && <p className=" text-red-400">Not valid! Enter At least 6 characters, one capital letter and one speacial letter</p>
                                }
                                <div className="form-control">
                                    <label className="cursor-pointer label justify-start">
                                        <input type="checkbox" name="terms" className="checkbox checkbox-accent" {...register("terms", { required: true })} />
                                        <span className="label-text ml-2">Accept our terms & conditions</span>
                                    </label>
                                    {
                                        errors?.terms && <p className=" text-red-400">Please, Check it!</p>
                                    }
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div>
                            <p className=" w-fit mx-auto">Already have account, <Link className=" font-bold underline" to={'/login'}>Login Now</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;