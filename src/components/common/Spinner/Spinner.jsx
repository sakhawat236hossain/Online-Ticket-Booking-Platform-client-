import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10 relative">
      
      {/* Main Rotating Ring */}
      <motion.div
        className="w-14 h-14 rounded-full border-4 border-t-transparent border-[#E56F61]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />

      {/* Scaling Inner Dot */}
      <motion.div
        className="absolute w-4 h-4 bg-[#E56F61] rounded-full"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
      />

      {/* Glow Pulse */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-[#E56F61]/20 blur-2xl"
        animate={{ scale: [1, 1.5, 1] , opacity: [0.4, 0.8, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Spinner;
