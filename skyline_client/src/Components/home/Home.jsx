import Community from "./Community/Community";
import Features from "./Features/Features";
import PropertyNumber from "./PropertyNumber/PropertyNumber";
import Reviews from "./Review/Reviews";
import Slider from "./components/Slider";

function Home() {
    return ( 
        <>
        <div className=" overflow-x-hidden bg-slate-100">
            {/* slider section  */}
            <div className=" h-fit md:h-[600px]">
                <Slider></Slider>
            </div>
            {/* addvertisment of properties section  */}
            <div className=" mt-10 h-fit lg:h-[500px]">
                <div className=" w-full"><p className=" text-3xl font-bold text-center">Our Best Properties</p></div>
                <Features></Features>
            </div>
            <div>
                <Community></Community>
            </div>
            <div>
                <PropertyNumber></PropertyNumber>
            </div>
            <div className=" py-10">
                <div className=" w-full"><p className=" text-3xl font-bold my-6 text-center">Testimonal</p></div>
                <Reviews></Reviews>
            </div>
        </div>
        </>
     );
}

export default Home;