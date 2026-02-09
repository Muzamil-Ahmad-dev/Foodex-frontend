 /**
 * @file Hero.jsx
 * @description Hero section component for the Food Delivery App.
 * Displays animated heading text, search bar, and orbiting food images around a central hero image.
 * Built with React, Framer Motion, and Tailwind CSS for smooth animations and responsive design.
 *
 * @component
 * @example
 * // Usage:
 * <Hero />
 *
 * @author Muzamil Ahmad 
 * @created 2025-10-12
 * @lastModified 2025-10-12
 */

import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

/**
 * Hero Component
 * @description Displays the homepage hero section with animated text, a search form, and rotating food images.
 * @returns {JSX.Element} The rendered hero component.
 */
export default function Hero() {
  /**
   * @constant orbitImages
   * @description Array of food images used to orbit around the center hero image.
   * @type {Array<{src: string, offset: number}>}
   */
  const orbitImages = [
    { src: "/ChickenChargha.png", offset: 0 },
    { src: "/BreakfastBurrito.png", offset: 90 },
    { src: "/BeefBourguignon.png", offset: 180 },
    { src: "/ChickenTikka.png", offset: 270 },
  ];

  /**
   * @function getRadius
   * @description Determines the orbit radius dynamically based on current screen width.
   * @returns {number} Radius in pixels.
   */
  const getRadius = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 200; // Large screens (lg+)
      if (window.innerWidth >= 768) return 160;  // Medium screens (md)
      if (window.innerWidth >= 640) return 120;  // Small screens (sm)
      return 80;                                 // Extra small (base)
    }
    return 100;
  };

  const radius = getRadius();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-700 via-orange-800 to-amber-900 overflow-hidden flex items-center">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* ===========================
               Left Section - Text + Search
          ============================ */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Heading Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                We&apos;re Serious
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 leading-tight">
                For Food &
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 leading-tight">
                Delivery
              </h2>
            </motion.div>

            {/* Subheading Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-amber-100 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Best cooks and best delivery guys all at your service. Hot tasty
              food will reach you in 60 minutes.
            </motion.p>

            {/* Search Form */}
            <motion.form
              onSubmit={(e) => e.preventDefault()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {/* Search Input */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  aria-label="Search meals"
                  placeholder="Discover your next favorite meal..."
                  className="pl-12 pr-4 py-3 sm:py-4 w-full rounded-xl text-base sm:text-lg bg-amber-50 border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-amber-900 placeholder:text-amber-600 outline-none shadow-md"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg bg-yellow-400 hover:bg-yellow-500 rounded-xl text-amber-900 font-semibold shadow-lg transition-all duration-300"
              >
                Search
              </button>
            </motion.form>
          </div>

          {/* ===========================
               Right Section - Orbit Animation
          ============================ */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-[220px] sm:w-[350px] md:w-[450px] lg:w-[600px] aspect-square">

              {/* Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-orange-400/30 z-0"></div>
              <div className="absolute inset-2 sm:inset-4 md:inset-6 lg:inset-12 rounded-full border border-orange-300/20 z-0"></div>
              <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-24 rounded-full border border-orange-200/10 z-0"></div>

              {/* Orbiting Food Images */}
              {orbitImages.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                >
                  <motion.div
                    className="absolute"
                    style={{ transformOrigin: "50% 50%" }}
                    animate={{
                      rotate: [item.offset, 360 + item.offset],
                      scale: [0.7, 1, 0.7],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 24,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={item.src}
                      alt="Food item"
                      className="w-10 sm:w-14 md:w-20 lg:w-28 h-10 sm:h-14 md:h-20 lg:h-28 rounded-full shadow-lg"
                      style={{ transform: `translateX(${radius}px)` }}
                    />
                  </motion.div>
                </motion.div>
              ))}

              {/* Central Hero Image */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="relative">
                  <div className="w-28 sm:w-36 md:w-48 lg:w-64 h-28 sm:h-36 md:h-48 lg:h-64 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-2xl" />
                  <div className="absolute inset-1 sm:inset-2 md:inset-4 lg:inset-6 bg-white rounded-full overflow-hidden shadow-xl">
                    <img
                      src="/BannerImage.png"
                      alt="Hero main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Dots */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-32 left-20 w-3 h-3 bg-orange-400 rounded-full opacity-50"
      />
    </div>
  );
}
