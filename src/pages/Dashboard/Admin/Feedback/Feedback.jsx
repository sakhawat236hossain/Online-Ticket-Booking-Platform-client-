import React, { useEffect, useState } from "react";
import axiosPublic from "../../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { FiTrash2, FiMessageCircle } from "react-icons/fi"; 

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await axiosPublic.get("feedback");
      setFeedbacks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Feedback load error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E56F61",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: 'rounded-3xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`feedback/${id}`);
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your feedback has been removed.",
              icon: "success",
              confirmButtonColor: "#E56F61"
            });
            setFeedbacks(feedbacks.filter(fb => fb._id !== id));
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete feedback", "error");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <title>feedback Page</title>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E56F61]"></div>
    </div>
  );

  return (
    <section className="relative overflow-hidden  py-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3  rounded-2xl mb-4 text-[#E56F61]">
            <FiMessageCircle size={28} />
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            User <span className="text-[#E56F61]">Feedback</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            আমাদের সেবা সম্পর্কে গ্রাহকদের মূল্যবান মতামত দেখুন। আমরা সবসময় আপনার ভ্রমণকে আনন্দদায়ক করার চেষ্টা করি।
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((item) => (
            <div 
              key={item._id} 
              className="group relative  backdrop-blur-sm border border-white shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Delete Button - Stylish Badge */}
              <button 
                onClick={() => handleDelete(item._id)}
                className="absolute top-6 right-6 p-3  text-red-400 rounded-2xl shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white hover:rotate-12 active:scale-90"
                title="Delete Feedback"
              >
                <FiTrash2 size={18} />
              </button>

              {/* User Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img 
                    src={item.photoURL} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-[1.25rem] object-cover ring-4 ring-orange-50 group-hover:ring-[#E56F61]/20 transition-all" 
                  />
                  <div className="absolute -bottom-2 -right-2  p-1.5 rounded-lg shadow-sm">
                    <div className="bg-[#E56F61] w-2 h-2 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-lg leading-tight">{item.name}</h4>
                  <p className="text-xs font-semibold mt-1">{item.email}</p>
                </div>
              </div>

              {/* Quote Mark Icon */}
              <div className=" absolute text-7xl font-serif leading-none top-24 left-8 pointer-events-none">“</div>

              {/* Comment Body */}
              <div className="min-h-[100px] mb-6">
                <p className="font-medium leading-relaxed italic relative z-10">
                  {item.comment}
                </p>
              </div>

              {/* Footer Section */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center px-3 py-1.5 rounded-xl">
                  <span className="text-yellow-500 flex gap-0.5">
                    {"★".repeat(item.rating)}
                    <span className="">{"★".repeat(5 - item.rating)}</span>
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-tighter">Verified Review</p>
                  <span className="text-xs font-bold ">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;