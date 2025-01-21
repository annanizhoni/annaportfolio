import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import supabase from '../supabaseClient';

const ArtDetail = () => {
  const { imageSlug } = useParams(); // Assuming your route parameter is named imageSlug
  const [artDetail, setArtDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categorySlug, setCategorySlug] = useState('');

  useEffect(() => {
    const fetchArtDetail = async () => {
      setIsLoading(true);

      // Fetch art details by image slug
      const { data, error } = await supabase
        .from('images')
        .select(`
          id, 
          title, 
          url, 
          detaileddesc, 
          size, 
          medium, 
          category_id, 
          categories (name, slug), 
          year,
          slug
        `)
        .eq('slug', imageSlug)
        .single();

      if (error) {
        console.error('Error fetching art details:', error.message);
        setIsLoading(false);
        return;
      }

      setArtDetail(data);
      setCategorySlug(data.categories.slug);
      setIsLoading(false);
    };

    fetchArtDetail();
  }, [imageSlug]);

  // Slider settings remain the same
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (isLoading) return <div>Loading...</div>;
  if (!artDetail) return <div>Art detail not found.</div>;

  return (
    <div className="p-4">
      <Link to={`/portfolio/${categorySlug}`} className="inline-flex items-center text-[#00748C] hover:text-[#003844] py-4 px-4 rounded">
        <svg className="mr-2 h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Gallery
      </Link>
      <h2 className="text-2xl font-bold my-2 text-center font-alegreya">{artDetail.title}</h2>
      <img src={artDetail.url} alt={artDetail.title} className="mx-auto max-w-full max-h-96 w-auto h-auto object-contain" />
      <p className='my-2 text-center'>{artDetail.year}</p>
      <p className="my-2 text-center italic">{artDetail.size}</p>
      <p className="my-2 text-center italic">{artDetail.medium}</p>
      <p className="my-2 text-center">{artDetail.detaileddesc}</p>
    </div>
  );
};

export default ArtDetail;