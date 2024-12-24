import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Ensure correct hook is imported
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { cart } = useCart(); // Get cart from context
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-4 right-4 z-50">
      <Link to="/cart" className="relative">
        {/* Styled Shopping Cart Icon */}
        <FaShoppingCart className="text-3xl text-white fill-white stroke-black stroke-[7]" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
