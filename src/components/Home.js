import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center my-8">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/3a_qljWEl5k?si=E79sBAYIkKubFtUL" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex justify-between mt-4">
        <div className="font-quicksand text-center mx-auto max-w-4xl p-4">
          <p>Member of the Navajo Nation from Utah with a diverse skillset including web development, fine art, classical piano, wilderness survival, and auto mechanics. Community-minded artist who discovered a passion for computer science through Google's UX design course.</p>
        </div>
      </div>
      {/* Slideshow */}
      <div className="flex justify-center mx-auto max-w-4xl p-4">
        <Slider {...settings} className="w-1/2">
          <div>
            <img src="basketstriped.jpg" alt="Image 1" className="w-full h-auto" />
          </div>
          <div>
            <img src="goodmedicine.jpeg" alt="Image 2" className="w-full h-auto" />
          </div>
          <div>
            <img src="bowie.jpg" alt="Image 3" className="w-full h-auto" />
          </div>
          <div>
            <img src="PrayerForBearsEars.JPG" alt="Image 4" className="w-full h-auto" />
          </div>
          <div>
            <img src="SFBeads.jpg" alt="Image 5" className="w-full h-auto" />
          </div>
        </Slider>
      </div>
      </div>
  );
}

export default Home;