import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArtDetail from './components/ArtDetail';
import Success from './components/Success';
import Failure from './components/Failure';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
            {/* Keep this route as is for categorySlug */}
            <Route path="/portfolio/:categorySlug" element={<Gallery />} />
            {/* Update route to use :imageSlug for ArtDetail component */}
            <Route path="/portfolio/:categorySlug/:imageSlug" element={<ArtDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
