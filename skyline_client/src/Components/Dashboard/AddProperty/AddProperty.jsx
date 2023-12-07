import { useContext } from "react"
import { AuthContext } from "../../../AuthProvider/AuthProvider"
import { axiosSecure } from "../../../CustomHook/AxiosSecure"
import { useForm } from "react-hook-form"
import { UsePhoto } from "../../../CustomHook/util"
import toast from "react-hot-toast"

function AddProperty() {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm()
    const date = new Date()
    const cdate = date.toISOString()
    const addproperty = async data => {
        console.log(data);
        const imgloc = data.photo[0]
        const image = await UsePhoto(imgloc)
        const features = data.features.split(',')
        const offerdata = {
            "title": data.title,
            "location": data.location,
            "agent": {
                "img": user.photoURL,
                "email": data.a_email,
                "name": data.a_name,
            },
            "time": cdate,
            "verification_status": "pending",
            "img": image?.data?.url,
            "price": data.price,
            "dsc": data.dsc,
            "features": features
        }
        console.log(offerdata);
        axiosSecure.post('/addproperty', { offerdata })
            .then(() => {
                toast.success("Added Successful!")
            })
            .catch(e => console.log(e.message))
    }
    return (
        <>
            <div className=" px-4 py-6">
                <p className=" text-center text-xl md:text-3xl mb-10 font-bold">Add Property</p>
                <form onSubmit={handleSubmit(addproperty)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Photo</label>
                            <input type="file" {...register('photo')} id="first_name" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input type="number" {...register('price')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Agent Name</label>
                            <input defaultValue={user.displayName} type="text" {...register('a_name')} readOnly className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Agent Email</label>
                            <input defaultValue={user.email} type="text" {...register('a_email')} readOnly className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                            <input type="text" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register('location')} required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input type="text" {...register('title')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <input type="text" {...register('dsc')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Features</label>
                        <input type="text" {...register('features')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Now</button>
                </form>

            </div>
        </>
    );
}

export default AddProperty;