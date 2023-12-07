import { useEffect, useState } from "react";
import Slide from "./Slide";
// import { SwiperContainer } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { axiosSecure } from "../../../CustomHook/AxiosSecure";


function Slider() {
    const [sdata, setData] = useState(null)

    useEffect(() => {
        axiosSecure.get('/slider')
            // fetch('banner.json')
            //     .then(e => e.json())
            .then((e) => {
                setData(e.data)
            })
            .catch(e => console.log(e.message))
    }, [])

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {sdata &&
                    <>
                        <SwiperSlide><Slide sdata={sdata[0]}></Slide></SwiperSlide>
                        <SwiperSlide><Slide sdata={sdata[1]}></Slide></SwiperSlide>
                        <SwiperSlide><Slide sdata={sdata[2]}></Slide></SwiperSlide>
                    </>
                }
            </Swiper>
        </>
    );
}

export default Slider;