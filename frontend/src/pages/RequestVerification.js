import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RequestVerification() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    try {
      setStatus('loading');
      
      const response = await fetch('http://localhost:8000/api/v1/request-verification?' + new URLSearchParams({
        email: email
      }), {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Verification email sent successfully. Please check your inbox.');
      } else {
        setStatus('error');
        setMessage(data.detail || 'Failed to send verification email.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while sending the verification email.');
      console.error('Request verification error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-white transition-colors duration-200">
          BoxBox
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/seasons" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Seasons
          </Link>
          <Link to="/races" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Races
          </Link>
          <Link to="/drivers" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Drivers
          </Link>
          <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md border border-white">
            Login
          </Link>
        </div>
      </header>
      
      {/* Page Content */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Request <span className="text-red-500">Verification Email</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Enter your email address below to receive a new verification link.
          </p>
          
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            {status === 'success' ? (
              <div className="text-center">
                <div className="bg-green-900 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-500 mb-4">Check Your Email</h2>
                <p className="text-lg text-gray-300 mb-6">{message}</p>
                <div className="space-y-4">
                  <Link 
                    to="/"
                    className="block w-full md:w-auto md:inline-block bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
                    {message}
                  </div>
                )}
                
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full ${status === 'loading' ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200`}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Verification Email'}
                </button>
                
                <div className="text-center mt-4">
                  <p className="text-gray-400">
                    Remember your password?{' '}
                    <Link to="/login" className="text-red-400 hover:text-red-300">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2">BoxBox - The Ultimate F1 Race Rating Platform</p>
          <p className="text-xs text-gray-600">
            Built with ❤️ for F1 fans around the world • Not affiliated with Formula 1
          </p>
        </div>
      </footer>
    </div>
  );
}

export default RequestVerification;
