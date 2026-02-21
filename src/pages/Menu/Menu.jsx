  import React, { useState } from 'react';
import Categories from '../../features/categories/components/Categories';
import MenuItems from '../../features/menu/components/MenuItems';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold p-4">Our Menu</h1>
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <MenuItems selectedCategory={selectedCategory} />
    </div>
  );
};

export default Menu;  