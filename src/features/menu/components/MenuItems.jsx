 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../../menu/menuSlice';
import { addToCart } from '../../cart/cartSlice'; // correct import

const MenuItems = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  if (loading) return <p className="p-4 text-gray-600">Loading menu...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!items || items.length === 0)
    return <p className="p-4 text-gray-500">No menu items available.</p>;

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category?._id === selectedCategory)
    : items;

  if (filteredItems.length === 0)
    return <p className="p-4 text-gray-500">No items in this category.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {filteredItems.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200"
        >
          <img
            src={item.image || 'https://via.placeholder.com/300x200'}
            alt={item.name}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-sm text-gray-600">{item.description || 'No description'}</p>
          <p className="mt-2 font-semibold">Price: ₹{item.discountPrice || item.price}</p>
          <p className="text-sm mt-1 text-gray-500">
            {item.isVeg ? 'Veg' : 'Non-Veg'} • Spice: {item.spiceLevel || 'N/A'}
          </p>

          <button
            className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            onClick={() => dispatch(addToCart(item))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;