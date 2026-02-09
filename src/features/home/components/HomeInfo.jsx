 /**
 * @file HomeAbout.jsx
 * @description "About" section for the Foodify homepage — introduces the brand’s culinary philosophy,
 * highlights unique features, and includes animation effects using Framer Motion.
 * 
 * @module Components/HomeAbout
 */

import React from "react"
import { FaBolt, FaClock, FaCalendarAlt, FaFire, FaSearch } from "react-icons/fa"
import { motion } from "framer-motion"

/**
 * HomeAbout Component
 * 
 * Displays the “About” section with:
 * - Animated chef image
 * - Headline and tagline
 * - Inspirational quote
 * - Animated feature icons
 * - Call-to-action button
 * 
 * @component
 * @returns {JSX.Element} Rendered section element
 */
export default function HomeAbout() {
  /**
   * @constant {Array<Object>} features
   * List of unique selling points with icons, titles, and descriptions.
   */
  const features = [
    { icon: FaBolt, title: "Instant Ordering", desc: "Seamless digital experience", bg: "bg-orange-500" },
    { icon: FaClock, title: "Always Open", desc: "24/7 premium service", bg: "bg-pink-500" },
    { icon: FaCalendarAlt, title: "Exclusive Booking", desc: "Priority reservations", bg: "bg-teal-500" },
    { icon: FaFire, title: "Signature Dishes", desc: "Chef's special creations", bg: "bg-purple-500" },
  ]

  return (
    <section className="bg-gradient-to-br from-amber-900 via-amber-950 to-black py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* ---------- Left Section: Chef Image ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative bg-gradient-to-br from-amber-800/20 to-black/40 rounded-3xl p-8 backdrop-blur-sm border border-amber-700/30">
            <img
              src="AboutImage.png"
              alt="Chef with roasted chicken"
              className="w-full max-w-md h-auto object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* ---------- Right Section: Content ---------- */}
        <div className="text-center lg:text-left space-y-8">
          
          {/* Heading & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-amber-400 leading-tight italic font-light">
              Epicurean Elegance
            </h2>
            <p className="text-xl md:text-2xl text-white font-light tracking-wide">
              Where Flavors Dance & Memories Bloom
            </p>
          </motion.div>

          {/* Inspirational Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-l-4 border-amber-500 pl-6 py-4 bg-black/20 rounded-r-lg"
          >
            <p className="text-amber-100 italic text-lg leading-relaxed">
              "In our kitchen, passion meets precision. We craft not just meals, 
              but culinary journeys that linger on the palate and in the heart."
            </p>
          </motion.blockquote>

          {/* ---------- Feature Icons Section ---------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 mt-12"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-3"
                >
                  {/* Animated Icon */}
                  <motion.div
                    className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mx-auto`}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-amber-300 text-lg font-serif italic">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ---------- Call to Action (CTA) Button ---------- */}
          <motion.div
            className="flex justify-center lg:justify-start mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white 
                         px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl 
                         transition-all duration-300"
            >
              <FaSearch className="w-5 h-5" />
              Unveil Our Legacy
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
