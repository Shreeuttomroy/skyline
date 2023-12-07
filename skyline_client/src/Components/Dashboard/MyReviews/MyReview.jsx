function MyReview({e,removeItem}) {
    const {title,agent,time,description,}=e
    const date = new Date(time)
    const cdate = date.toDateString()
    return (
        <>
            <div className="card my-3 card-compact w-full bg-base-100 shadow-xl">
                <div className="card-body font-semibold">
                    <h2 className="card-title">{title}</h2>
                    <p><span className="font-bold">Agent:</span> {agent.name} </p>
                    <p><span className="font-bold">Time:</span> {cdate}</p>
                    <p className=" font-bold">Description:</p>
                    <p>{description}</p>
                    <div className="card-actions justify-end flex">
                        <button onClick={() => removeItem(e._id)} className="btn btn-warning mx-4">Remove</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyReview;