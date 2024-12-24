import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import supabase from '../supabaseClient';
import { useCart } from '../context/CartContext'; // Import useCart for adding to cart
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Destructure addToCart from cart context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-8">Product not found.</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-detail-container mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-alegreya text-center mb-8">{product.name}</h1>
      <Slider {...settings} className="mb-8">
        {(product.images || []).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} ${index + 1}`}
            className="w-full h-auto object-contain"
          />
        ))}
      </Slider>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-alegreya mb-4">
        Price: ${(product.price / 100).toFixed(2)}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => addToCart(product)}
          className="bg-[#00748C] text-white text-sm py-2 px-4 rounded-md hover:bg-[#005766] transition"
        >
          Add to Cart
        </button>
        <Link
          to="/shop"
          className="bg-gray-500 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;