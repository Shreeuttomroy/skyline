function Review({ d }) {
    const datedata = new Date(d.time)
    return (
        <>
            <div className=" my-4">
                <div className=" flex justify-start">
                    <img className=" w-8 h-8 mr-1 rounded-full" src={d?.review?.img} alt="" />
                    <p className=" font-semibold self-center">{d?.review?.name}</p>
                </div>
                <p className=" text-xs font-bold ml-8">{datedata.toDateString()}</p>
                <p className=" ml-10">{d?.description}</p>
            </div>
        </>
    );
}

export default Review;