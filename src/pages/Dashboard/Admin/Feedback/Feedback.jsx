import React, { useEffect, useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/feedback")
      .then((res) => {
        setFeedbacks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Feedback load error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading feedback...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        User Feedback
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((item) => (
          <div
            key={item._id}
            className=" shadow-md rounded-xl p-6"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.photoURL}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm ">{item.email}</p>
              </div>
            </div>

            {/* Comment */}
            <p className=" mb-4">
              {item.comment}
            </p>

            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="text-yellow-500">
                {"⭐".repeat(item.rating)}
              </div>
              <span className="text-sm ">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
