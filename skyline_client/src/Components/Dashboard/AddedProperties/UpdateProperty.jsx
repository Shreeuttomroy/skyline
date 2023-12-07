import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../../CustomHook/AxiosSecure";
import { UsePhoto } from "../../../CustomHook/util";
function UpdateProperty() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [image, setImage] = useState(null)
    // const [imgloc,setLoc]= useState(null)
    useEffect(() => {
        axiosSecure.get(`/update/${id}`)
            .then(e => {
                setData(e.data)
                setImage(e.data.img)
            })
            .catch(e => console.log(e.message))
    }, [id])
    console.log(data);
    const changePhoto = async e => {
        const imgloc = e.target.files[0]
        console.log(imgloc);
        const image = await UsePhoto(imgloc)
        setImage(image?.data.url)
    }
    const updateproperty = async e => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const location = form.location.value
        const price = form.price.value
        const offerdata = {
            "title": title,
            "location": location,
            "time": data.time,
            "img": image,
            "price": price,
        }
        console.log(offerdata);
        axiosSecure.patch(`/update?id=${data._id}`, { offerdata })
            .then(e => {
                console.log(e);
            })
            .catch(e => console.log(e.message))
    }
    return (
        <>
            <div className=" px-4 py-6">
                <p className=" text-center text-xl md:text-3xl mb-10 font-bold">Add Property</p>
                <form onSubmit={updateproperty}>
                    <div>
                        {
                            image &&
                            <p className="w-full flex justify-center"><img className=" w-28 h-28 rounded-3xl" src={image} alt="" /></p>
                        }
                        <label className="block mb-2 text-sm font-medium text-gray-900">Change Photo</label>
                        <input type="file" name='photo' onChange={changePhoto} id="first_name" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input defaultValue={data?.price} type="number" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Agent Name</label>
                            <input defaultValue={data?.agent.name} type="text" name='a_name' readOnly className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Agent Email</label>
                            <input defaultValue={data?.agent.email} type="text" name='a_email' readOnly className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                            <input defaultValue={data?.location} type="text" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name='location' required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input defaultValue={data?.title} type="text" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Now</button>
                </form>

            </div>
        </>
    );
}

export default UpdateProperty;