import React from "react";
import Marquee from "react-fast-marquee";
import { ShieldCheck, Ticket, Clock, ThumbsUp } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck size={35} className="text-blue-600" />,
      title: "Safe & Secure",
      desc: "Your journey is protected with our verified system.",
    },
    {
      icon: <Ticket size={35} className="text-green-600" />,
      title: "Easy Booking",
      desc: "Simple, fast and user-friendly ticket booking.",
    },
    {
      icon: <Clock size={35} className="text-yellow-500" />,
      title: "24/7 Support",
      desc: "We’re always here to help you anytime.",
    },
    {
      icon: <ThumbsUp size={35} className="text-purple-600" />,
      title: "Trusted Service",
      desc: "100+ Operators & Millions of Happy Travellers.",
    },
  ];

  return (
    <div className="py-16dark:text-white">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        Why Choose Us?
      </h2>

      {/* Marquee Section */}
      <Marquee pauseOnHover speed={80} gradient={false}>
        {features.map((f, i) => (
          <div
            key={i}
            className="mx-6 p-6 min-w-[270px] rounded-2xl backdrop-blur-md 
            shadow-lg border border-gray-200 hover:shadow-2xl hover:bg-white 
            transition-all duration-300 cursor-pointer relative overflow-hidden group"
          >
            {/* Glow Border Animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl border-2 border-blue-500"></div>

            {/* Floating Icon */}
            <div className="flex justify-center mb-4 transform transition-all group-hover:-translate-y-1">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-center text-sm">{f.desc}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default WhyChooseUs;
