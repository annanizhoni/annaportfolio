import React, { useState } from 'react';
import supabase from '../supabaseClient';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);
      if (error) {
        throw error;
      }

      setName('');
      setEmail('');
      setMessage('');
      setSuccessMessage('Message sent successfully. I will respond within 24 hours. Thank you!');
    } catch (error) {
      setError(error.message || 'An error occurred while sending the message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container mx-auto py-12">
        <div className="contact-container max-w-lg mx-auto bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-barrio">Contact</h1>
          {successMessage && <p className="text-green-600 mb-4 font-quicksand">{successMessage}</p>}
          {error && <p className="text-red-600 mb-4 font-quicksand">{error}</p>}
          <div className="contact-form font-quicksand">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-input mt-1 block w-full border-gray-300 focus:ring-[#00748C] focus:border-[#00748C]" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="form-input mt-1 block w-full border-gray-300 focus:ring-[#00748C] focus:border-[#00748C]" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-600">Message</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="Enter your message" className="form-textarea mt-1 block w-full border-gray-300 focus:ring-[#00748C] focus:border-[#00748C]" required></textarea>
              </div>
              <button type="submit" disabled={isLoading} className={`bg-[#00748C] text-white font-semibold py-2 px-4 ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#003844]'} focus:outline-none focus:ring focus:ring-[#00748C] focus:ring-opacity-50`}>Submit</button>
            </form>            
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
