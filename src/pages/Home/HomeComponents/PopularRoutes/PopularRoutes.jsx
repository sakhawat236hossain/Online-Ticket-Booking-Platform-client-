import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const routes = [
  { from: "Dhaka", to: "Chittagong", price: "৳ 650" },
  { from: "Dhaka", to: "Cox’s Bazar", price: "৳ 1200" },
  { from: "Dhaka", to: "Sylhet", price: "৳ 550" },
  { from: "Dhaka", to: "Rangpur", price: "৳ 700" },
  { from: "Dhaka", to: "Khulna", price: "৳ 800" },
  { from: "Dhaka", to: "Barisal", price: "৳ 550" },
];

const PopularRoutes = () => {
  return (
    <div className="py-5 ">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center  mb-12"
        >
          Popular Bus Routes
        </motion.h2>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.07, y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl  shadow-md hover:shadow-xl cursor-pointer"
            >
              {/* TOP STRIP */}
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-indigo-500"></div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>

                  <h3 className="text-xl font-bold">
                    {route.from} → {route.to}
                  </h3>
                </div>

                <p className=" mb-4">
                  A popular and frequently traveled route in Bangladesh.
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-blue-600">
                    {route.price}
                  </span>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Navigation className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PopularRoutes;
