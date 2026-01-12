import React, { useEffect, useState } from "react";
import { FiTrash2, FiStar, FiMessageSquare, FiEye, FiX, FiTag } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get("/all-reviews");
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setIsModalOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: 'transparent', 
      color: 'inherit'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review has been removed.", "success");
            setReviews(reviews.filter((rev) => rev._id !== id));
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete review.", "error");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-500"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">
      <title>Manage Reviews - Admin Dashboard</title>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
       <div className="mb-10">
  <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
    <FiTag className="text-red-500 rotate-90 shrink-0" /> 
    <span className="opacity-90 tracking-tight">Ticket Feedbacks</span>
  </h2>
  <p className="mt-2 text-sm md:text-base opacity-60 font-medium leading-relaxed">
    টিকিট বুকিং এবং যাত্রা সংক্রান্ত ইউজারদের দেওয়া অভিজ্ঞতা এখান থেকে মনিটর করুন।
  </p>
</div>

        {/* Content Wrapper */}
        <div className="rounded-2xl border border-slate-700/30 overflow-hidden backdrop-blur-sm shadow-sm">
          
          {/* Mobile View (Cards) */}
          <div className="block md:hidden">
            {reviews.length === 0 ? (
                <p className="p-10 text-center opacity-50">No reviews found.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="p-5 border-b border-slate-700/20 last:border-0 bg-slate-500/5">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={review.userImage} className="w-10 h-10 rounded-full border border-slate-700/30" alt="" />
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-bold truncate opacity-90">{review.userName}</h4>
                                <p className="text-[10px] opacity-50 truncate">{review.userEmail}</p>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500 font-black text-xs">
                               ⭐ {review.rating}
                            </div>
                        </div>
                        <p className="text-sm italic opacity-70 line-clamp-2 mb-5">"{review.comment}"</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleViewDetails(review)} className="flex-1  py-2.5 bg-blue-600/90 text-white rounded-xl text-xs font-bold flex justify-center items-center gap-2 cursor-pointer hover:bg-blue-600 transition">
                                <FiEye /> View
                            </button>
                            <button onClick={() => handleDelete(review._id)} className="px-4 py-2.5 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-500/10 border-b border-slate-700/30">
                <tr>
                  <th className="p-5 font-bold uppercase text-[11px] tracking-widest opacity-70">User Profile</th>
                  <th className="p-5 font-bold uppercase text-[11px] tracking-widest opacity-70 text-center">Rating</th>
                  <th className="p-5 font-bold uppercase text-[11px] tracking-widest opacity-70">Review</th>
                  <th className="p-5 font-bold uppercase text-[11px] tracking-widest opacity-70 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/20">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-slate-500/5 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img src={review.userImage} className="w-10 h-10 rounded-xl object-cover border border-slate-700/30 shadow-sm" alt="" />
                        <div>
                          <p className="font-bold text-sm opacity-90">{review.userName}</p>
                          <p className="text-[10px] opacity-40">{review.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20 text-yellow-500 bg-yellow-500/5">
                        ⭐ {review.rating}.0
                      </span>
                    </td>
                    <td className="p-5">
                      <p className="text-xs opacity-60 truncate max-w-[200px] italic">"{review.comment}"</p>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleViewDetails(review)} className="px-3 py-2 bg-slate-700/50 hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold transition">
                          <FiEye className="inline mr-1" /> View
                        </button>
                        <button onClick={() => handleDelete(review._id)} className="p-2 text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE MODAL --- */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/40 p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-full transition z-10"
            >
              <FiX size={20} />
            </button>

            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
                <img src={selectedReview.userImage} className="w-20 h-20 rounded-2xl border-2 border-slate-700 shadow-xl" alt="" />
                <div className="text-center sm:text-left">
                  <h4 className="text-2xl font-black text-white leading-tight">{selectedReview.userName}</h4>
                  <p className="text-xs text-slate-500 font-medium mb-3">{selectedReview.userEmail}</p>
                  <div className="flex justify-center sm:justify-start text-yellow-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill={i < selectedReview.rating ? "currentColor" : "none"} className={i < selectedReview.rating ? "text-yellow-400" : "text-slate-700"} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative p-6 rounded-2xl bg-white/5 border border-slate-700/50 italic leading-relaxed mb-8 text-center sm:text-left">
                <span className="text-4xl text-slate-700 absolute top-2 left-4 font-serif">“</span>
                <p className="relative z-10 text-sm md:text-base text-slate-300">
                   {selectedReview.comment}
                </p>
                <span className="text-4xl text-slate-700 absolute bottom-0 right-4 font-serif">”</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 transition"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleDelete(selectedReview._id)}
                  className="w-full sm:flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-900/20 hover:bg-red-500 transition flex items-center justify-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;