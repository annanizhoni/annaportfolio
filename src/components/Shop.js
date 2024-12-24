import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import supabase from '../supabaseClient';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Fetch addToCart from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="shop-container">
      <h1 className="text-4xl font-barrio text-center my-8">Shop</h1>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex w-auto"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((product) => (
          <div key={product.id} className="p-4 shadow-lg rounded-md">
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto rounded-md"
              />
              <h2 className="text-lg font-alegreya mt-4">{product.name}</h2>
            </Link>
            <p className="text-gray-600 my-2">${(product.price / 100).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)} // Use addToCart from context
              className="bg-[#00748C] text-white text-sm py-2 px-4 rounded-md hover:bg-[#005766] transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Shop;