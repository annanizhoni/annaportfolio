import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); // Hook for navigation

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, value) => {
    if (value === '') {
      updateQuantity(id, 0);
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        updateQuantity(id, parsedValue);
      }
    }
  };

  return (
    <div className="cart-container my-8 p-4 shadow-lg max-w-md mx-auto border rounded-md">
      <h2 className="text-4xl font-bold text-black text-center mb-4 font-barrio">Cart</h2>
      {cart.length === 0 ? (
        <>
          <p className="text-center text-gray-500">Your cart is empty</p>
          <button
            onClick={() => navigate('/shop')} // Navigate to the shop
            className="mt-4 w-full bg-[#00748C] text-white text-sm py-2 px-4 rounded-md hover:bg-[#005766] focus:outline-none focus:ring-2 focus:ring-[#005766]"
          >
            Return to Shop
          </button>
        </>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div>
                  <p className="font-alegreya">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${(item.price / 100).toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="w-12 text-center border border-gray-300 rounded-md focus:ring focus:ring-[#00748C] outline-none"
                    min="0"
                    onDoubleClick={(e) => e.target.select()}
                  />
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm font-medium hover:underline ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-lg font-alegreya">
              Total: ${(calculateTotal() / 100).toFixed(2)}
            </p>
            <button
              className="mt-4 w-full bg-[#00748C] text-white text-sm py-2 px-4 rounded-md hover:bg-[#005766] focus:outline-none focus:ring-2 focus:ring-[#005766] transition"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate('/shop')} // Navigate to the shop
              className="mt-4 w-full bg-gray-500 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 transition"
            >
              Return to Shop
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;