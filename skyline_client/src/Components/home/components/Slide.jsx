/* eslint-disable react/prop-types */
function Slide({sdata}) {
    const {img,dsc} = sdata
    return ( 
        <>
        <div className=' h-fit w-full relative'>
            <img className=" h-96 md:h-[600px] w-full" src={img} alt="" />
            <div className=" h-full w-full flex justify-center bg-[#0000003f] z-10 top-0 absolute text-xl md:text-5xl">
                <p className=" text-center text-white font-bold w-64 md:w-[500px] self-center">{dsc}</p>
            </div>
        </div>
        </>
     );
}

export default Slide;