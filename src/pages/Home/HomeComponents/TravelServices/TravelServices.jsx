import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
    title: "Bus Service",
    desc: "Comfortable and safe bus journeys across the country.",
    iconColor: "text-blue-500",
  },
  {
    img: "https://i.pinimg.com/1200x/70/47/85/704785b540d975eb91e1d5ddadd990d9.jpg",
    title: "Car Service",
    desc: "Private and sedan car rentals for your convenience.",
    iconColor: "text-green-500",
  },
  {
    img: "https://i.pinimg.com/736x/c4/83/d9/c483d9f290f33dbfe79b9406bdbd913a.jpg",
    title: "Launch Service",
    desc: "River launch & boat tickets for safe river travel.",
    iconColor: "text-indigo-500",
  },
  {
    img: "https://i.pinimg.com/736x/35/5b/58/355b58308899151c06e6c9f1d4ad17e7.jpg",
    title: "Flight Service",
    desc: "Flight tickets booking for domestic and international travel.",
    iconColor: "text-red-500",
  },
];

const TravelServices = () => {
  return (
    <div className="py-20 dark:bg-gray-900">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold  mb-3">
          Explore Our Travel Solutions
        </h2>
        <p className="text-lg">
          Book your tickets across all major modes of transport.
        </p>
        <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            
            className="group  rounded-xl shadow-xl overflow-hidden cursor-pointer"
          >
            {/* IMAGE AREA */}
            <div className="w-full h-56 relative overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
            </div>
            
            {/* CONTENT AREA */}
            <div className="p-6 text-center flex flex-col items-center">
              {/* Icon/Decoration - */}
              <div className={`text-4xl ${s.iconColor} mb-3`}>
                {s.title === "Bus Service" && "🚌"}
                {s.title === "Car Service" && "🚗"}
                {s.title === "Launch Service" && "🚢"}
                {s.title === "Flight Service" && "✈️"}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold  mb-2">
                {s.title}
              </h3>
              
              {/* Description */}
              <p className=" text-base">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelServices;