import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
    title: "Bus Service",
    desc: "Comfortable and safe bus journeys across the country.",
  },
  {
    img: "https://i.pinimg.com/1200x/70/47/85/704785b540d975eb91e1d5ddadd990d9.jpg",
    title: "Car Service",
    desc: "Private and sedan car rentals for your convenience.",
  },
  {
    img: "https://i.pinimg.com/736x/c4/83/d9/c483d9f290f33dbfe79b9406bdbd913a.jpg",
    title: "Launch Service",
    desc: "River launch & boat tickets for safe river travel.",
  },
  {
    img: "https://i.pinimg.com/736x/35/5b/58/355b58308899151c06e6c9f1d4ad17e7.jpg",
    title: "Flight Service",
    desc: "Flight tickets booking for domestic and international travel.",
  },
  
];

const TravelServices = () => {
  return (
    <div className="py-20 ">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 dark:text-white">
        Our Travel Services
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 max-w-7xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-full h-56 relative overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelServices;
