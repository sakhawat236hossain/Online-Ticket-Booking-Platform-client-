import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiMap, FiCheck, FiStar, FiMessageSquare } from "react-icons/fi";
import { FaBus, FaPlane, FaShip, FaTrain, FaStar } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useBookingTicket } from "../../Hooks/useBookingTicket";
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 

const transportIcons = {
  Bus: <FaBus className="text-blue-500" size={20} />,
  Train: <FaTrain className="text-purple-500" size={20} />,
  Air: <FaPlane className="text-red-500" size={20} />,
  Ship: <FaShip className="text-green-500" size={20} />,
};

const TicketsDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [ticket, setTicket] = useState({});
  const [countdown, setCountdown] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Review States ---
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const { mutateAsync, isPending, reset } = useBookingTicket();

  useEffect(() => {
    // Fetch Ticket Info
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data));

    // Fetch Reviews for this ticket
    fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  // --- Review Handler ---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Login Required", "Please login to leave a review", "warning");

    const reviewData = {
      ticketId: id,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating: userRating,
      comment: userComment,
      status: "approved", 
      createdAt: new Date(),
    };

    setIsSubmittingReview(true);
    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Thank you for your feedback!", "success");
        setReviews([reviewData, ...reviews]); 
        setUserComment("");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to post review. Make sure you bought this ticket.", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // ... (Countdown Logic unchanged) ...
  useEffect(() => {
    if (!ticket?.departure) return;
    const interval = setInterval(() => {
      const diff = new Date(ticket.departure) - new Date();
      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }
      const pad = (n) => n.toString().padStart(2, "0");
      setCountdown({
        days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: pad(Math.floor((diff / 60000) % 60)),
        seconds: pad(Math.floor((diff / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [ticket?.departure]);

  const isExpired = new Date(ticket?.departure) < new Date();
  const noStock = ticket?.quantity === 0;
  const isInvalidQty = quantity > ticket?.quantity || quantity < 1 || !quantity;
  const isDisabled = isExpired || noStock;

  const handleBooking = async () => {
    const totalPrice = ticket.price * quantity;
    const bookingInfo = {
      ticketId: ticket._id,
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      transport: ticket.transport,
      price: ticket.price,
      quantity,
      totalPrice,
      image: ticket.image,
      departure: ticket.departure,
      status: "pending",
      buyer: { buyerName: user?.displayName, buyerEmail: user?.email, buyerPhoto: user?.photoURL },
      vendor: { VendorName: ticket.Vendor?.VendorName, VendorEmail: ticket.Vendor?.VendorEmail, VendorImage: ticket.Vendor?.VendorImage },
    };

    try {
      const data = await mutateAsync(bookingInfo);
      if (data.success) {
        Swal.fire("Success!", "Ticket booked successfully", "success");
        setIsModalOpen(false);
        reset();
      }
    } catch (err) {
      Swal.fire("Error!", "Booking failed", "error");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12 ">
          
          {/* IMAGE SECTION */}
          <div className="relative">
            <img src={ticket?.image} alt={ticket?.title} className="w-full h-80 md:h-full object-cover rounded-3xl shadow-xl" />
            <div className="absolute top-4 right-4 bg-indigo-600  font-extrabold text-xl px-4 py-2 rounded-full shadow-lg">
              ${ticket?.price}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{ticket?.title}</h2>
              <div className=" p-4 rounded-xl border border-gray-100 mb-4 flex justify-between">
                <span className="flex items-center gap-2"><FiMap className="text-green-500"/> {ticket?.from}</span>
                <span className="">|</span>
                <span className="flex items-center gap-2"><FiMap className="text-red-500"/> {ticket?.to}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className="flex items-center gap-3 p-3 rounded-lg"> {transportIcons[ticket?.transport]} <b>{ticket?.transport}</b></p>
                <p className="flex items-center gap-3 p-3 rounded-lg"> 🎟 Available: <b>{ticket?.quantity}</b></p>
              </div>
            </div>

            {/* COUNTDOWN */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {["days", "hours", "minutes", "seconds"].map(t => (
                <div key={t} className="p-2 rounded-xl bg-black/10"> 
                  <p className="text-xl font-bold">{countdown[t] || "00"}</p>
                  <p className="text-[10px] uppercase">{t}</p>
                </div>
              ))}
            </div>

            <button
              disabled={isDisabled}
              onClick={() => setIsModalOpen(true)}
              className={`py-4 rounded-xl text-xl font-bold w-full transition ${isDisabled ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:scale-[1.02]"}`}
            >
              {isExpired ? "Expired" : noStock ? "Sold Out" : "Book Now"}
            </button>
          </div>
        </div>

        {/* --- REVIEW & RATING SECTION --- */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* List of Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-3xl font-black flex items-center gap-3">
              <FiMessageSquare className="text-indigo-600" /> User Reviews ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
              <p className="text-gray-400 italic">No reviews yet. Be the first to share your experience!</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className="p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                  <img src={rev.userImage} className="w-12 h-12 rounded-full border-2 border-indigo-100" alt="" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold ">{rev.userName}</h4>
                      <div className="flex text-yellow-400 text-xs">
                        {[...Array(rev.rating)].map((_, i) => <FaStar key={i} />)}
                      </div>
                    </div>
                    <p className=" mt-2">{rev.comment}</p>
                    <span className="text-[10px]  uppercase mt-2 block">{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Review Form */}
          <div className="p-8 rounded-3xl shadow-xl border border-indigo-50 h-fit sticky top-24">
            <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold  mb-2">Your Rating</label>
                <select 
                  value={userRating} 
                  onChange={(e) => setUserRating(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 ring-indigo-500 outline-none"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ (Good)</option>
                  <option value="3">⭐⭐⭐ (Average)</option>
                  <option value="2">⭐⭐ (Poor)</option>
                  <option value="1">⭐ (Terrible)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold  mb-2">Comment</label>
                <textarea 
                  required
                  rows="4"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-4  border border-gray-200 rounded-xl focus:ring-2 ring-indigo-500 outline-none resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-4 bg-indigo-600  font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                {isSubmittingReview ? "Posting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL (Existing) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/20">
          <div className=" p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6">
            <h3 className="text-2xl font-extrabold border-b pb-3 text-indigo-600">Confirm Booking</h3>
            <p className="text-sm font-medium">Ticket: {ticket?.title}</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`w-full p-3 border-2 rounded-lg text-lg ${isInvalidQty ? "border-red-500" : "border-gray-300"}`}
              min={1} max={ticket?.quantity}
            />
            <div className="text-xl font-bold">Total: <span className="text-indigo-600">${(ticket.price * quantity).toFixed(2)}</span></div>
            <div className="flex gap-4">
              <button onClick={handleBooking} className="flex-1 py-3 bg-green-600  rounded-lg font-bold">Confirm</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-red-300 text-red-600 rounded-lg font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsDetails;