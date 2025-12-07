import React from "react";
import { motion } from "framer-motion";
import { Bus, ShieldCheck, Zap, Headset, Clock, Wallet } from "lucide-react";

const features = [
  {
    icon: <Bus className="w-10 h-10 text-blue-600" />,
    title: "10+ Million Travellers",
    desc: "Trusted by travelers across Bangladesh.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    title: "100+ Verified Bus Operators",
    desc: "Official, licensed and trusted partners.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Fast & Secure Booking",
    desc: "Instant ticket confirmation with native checkout.",
  },
  {
    icon: <Headset className="w-10 h-10 text-purple-600" />,
    title: "24/7 Customer Support",
    desc: "We are always ready to help.",
  },
  {
    icon: <Clock className="w-10 h-10 text-red-500" />,
    title: "Real-time Seat Updates",
    desc: "Live bus seat availability without refresh.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-indigo-600" />,
    title: "Best Price Guarantee",
    desc: "We ensure most competitive bus ticket price.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Sub Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-blue-600 font-semibold uppercase tracking-wide"
        >
          Trusted by millions
        </motion.p>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-5"
        >
          Why Choose Us?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-500 max-w-2xl mx-auto mb-12"
        >
          We provide the fastest, safest and most reliable online bus ticket
          booking experience. Your journey matters!
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl cursor-pointer text-center"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-500"></div>

              {/* Floating circle animation */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex justify-center mb-4"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
