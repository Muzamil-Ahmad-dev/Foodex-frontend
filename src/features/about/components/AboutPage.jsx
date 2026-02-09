 /**
  * @file AboutPage.jsx
  * @description
  * This component renders the **About Page** of the application, providing an overview
  * of the brand’s story, unique features, team members, and achievements.
  *
  * It includes:
  * - Animated counters for key stats
  * - A feature highlight section
  * - Team (Chefs) showcase with social media interactions
  * - Smooth entrance and hover animations powered by Framer Motion
  *
  * @module Pages/AboutPage
  * @author 
  * Muzamil Ahmad
  *
  * @dependencies
  * - React & React Hooks (useState, useEffect)
  * - Framer Motion for animations
  * - React Icons for UI icons
  * - Tailwind CSS for styling
  * - Custom Components: ., Footer
  */
 
 import React, { useState, useEffect } from "react"
 import { motion } from "framer-motion"
 import {
   FaTruck,
   FaUtensils,
   FaLeaf,
   FaTwitter,
   FaInstagram,
   FaFacebookF,
   FaLinkedinIn,
 } from "react-icons/fa"
 
 
 export default function AboutPage() {
   /**
    * ------------------------------------------
    *   COUNTER STATE & ANIMATION
    * ------------------------------------------
    * State values for animated stats (e.g. customers, satisfaction, etc.)
    * These values gradually increase using an interval animation effect.
    */
   const [counters, setCounters] = useState({
     customers: 0,
     satisfaction: 0,
     cities: 0,
     support: 24, // static (non-animated)
   })
 
   /**
    * useEffect → Counter Animation
    * Runs once on mount.
    * Gradually increments numbers over a fixed duration (2s)
    * to give a smooth counting animation effect for statistics.
    */
   useEffect(() => {
     const targets = { customers: 10, satisfaction: 98, cities: 500, support: 24 }
     const duration = 2000 // total duration in ms
     const steps = 60 // number of steps for animation smoothness
     const stepDuration = duration / steps
     let currentStep = 0
 
     const timer = setInterval(() => {
       currentStep++
       const progress = currentStep / steps
 
       setCounters({
         customers: Math.floor(targets.customers * progress),
         satisfaction: Math.floor(targets.satisfaction * progress),
         cities: Math.floor(targets.cities * progress),
         support: targets.support,
       })
 
       if (currentStep >= steps) {
         clearInterval(timer)
         setCounters(targets)
       }
     }, stepDuration)
 
     return () => clearInterval(timer)
   }, [])
 
   /**
    * ------------------------------------------
    *    FEATURE LIST
    * ------------------------------------------
    * Highlights the company’s top differentiators (e.g. Delivery, Quality)
    */
   const features = [
     {
       title: "Instant Delivery",
       description: "Lightning-fast delivery service across the city",
       icon: <FaTruck size={36} className="text-amber-300" />,
     },
     {
       title: "Master Chefs",
       description: "World-class chefs and culinary experts",
       icon: <FaUtensils size={36} className="text-amber-300" />,
     },
     {
       title: "Premium Quality",
       description: "Only the finest ingredients and preparation",
       icon: <FaLeaf size={36} className="text-amber-300" />,
     },
   ]
 
   /**
    * ------------------------------------------
    *      CHEFS DATA
    * ------------------------------------------
    * Team showcase data with image, role, and social profiles.
    */
   const chefs = [
     {
       name: "Marco Yansen",
       title: "Michelin-starred Chef | Italian cuisine specialist",
       image: "/Marco-Yansen.png",
       social: ["twitter", "instagram", "facebook", "linkedin"],
     },
     {
       name: "Thomas Wenrich",
       title: "Culinary Champion | Flavor alchemy expert",
       image: "/Thomas-Wenrich.jpg",
       social: ["twitter", "instagram", "facebook", "linkedin"],
     },
     {
       name: "Akash Trivedi",
       title: "5th generation chef | Traditional techniques",
       image: "/Akash-Trivedi.png",
       social: ["twitter", "instagram", "facebook", "linkedin"],
     },
   ]
 
   /**
    * ------------------------------------------
    *     STATS SECTION
    * ------------------------------------------
    * Displays animated counters for key metrics.
    */
   const stats = [
     { value: counters.customers, suffix: "M+", label: "CUSTOMERS", icon: <FaTruck size={22} /> },
     { value: counters.satisfaction, suffix: "%", label: "SATISFACTION RATE", icon: <FaUtensils size={22} /> },
     { value: counters.cities, suffix: "+", label: "CITIES", icon: <FaLeaf size={22} /> },
     { value: counters.support, suffix: "/7", label: "SUPPORT", icon: <FaTwitter size={22} /> },
   ]
 
   /**
    * Social icon mapping for dynamic rendering.
    */
   const socialIcons = {
     twitter: <FaTwitter size={14} />,
     instagram: <FaInstagram size={14} />,
     facebook: <FaFacebookF size={14} />,
     linkedin: <FaLinkedinIn size={14} />,
   }
 
   /**
    * ------------------------------------------
    *        ANIMATION VARIANTS
    * ------------------------------------------
    * Predefined animation patterns used throughout the page.
    */
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.2 },
     },
   }
 
   const itemVariants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.6, ease: "easeOut" },
     },
   }
 
   const cardHoverVariants = {
     hover: {
       scale: 1.05,
       transition: { duration: 0.3, ease: "easeInOut" },
     },
   }
 
   // ------------------------------------------
   //           PAGE STRUCTURE
   // ------------------------------------------
   return (
     <div className="min-h-screen" style={{ backgroundColor: "#3D2914" }}>
 
       {/* ===============================
               HERO SECTION
       =============================== */}
       <motion.div
         className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-16"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
       >
         <motion.h1
           className="text-6xl md:text-7xl font-bold mb-6"
           style={{ color: "#F59E0B" }}
           initial={{ opacity: 0, y: -50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
         >
           About Us
         </motion.h1>
 
         <motion.p
           className="text-xl text-amber-100 max-w-2xl mx-auto"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
         >
           Discover our journey, our passion, and the talented chefs behind our success.
         </motion.p>
       </motion.div>
 
       {/* ===============================
               FEATURES SECTION
       =============================== */}
       <motion.div
         className="container mx-auto px-6 py-16"
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.3 }}
       >
         <div className="grid md:grid-cols-3 gap-8">
           {features.map((feature) => (
             <motion.div
               key={feature.title}
               className="rounded-xl p-6 text-center shadow-lg border border-orange-600/30"
               style={{ backgroundColor: "rgba(120, 53, 15, 0.6)" }}
               variants={itemVariants}
               whileHover="hover"
               {...cardHoverVariants}
             >
               <div className="mb-4 flex justify-center">{feature.icon}</div>
               <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
               <p className="text-amber-100/80 text-sm">{feature.description}</p>
             </motion.div>
           ))}
         </div>
       </motion.div>
 
       {/* ===============================
               STATS SECTION
       =============================== */}
       <motion.div
         className="container mx-auto px-6 py-16"
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.3 }}
       >
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {stats.map((stat, index) => (
             <motion.div
               key={stat.label}
               className="rounded-xl p-6 text-center border border-orange-600/30"
               style={{ backgroundColor: "rgba(120, 53, 15, 0.4)" }}
               variants={itemVariants}
               whileHover="hover"
               {...cardHoverVariants}
             >
               <motion.div
                 className="mb-2 flex justify-center text-orange-400"
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 {stat.icon}
               </motion.div>
 
               <motion.div
                 className="text-3xl font-bold text-white mb-2"
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ duration: 0.8, delay: index * 0.2 }}
               >
                 {stat.value}
                 {stat.suffix}
               </motion.div>
 
               <div className="text-sm text-amber-100/70 font-medium tracking-wider">
                 {stat.label}
               </div>
             </motion.div>
           ))}
         </div>
       </motion.div>
 
       {/* ===============================
                CHEFS SECTION
       =============================== */}
       <motion.div
         className="container mx-auto px-6 py-16"
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.3 }}
       >
         <motion.h2
           className="text-4xl font-bold text-center mb-16 text-white"
           variants={itemVariants}
         >
           Meet Our <span style={{ color: "#F59E0B" }}>Culinary Artists</span>
         </motion.h2>
 
         <div className="grid md:grid-cols-3 gap-8">
           {chefs.map((chef, index) => (
             <motion.div
               key={chef.name}
               className="rounded-xl overflow-hidden shadow-lg border border-orange-600/30 flex flex-col"
               style={{ backgroundColor: "rgba(120, 53, 15, 0.6)" }}
               variants={itemVariants}
               whileHover="hover"
               {...cardHoverVariants}
             >
               {/* Chef Image */}
               <div className="relative w-full h-72">
                 <img
                   src={chef.image}
                   alt={chef.name}
                   className="w-full h-full object-contain bg-black"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent"></div>
               </div>
 
               {/* Chef Info */}
               <div className="p-6 text-center flex flex-col flex-grow">
                 <h3 className="text-xl font-bold text-white mb-2">{chef.name}</h3>
                 <p className="text-amber-100/80 mb-4 text-sm">{chef.title}</p>
 
                 {/* Social Icons */}
                 <div className="flex justify-center gap-3 mt-auto">
                   {chef.social.map((platform, socialIndex) => (
                     <motion.button
                       key={platform}
                       className="w-8 h-8 rounded-full flex items-center justify-center"
                       whileHover={{
                         scale: 1.2,
                         rotate: 360,
                         backgroundColor: "rgba(245, 158, 11, 0.8)",
                       }}
                       transition={{ duration: 0.3 }}
                       initial={{ opacity: 0, scale: 0 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       style={{
                         backgroundColor: "rgba(245, 158, 11, 0.5)",
                         transitionDelay: `${socialIndex * 0.1}s`,
                       }}
                     >
                       {socialIcons[platform]}
                     </motion.button>
                   ))}
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </motion.div>
 
     </div>
   )
 }
 