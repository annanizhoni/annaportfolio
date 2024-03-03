import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import supabase from '../supabaseClient';

const Gallery = () => {
  const { categorySlug } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImagesByCategory = async () => {
      setError('');

      const { data: categoriesData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug);

      if (categoryError) {
        setError(`Error fetching category: ${categoryError.message}`);
        console.error('Error fetching category:', categoryError);
        return;
      }

      if (categoriesData.length === 0) {
        setError(`No category found for slug: ${categorySlug}.`);
        return;
      }

      const categoryId = categoriesData[0].id;

      // Include 'slug' in the select query for images
      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('id, title, url, description, slug') // Added 'slug' here
        .eq('category_id', categoryId);

      if (imagesError) {
        setError(`Error fetching images: ${imagesError.message}`);
        console.error('Error fetching images:', imagesError);
        return;
      }

      setImages(imagesData);
    };

    fetchImagesByCategory();
  }, [categorySlug]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <div className="mb-4">
        <Link to="/portfolio" className="inline-flex items-center text-[#00748C] hover:text-[#003844] py-4 px-4 rounded">
          <svg className="mr-2 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          Back
        </Link>
      </div>

      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column">
          {images.map((image) => (
            <div key={image.id} className="image-item rounded-lg overflow-hidden shadow-lg p-2">
              <h4 className="text-lg text-center font-alegreya font-semibold p-2">{image.title}</h4>
              {/* Use image.slug for the URL instead of image.id */}
              <Link to={`/portfolio/${categorySlug}/${image.slug}`}>
                <img src={image.url} alt={image.title} className="w-full h-auto cursor-pointer" />
              </Link>
              <p className="text-center text-sm font-quicksand p-2">{image.description}</p>
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default Gallery;