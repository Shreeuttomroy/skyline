
function ManageReview({ d, index,deleteReview }) {
    const { review,description } = d
    return (
        <>
            <tr className=" w-full px-3 py-4">
                <th>{index + 1}</th>
                <td>
                    <div>
                        <div className=" flex mb-2">
                            <img src={review.img} className=" w-12 h-12 rounded-full" />
                            <div className=" text-base font-semibold">
                                <p className=" text-xl font-semibold">{review.name}</p>
                                <p>{review.email}</p>
                            </div>
                        </div>
                        <p>{description}</p>
                    </div>
                </td>
                <td><button onClick={()=>deleteReview(d._id)} className=" btn btn-error">Delete</button></td>
            </tr>
        </>
    );
}

export default ManageReview;