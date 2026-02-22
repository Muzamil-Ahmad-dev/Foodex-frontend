 import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "../../menu/menuSlice";
import { addToCart } from "../../cart/cartSlice";
import { motion } from "framer-motion";
import { Flame, Leaf, Drumstick } from "lucide-react";

const MenuItems = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  if (loading) return <p className="p-4 text-gray-400">Loading menu...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!items || items.length === 0)
    return <p className="p-4 text-gray-500">No menu items available.</p>;

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category?._id === selectedCategory)
    : items;

  if (filteredItems.length === 0)
    return <p className="p-4 text-gray-500">No items in this category.</p>;

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4"
      initial="hidden"
      animate="visible"
    >
      {filteredItems.map((item) => (
        <motion.div
          key={item._id}
          className="bg-[#3D2914]/70 rounded-xl overflow-hidden shadow-lg border border-orange-600/30 flex flex-col"
          whileHover={{ scale: 1.05 }}
        >
          {/* Image */}
          <div className="relative w-full h-56">
            <img
              src={item.image || "https://via.placeholder.com/400x300"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col flex-grow text-white">
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>

            <p className="text-sm text-amber-100/80 mb-3">
              {item.description || "No description"}
            </p>

            {/* Price */}
            <p className="font-semibold mb-2 text-amber-300">
              Rs. {item.discountPrice || item.price}
            </p>

            {/* Type + Spice */}
            <div className="flex items-center gap-4 text-sm text-amber-200 mb-4">
              {/* Veg / Non-Veg */}
              <div className="flex items-center gap-1">
                {item.isVeg ? (
                  <>
                    <Leaf size={16} className="text-green-400" />
                    <span>Veg</span>
                  </>
                ) : (
                  <>
                    <Drumstick size={16} className="text-red-400" />
                    <span>Non-Veg</span>
                  </>
                )}
              </div>

              {/* Spice Level */}
              <div className="flex items-center gap-1">
                <Flame size={16} className="text-orange-400" />
                <span className="capitalize">
                  {item.spiceLevel || "N/A"}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-auto bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-2 rounded shadow-md"
              onClick={() => dispatch(addToCart(item))}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuItems;