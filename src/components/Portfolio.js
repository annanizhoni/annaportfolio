import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import supabase from '../supabaseClient';

const Portfolio = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let { data, error } = await supabase
      .from('categories')
      .select('*'); // Make sure your select query includes the slug column

    if (error) console.log('error', error);
    else setCategories(data);
  };

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <div className="Portfolio">
      <h2 className='text-3xl font-bold text-gray-800 mb-4 font-barrio text-center py-2 md:py-6'>Portfolio</h2>
      <div className="mx-2 md:mx-8 lg:mx-12">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex w-auto"
          columnClassName="my-masonry-grid_column">
          {categories.map((category) => (
            // Use the slug directly from your data
            <Link key={category.id} to={`/portfolio/${category.slug}`}
                  className="block w-full mb-4">
              <div className="overflow-hidden shadow-lg">
                <img src={category.cover_image_url} alt={category.name} className="w-full h-auto block transform transition duration-500 hover:scale-105" />
                <p className="text-center font-alegreya font-semibold px-2 py-4 mt-2">{category.name}</p>
              </div>
            </Link>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Portfolio;
