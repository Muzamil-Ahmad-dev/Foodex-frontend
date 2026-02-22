 import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../categoriesSlice";
import { motion } from "framer-motion";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading)
    return <p className="p-4 text-gray-300 text-center">Loading categories...</p>;
  if (error)
    return <p className="p-4 text-red-400 text-center">Error: {error}</p>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="flex space-x-3 sm:space-x-4 overflow-x-auto py-4 px-2 sm:px-4 md:px-6 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-transparent"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* All Category */}
      <motion.div
        key="all"
        className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer font-semibold text-gray-900 shadow-md 
          ${
            selectedCategory === null
              ? "bg-amber-400 text-white"
              : "bg-amber-200 hover:bg-amber-300"
          }`}
        onClick={() => setSelectedCategory(null)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        variants={itemVariants}
      >
        All
      </motion.div>

      {categories.map((cat) => (
        <motion.div
          key={cat._id}
          className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg cursor-pointer font-semibold text-gray-900 shadow-md 
            ${
              selectedCategory === cat._id
                ? "bg-amber-400 text-white"
                : "bg-amber-200 hover:bg-amber-300"
            }`}
          onClick={() => setSelectedCategory(cat._id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          {cat.name}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Categories;