import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import CategoryPage from './components/CategoryPage'; // Import the new page
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio/:categorySlug" element={<CategoryPage />} /> {/* New route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;