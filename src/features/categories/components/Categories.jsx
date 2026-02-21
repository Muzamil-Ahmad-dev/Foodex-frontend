 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../categoriesSlice';

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      <div
        className={`px-4 py-2 rounded-lg shadow cursor-pointer ${
          selectedCategory === null ? 'bg-yellow-300' : 'bg-yellow-100 hover:bg-yellow-200'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </div>
      {categories.map((cat) => (
        <div
          key={cat._id}
          className={`px-4 py-2 rounded-lg shadow cursor-pointer ${
            selectedCategory === cat._id ? 'bg-yellow-300' : 'bg-yellow-100 hover:bg-yellow-200'
          }`}
          onClick={() => setSelectedCategory(cat._id)}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;