import React, { useState } from 'react';
import supabase from '../supabaseClient'; // Ensure the correct path to your Supabase client

const githubIcon = '/icon-_github_.svg';
const emailIcon = '/email.svg';

function Footer() {
  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupError, setIsPopupError] = useState(false); // To differentiate success and error pop-ups

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Reset previous popup state
    setPopupMessage('');
    setIsPopupError(false);

    try {
      const { error } = await supabase.from('newsletter').insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Assuming duplicate key error for unique constraint
          throw new Error('You are already subscribed.');
        }
        throw error;
      }

      // Reset input and show success pop-up
      setEmail('');
      setPopupMessage('Thank you for subscribing');
      setIsPopupError(false); // This is a success
    } catch (error) {
      console.error('Error signing up for newsletter:', error.message);
      setPopupMessage(error.message || 'Failed to sign up. Please try again.');
      setIsPopupError(true); // This is an error
    }
  };

  return (
    <footer className="flex flex-col lg:flex-row justify-between items-center p-5 bg-[#00748C] text-white mt-5 font-quicksand">
      <div className="mb-5 lg:mb-0">
        <p>&copy; {new Date().getFullYear()} Anna Nizhoni</p>
      </div>

      {/* Newsletter Sign-up */}
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col lg:flex-row items-center mb-5 lg:mb-0">
        <input
          type="email"
          placeholder="Sign up for my monthly newsletter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 text-sm rounded-md text-black lg:mr-2 mb-2 lg:mb-0 w-80" // Adjust width here
        />
        <button type="submit" className="px-4 py-2 text-sm bg-[#003844] text-white rounded-md hover:bg-[#005766]">
          Subscribe
        </button>
      </form>

      {/* Pop-up for Success/Failure */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-lg p-8 text-center ${isPopupError ? 'border-red-500' : 'border-green-500'} border`}>
            <p className={`text-lg font-semibold mb-4 ${isPopupError ? 'text-black' : 'text-black'}`}>
              {popupMessage}
            </p>
            <button
              onClick={() => setPopupMessage('')}
              className="px-4 py-2 bg-[#003844] text-white rounded-md hover:bg-[#005766]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Social Icons */}
      <div className="flex justify-end lg:mt-0 mt-5">
        <a href="https://github.com/annanizhoni" target="_blank" rel="noopener noreferrer" className="mr-10 last:mr-0">
          <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
        </a>
        <a
          href="mailto:hello@annanizhoni.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-10 last:mr-0"
        >
          <img src={emailIcon} alt="Email" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;