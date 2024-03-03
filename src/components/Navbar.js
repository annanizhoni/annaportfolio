import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#003844] font-alegreya w-full">
      <div className="flex justify-center items-center p-4 mx-auto">
        <ul className={`flex w-full justify-between items-center lg:flex lg:flex-row`}>
          <li className="flex-1 text-center"><Link to="/portfolio" className="text-white py-2 px-4 hover:bg-opacity-20 hover:bg-white hover:text-[#FFD700] transition-all duration-300">Portfolio</Link></li>
          <li className="flex-1 text-center"><Link to="/shop" className="text-white py-2 px-4 hover:bg-opacity-20 hover:bg-white hover:text-[#FFD700] transition-all duration-300">Shop</Link></li>
          <li className="flex-1 text-center"><Link to="/about" className="text-white py-2 px-4 hover:bg-opacity-20 hover:bg-white hover:text-[#FFD700] transition-all duration-300">About</Link></li>
          <li className="flex-1 text-center"><Link to="/contact" className="text-white py-2 px-4 hover:bg-opacity-20 hover:bg-white hover:text-[#FFD700] transition-all duration-300">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;