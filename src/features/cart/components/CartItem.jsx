 import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  if (!items || items.length === 0)
    return <p className="p-4 text-gray-500">Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center space-x-4">
              <img
                src={item.image || 'https://via.placeholder.com/80'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>Price: ₹{item.discountPrice || item.price}</p>
              </div>
            </div>

            <div className="flex space-x-2 items-center">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => dispatch(decrementQuantity(item._id))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => dispatch(incrementQuantity(item._id))}
              >
                +
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-bold text-xl">Total: ₹{total}</div>

      <div className="mt-4 text-right">
        <button
          onClick={() => navigate('/checkout')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;