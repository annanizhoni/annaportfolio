import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Portfolio from './components/Portfolio';
import Shop from './components/Shop';
import Cart from './components/Cart';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './components/Success';
import Failure from './components/Failure';
import ProductDetail from './components/ProductDetail'; // Import the ProductDetail component
import CartIcon from './components/CartIcon'; // Import CartIcon

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <CartIcon /> {/* Add CartIcon here for global visibility */}
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop/:productId" element={<ProductDetail />} /> {/* Product detail route */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failure" element={<Failure />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;