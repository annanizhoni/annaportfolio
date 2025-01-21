import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Masonry from 'react-masonry-css'; // Masonry layout
import supabase from '../supabaseClient';

const CategoryPage = () => {
  const { categorySlug } = useParams(); // Get categorySlug from the URL
  const [artworks, setArtworks] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryArtworks = async () => {
      setIsLoading(true);

      // Fetch the category by its slug
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name') // Fetch category ID and name
        .eq('slug', categorySlug) // Match the slug from the URL
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError.message);
        setIsLoading(false);
        return;
      }

      setCategoryName(categoryData.name);

      // Fetch all images belonging to the category
      const { data: artworksData, error: artworksError } = await supabase
        .from('images')
        .select('id, title, url, medium, year, slug') // Only select required fields
        .eq('category_id', categoryData.id); // Match category_id to the fetched category

      if (artworksError) {
        console.error('Error fetching artworks:', artworksError.message);
        setIsLoading(false);
        return;
      }

      setArtworks(artworksData);
      setIsLoading(false);
    };

    fetchCategoryArtworks();
  }, [categorySlug]);

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (artworks.length === 0)
    return <div className="text-center py-4">No artworks found for this category.</div>;

  return (
    <div className="CategoryPage px-4 py-6">
      {/* Back to Portfolio Link */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-700 py-2 px-3 rounded"
      >
        <svg
          className="mr-2 h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Portfolio
      </Link>

      {/* Category Name */}
      <h1 className="text-4xl font-bold text-center my-6 font-barrio">{categoryName}</h1>

      {/* Masonry Layout for Artworks */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {artworks.map((art) => (
          <Link
            to={`/artwork/${art.slug}`}
            key={art.id}
            className="shadow-lg rounded-md overflow-hidden mb-4"
          >
            <img
              src={art.url}
              alt={art.title}
              className="w-full h-auto block transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center font-alegreya">{art.title}</h2>
              <p className="text-sm italic text-center">{art.medium}</p>
              <p className="text-sm text-center">{art.year}</p>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
};

export default CategoryPage;