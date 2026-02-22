 import React, { useState } from "react";
import { motion } from "framer-motion";
import Categories from "../../../features/categories/components/Categories";
import MenuItems from "../../../features/menu/components/MenuItems";

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(to right bottom, oklch(0.414 0.112 45.904) 0%, oklch(0.279 0.077 45.635) 50%, rgb(0, 0, 0) 100%)",
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center py-8 px-4 sm:py-12 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-amber-400"
          variants={itemVariants}
        >
          Our Menu
        </motion.h1>

        <motion.p
          className="text-amber-100/80 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base"
          variants={itemVariants}
        >
          Browse our delicious offerings! Select a category to find your favorite dishes.
        </motion.p>
      </motion.div>

      {/* Categories */}
      <motion.div
        className="px-4 sm:px-6 mb-6 md:mb-8 overflow-x-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </motion.div>

      {/* Menu Items */}
      <motion.div
        className="px-4 sm:px-6 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MenuItems selectedCategory={selectedCategory} />
      </motion.div>
    </div>
  );
};

export default MenuSection;