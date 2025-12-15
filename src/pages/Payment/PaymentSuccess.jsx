import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("session_id");
  const navigate = useNavigate();
  const calledRef = useRef(false); 
  const axiosSecure=useAxiosSecure()

  useEffect(() => {
    if (!bookingId || calledRef.current) return;

    calledRef.current = true;

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { bookingId });
      } catch (error) {
        console.error(" Payment Failed:", error.response?.data || error.message);
      }
    };

    confirmPayment();
  }, [bookingId,axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।  
          টিকিট বুকিং নিশ্চিত করা হয়েছে।
        </p>

        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition"
            onClick={() => navigate("/dashboard/myBookingTickets")}
          >
            View My Tickets
          </button>

          <button
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
