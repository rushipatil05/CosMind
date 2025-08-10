import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";
import 'remixicon/fonts/remixicon.css'

export default function QuoteSection({ setCurrentState }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-10 m-[2vw] text-center transition-all duration-300 max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top-left comma */}
      <motion.div
        animate={isHovered ? { x: 15, y: 20 } : { x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="absolute top-[-30px] left-[-20px] text-white/10 pointer-events-none"
      >
        <i className="ri-double-quotes-l rotate-180 text-[5vw] text-white"></i>
      </motion.div>

      {/* Bottom-right comma */}
      <motion.div
        animate={isHovered ? { x: -15, y: -20 } : { x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="absolute bottom-[-20px] right-[-10px] text-white/10 pointer-events-none"
      >
        <i className="ri-double-quotes-r rotate-180 text-[5vw] text-white"></i>
      </motion.div>

      {/* Quote Text */}
      <p className="text-2xl md:text-3xl text-gray-200 font-semibold relative z-10 leading-relaxed italic">
        The mind is everything. What you think you become.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => setCurrentState('quiz')}
        className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl shadow-md text-base font-semibold hover:scale-105 transition-transform cursor-pointer"
      >
        Start Assessment
      </button>
    </div>
  );
}
