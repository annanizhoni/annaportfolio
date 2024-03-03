import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import supabase from '../supabaseClient';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(''); // State to store email input

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const { error } = await supabase
        .from('mailing_list') // Assuming your table is named 'mailing_list'
        .insert([{ email: email }]);

      if (error) {
        throw error;
      }

      // Provide feedback and reset the input field
      alert('Thank you for joining my mailing list!');
      setEmail(''); // Reset email input after successful submission
    } catch (error) {
      alert(error.message);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      {/* The rest of your component remains unchanged */}
      
      {/* Updated section with onSubmit handler for email form */}
      <div className="flex justify-center items-center my-8">
        <div className="text-center p-4 shadow-lg max-w-md">
          <h3 className="text-lg font-semibold mb-4">Shop is currently sold out.</h3>
          <p className="mb-4">Please join the mailing list to be notified when new items are available.</p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your e-mail address"
              className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00748C] focus:border-transparent w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-[#00748C] rounded-md hover:bg-[#005766] focus:outline-none focus:ring-2 focus:ring-[#005766]"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shop;
