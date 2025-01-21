import React, { useEffect } from 'react';

const Shop = () => {
  useEffect(() => {
    // Inject the Ecwid script dynamically
    const script = document.createElement('script');
    script.src = 'https://app.ecwid.com/script.js?111838252&data_platform=code&data_date=2025-01-21';
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    // Configure the Ecwid Product Browser
    script.onload = () => {
      if (window.xProductBrowser) {
        window.xProductBrowser(
          'categoriesPerRow=3',
          'views=grid(20,3) list(60) table(60)',
          'categoryView=grid',
          'searchView=list',
          'id=my-store-111838252'
        );
      }
    };

    return () => {
      // Cleanup: Remove the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="shop-container">
      <h1 className="text-4xl font-barrio text-center my-8">Shop</h1>
      {/* Embedding the Ecwid storefront */}
      <div id="my-store-111838252" className="ecwid-shop-container"></div>
    </div>
  );
};

export default Shop;