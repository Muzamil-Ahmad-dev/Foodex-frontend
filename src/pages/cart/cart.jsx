 import React from 'react';
import CartItems from '../../features/cart/components/CartItem';

const Cart = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold p-4">Your Cart</h1>
      <CartItems />
    </div>
  );
};

export default Cart;