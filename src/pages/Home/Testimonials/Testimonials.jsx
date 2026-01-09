import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactStars from "react-stars";
import axios from "axios";
import axiosPublic from "../../../Hooks/useAxios";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosPublic.get("feedback"); 
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-bars loading-lg text-[#E56F61]"></span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            What Our <span className="text-[#E56F61]">Users Say</span>
          </h2>
        </div>

        {reviews?.length > 0 ? (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper rounded-2xl shadow-sm"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col items-center p-8 md:p-12 bg-base-200 border border-base-300 rounded-2xl mx-12 relative">
                  <div className="w-20 h-20 rounded-full ring ring-[#E56F61] ring-offset-base-100 ring-offset-2 overflow-hidden mb-6">
                    <img
                      src={review.photoURL || "https://i.ibb.co/wrxqjzmf/admin.png"}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <ReactStars
                    count={5}
                    value={Number(review.rating)}
                    size={24}
                    color2={"#E56F61"}
                    edit={false}
                  />

                  <p className="mt-6 text-lg md:text-xl italic text-base-content/80 text-center max-w-2xl">
                    {review.comment}
                  </p>

                  <div className="mt-6 text-center">
                    <h4 className="text-lg font-bold text-[#E56F61] uppercase tracking-wider">
                      {review.name}
                    </h4>
                    <p className="text-xs opacity-50">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}
      </div>
      
      <style jsx="true">{`
        .swiper-button-next, .swiper-button-prev { color: #E56F61 !important; transform: scale(0.6); }
        .swiper-pagination-bullet-active { background: #E56F61 !important; }
      `}</style>
    </section>
  );
};

export default Testimonials;