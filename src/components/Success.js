import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleReturnToShop = () => {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');

    // Navigate back to the shop
    navigate('/shop');
  };

  return (
    <div className="success-container flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <div className="max-w-lg p-6 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold text-black mb-4 font-barrio">Thank You</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your purchase was successful. A confirmation has been e-mailed to you.
        </p>
        <p className="text-gray-600 text-sm mb-8">
          If you have any questions, feel free to <a href="/contact" className="text-blue-500 hover:underline">contact me</a>.
        </p>
        <button
          onClick={handleReturnToShop}
          className="bg-[#00748C] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#005766]"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default Success;