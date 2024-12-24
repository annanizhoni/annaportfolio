import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Masonry from 'react-masonry-css';
import supabase from '../supabaseClient';
import Cart from './Cart'; // Import the Cart component

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const { id } = await response.json();
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="shop-container">
      <h1 className="text-3xl font-barrio text-center my-8">Shop</h1>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex w-auto"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((product) => (
          <div key={product.id} className="p-4 shadow-lg rounded-md">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
            <h2 className="text-lg font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600 my-2">${(product.price / 100).toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-[#00748C] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#005766]"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </Masonry>

      {/* Cart Component */}
      <Cart
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Shop;