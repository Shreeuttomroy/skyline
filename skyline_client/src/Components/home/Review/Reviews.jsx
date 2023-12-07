import { useEffect, useState } from "react";
import Review from "./Review";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {  axiosSecure } from "../../../CustomHook/AxiosSecure";
// import required modules
// import { Pagination } from 'swiper/modules';

function Reviews() {

    const [ reviews, setReviews ] = useState(null)

    useEffect(() => {
        axiosSecure.get('/reviews')
            .then(e => {
                setReviews(e.data)
            })
            .catch(e => console.log(e.message))
    }, [])
    return (
        <>
            <div>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    
                    {
                        reviews &&
                        reviews.map(d => <SwiperSlide key={d._id}><Review d={d}></Review></SwiperSlide>)
                    }

                </Swiper>
            </div>
        </>
    );
}

export default Reviews;