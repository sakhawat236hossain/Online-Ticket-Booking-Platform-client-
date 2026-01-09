import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
const routes = [
  { from: "Dhaka", to: "Chittagong", price: "650", type: "Bus & Train" },
  { from: "Dhaka", to: "Cox’s Bazar", price: "1200", type: "Bus & Air" },
  { from: "Dhaka", to: "Sylhet", price: "550", type: "Bus & Train" },
  { from: "Dhaka", to: "Rangpur", price: "700", type: "Bus" },
  { from: "Dhaka", to: "Khulna", price: "800", type: "Bus & Train" },
  { from: "Dhaka", to: "Barisal", price: "550", type: "Launch" },
];

const PopularRoutes = () => {
  const navigate = useNavigate(); 
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#E56F61] font-bold tracking-[0.2em] uppercase text-sm"
          >
            Top Destinations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black mt-2 text-base-content"
          >
            Explore <span className="text-[#E56F61]">Popular</span> Routes
          </motion.h2>
          <div className="w-20 h-1.5 bg-[#E56F61] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate("/allTickets")}
              className="group relative bg-base-200 border border-base-300 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:border-[#E56F61]/30 overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#E56F61]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#E56F61] bg-[#E56F61]/10 px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">
                  {route.type}
                </span>

                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <p className="text-xs text-base-content/50 uppercase font-bold mb-1">From</p>
                    <h3 className="text-xl font-black">{route.from}</h3>
                  </div>
                  
                  <div className="flex flex-col items-center flex-1 px-4">
                     <div className="w-full h-[1px] bg-dashed border-t-2 border-dashed border-base-content/20 relative">
                        <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#E56F61] rotate-90" />
                     </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-base-content/50 uppercase font-bold mb-1">To</p>
                    <h3 className="text-xl font-black">{route.to}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-base-content/5">
                  <div>
                    <span className="text-[10px] text-base-content/40 uppercase font-bold">Starting At</span>
                    <p className="text-2xl font-black text-base-content">৳ {route.price}</p>
                  </div>
                  
               
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/allTickets");
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-black hover:bg-[#E56F61] hover:text-white h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-base-100 rounded-full"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-base-100 rounded-full"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularRoutes;