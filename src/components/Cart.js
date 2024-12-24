import React from 'react';

const Cart = ({ cart, handleRemoveFromCart, handleCheckout }) => {
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container my-8 p-4 shadow-lg max-w-md mx-auto border rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${(item.price * item.quantity / 100).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 text-sm font-medium hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-lg font-bold">
              Total: ${(calculateTotal() / 100).toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-[#00748C] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#005766] focus:outline-none focus:ring-2 focus:ring-[#005766]"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;