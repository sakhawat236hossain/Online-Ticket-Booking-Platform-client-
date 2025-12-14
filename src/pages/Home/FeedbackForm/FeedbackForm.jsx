import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import axiosPublic from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";

// Single Feedback Card
const FeedbackCard = ({ review }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl">
    <div className="flex items-center mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${
            star <= review.rating
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-500"
          }`}
        />
      ))}
    </div>
    <p className="text-gray-700 dark:text-gray-200">{review.comment}</p>
  </div>
);

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  //  Hook MUST be here (top level)
  const { user } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) return toast.error("Please give a rating!");
    if (!comment.trim()) return toast.error("Please write a comment!");

    const newReview = {
      comment,
      rating,
      name: user?.displayName || "Guest",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosPublic.post("/feedback", newReview);

      if (res.data?.acknowledged) {
        onSubmit(newReview);

        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your feedback has been submitted successfully.",
          confirmButtonColor: "#E56F61",
        });

        // Reset
        setComment("");
        setRating(0);
        setHoverRating(0);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#E56F61",
      });
    }
  };

  return (
    <div className="dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
      <h2 className="text-2xl font-bold dark:text-white mb-4">
        Give Your Feedback
      </h2>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={28}
            className={`cursor-pointer ${
              (hoverRating || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>

      {/* Comment */}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full px-4 py-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-[#E56F61] text-white rounded-lg font-semibold"
      >
        Submit Feedback
      </button>
    </div>
  );
};

// Main Feedback Section
const FeedbackSection = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  return (
    <section className="px-6 py-12 ">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold  dark:text-white">
          User Feedback
        </h2>
        <p className="mt-2">
          Share your experience with us
        </p>
        <div className="w-20 h-1 bg-[#E56F61] mx-auto mt-4 rounded"></div>
      </div>

      <FeedbackForm onSubmit={addReview} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <FeedbackCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
