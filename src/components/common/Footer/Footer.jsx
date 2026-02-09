 "use client"
 
 /**
  * @file Footer.jsx
  * @description Reusable footer component for the Foodify web app. 
  * Includes brand section, navigation links, newsletter subscription form, 
  * and social media connections. Designed with Tailwind CSS and Framer Motion animations.
  * 
  * @module Components/Footer
  */
 
 import { useState } from "react"
 import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
 import { FaXTwitter } from "react-icons/fa6"
 import { MdEmail, MdArrowForward } from "react-icons/md"
 import { motion } from "framer-motion"
 
 /**
  * Footer Component
  * 
  * Renders the footer of the website containing:
  * - Brand section with a newsletter subscription
  * - Navigation links
  * - Social media icons with hover animations
  * 
  * @component
  * @returns {JSX.Element} Rendered footer section
  */
 const Footer = () => {
   /** @state {string} email - Stores user's input email for newsletter */
   const [email, setEmail] = useState("")
   /** @state {string} isHovered - Tracks which nav link is hovered for icon animation */
   const [isHovered, setIsHovered] = useState("")
 
   /** Navigation links displayed in the footer */
   const navigationLinks = [
     { name: "Home", href: "/" },
     { name: "Menu", href: "/menu" },
     { name: "About Us", href: "/about" },
     { name: "Contact", href: "/contact" },
   ]
 
   /** Social media links with base icon colors */
   const socialLinks = [
     { name: "Facebook", icon: FaFacebookF, href: "#", baseColor: "text-blue-500" },
     { name: "Instagram", icon: FaInstagram, href: "#", baseColor: "text-pink-500" },
     { name: "Twitter", icon: FaXTwitter, href: "#", baseColor: "text-sky-500" },
     { name: "YouTube", icon: FaYoutube, href: "#", baseColor: "text-red-500" },
   ]
 
   /**
    * Handles the newsletter form submission.
    * Logs the email and resets the input field.
    * 
    * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
    */
   const handleSubmit = (e) => {
     e.preventDefault()
     console.log("Email submitted:", email)
     setEmail("")
   }
 
   return (
     <footer
       className="bg-gradient-to-b from-amber-900/20 to-amber-950/40 backdrop-blur-sm border-t border-amber-800/30"
       style={{ backgroundColor: "#2D1B0E" }}
     >
       <div className="max-w-7xl mx-auto px-6 py-12">
         {/* ---------- Main Footer Grid ---------- */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
           {/* ---------- Left Section: Brand + Newsletter ---------- */}
           <div className="space-y-6">
             {/* Brand Logo */}
             <div className="transform hover:scale-105 transition-transform duration-300">
               <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                 Foodify
               </h2>
             </div>
 
             {/* Tagline */}
             <p className="text-gray-300 text-base sm:text-lg leading-relaxed italic">
               Where culinary artistry meets doorstep convenience.
               <br />
               Savor handcrafted perfection, delivered with care.
             </p>
 
             {/* Newsletter Signup Form */}
             <div className="space-y-4">
               <div className="flex items-center gap-2 text-amber-400">
                 <MdEmail className="text-xl" />
                 <h3 className="text-lg sm:text-xl font-semibold">Get Exclusive Offers</h3>
               </div>
 
               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email..."
                   className="flex-1 px-4 py-3 bg-amber-900/20 border border-amber-700/50 rounded-lg 
                            text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 
                            focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 text-sm sm:text-base"
                   required
                 />
 
                 {/* Subscribe Button with Motion Icon */}
                 <button
                   type="submit"
                   className="relative overflow-hidden px-5 sm:px-6 py-3 
                              bg-gradient-to-r from-orange-500 to-amber-600 
                              text-white rounded-lg font-semibold 
                              transition-all duration-300 flex items-center justify-center gap-2
                              shadow-lg text-sm sm:text-base
                              hover:from-red-500 hover:to-orange-600 
                              hover:shadow-red-500/40 hover:scale-105"
                 >
                   Join Now
                   <motion.span
                     animate={{ x: [0, 6, 0] }}
                     transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MdArrowForward className="text-lg" />
                   </motion.span>
                 </button>
               </form>
             </div>
           </div>
 
           {/* ---------- Center Section: Navigation Links ---------- */}
           <div className="space-y-6">
             <h3 className="text-xl sm:text-2xl font-bold text-amber-400 border-l-4 border-amber-500 pl-4">
               Navigation
             </h3>
 
             <nav className="space-y-3">
               {navigationLinks.map((link) => (
                 <a
                   key={link.name}
                   href={link.href}
                   className="flex items-center gap-3 text-gray-300 hover:text-amber-400 
                            transition-all duration-300 group text-base sm:text-lg"
                   onMouseEnter={() => setIsHovered(link.name)}
                   onMouseLeave={() => setIsHovered("")}
                 >
                   <MdArrowForward
                     className={`text-amber-500 transition-transform duration-300 ${
                       isHovered === link.name ? "translate-x-2" : ""
                     }`}
                   />
                   <span className="group-hover:translate-x-1 transition-transform duration-300">
                     {link.name}
                   </span>
                 </a>
               ))}
             </nav>
           </div>
 
           {/* ---------- Right Section: Social Media ---------- */}
           <div className="space-y-6">
             <h3 className="text-xl sm:text-2xl font-bold text-amber-400 border-l-4 border-amber-500 pl-4">
               Social Connect
             </h3>
 
             <div className="flex flex-wrap gap-4 sm:gap-6">
               {socialLinks.map((social) => {
                 const IconComponent = social.icon
                 return (
                   <a
                     key={social.name}
                     href={social.href}
                     className="group relative w-10 h-10 sm:w-12 sm:h-12 bg-amber-900/30 border border-amber-700/50 
                                rounded-full flex items-center justify-center hover:scale-110 
                                transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                   >
                     <IconComponent className={`text-lg sm:text-xl ${social.baseColor}`} />
                     {/* Tooltip on hover */}
                     <span
                       className="absolute top-full mt-2 text-xs text-amber-400 opacity-0 translate-y-1 
                                  group-hover:opacity-100 group-hover:translate-y-0 
                                  transition-all duration-300 ease-out pointer-events-none"
                     >
                       {social.name}
                     </span>
                   </a>
                 )
               })}
             </div>
           </div>
         </div>
 
         {/* ---------- Bottom Footer Note ---------- */}
         <div className="border-t border-amber-800/30 pt-8 text-center space-y-2">
           <p className="text-amber-400 text-base sm:text-lg font-medium">
             © 2025 Foodie-Frenzy. All rights reserved.
           </p>
           <p className="text-gray-400 text-sm sm:text-base">
             Designed by{" "}
             <span className="text-amber-500 hover:text-amber-400 transition-colors duration-300">
               Muzamil Ahmad
             </span>
           </p>
         </div>
       </div>
     </footer>
   )
 }
 
 export default Footer
 