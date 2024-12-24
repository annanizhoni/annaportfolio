import React from 'react';
import { useNavigate } from 'react-router-dom';

const Failure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/shop'); // Redirect to the shop for retrying the purchase
  };

  return (
    <div className="failure-container flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <div className="max-w-lg p-6 bg-white shadow-md rounded-md">
        <p className="text-gray-700 text-lg mb-6">
          Unfortunately, your payment was not successful.
        </p>
        <p className="text-gray-600 text-sm mb-8">
          Please try again or <a href="/contact" className="text-blue-500 hover:underline">contact me</a> for assistance.
        </p>
        <button
          onClick={handleRetry}
          className="bg-[#00748C] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#005766] transition"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
};

export default Failure;