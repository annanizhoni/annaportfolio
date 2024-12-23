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
      .select('*');

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
      {/* Headshot */}
      <div className="profile-photo my-8">
        <img
          src="me.jpg"
          alt="Headshot"
          className="rounded-full mx-auto shadow-md"
          style={{ maxWidth: '200px' }}
        />
      </div>

      {/* Description */}
      <div className="flex justify-between mt-4">
        <div className="font-quicksand text-center mx-auto max-w-4xl p-4">
          <p>
            Navajo artist and musician from Park City, Utah working in a wide variety of artistic disciplines, including: <br />
            charcoal realism, oil and acrylic painting, Native American beadwork, illustration, digital art, graphic design, pinstriping, and printmaking.
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="mx-2 md:mx-8 lg:mx-12 mt-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex w-auto"
          columnClassName="my-masonry-grid_column">
          {categories.map((category) => (
            <Link key={category.id} to={`/portfolio/${category.slug}`} className="block w-full mb-4">
              <div className="overflow-hidden shadow-lg">
                <img
                  src={category.cover_image_url}
                  alt={category.name}
                  className="w-full h-auto block transform transition duration-500 hover:scale-105"
                />
                <p className="text-center font-alegreya font-semibold px-2 py-4 mt-2">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Portfolio;