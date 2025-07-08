import { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: 'loading', message: 'Subscribing...' });
      // TODO: Implement newsletter subscription API call
      setStatus({ type: 'success', message: 'Successfully subscribed!' });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl my-12 overflow-hidden"
    >
      <div className="relative px-6 py-12 md:py-16 md:px-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Our Research
          </h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter for the latest research findings, publications, and events.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Email address"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status.type === 'loading'}
                className="px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-70"
              >
                Subscribe
              </motion.button>
            </div>
          </form>

          {status.message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 ${
                status.type === 'error' ? 'text-red-200' : 'text-blue-100'
              }`}
            >
              {status.message}
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection; 