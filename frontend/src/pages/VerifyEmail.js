import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Get token from URL query parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link. No token provided.');
      return;
    }

    // Verify token with API
    const verifyEmail = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(data.detail || 'Failed to verify email. The link may have expired.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('An error occurred while verifying your email.');
        console.error('Verification error:', error);
      }
    };

    verifyEmail();
  }, [location.search]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-lg">Verifying your email...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="bg-green-900 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-500 mb-4">Email Verified!</h2>
            <p className="text-lg text-gray-300 mb-6">{message}</p>
            <div className="space-y-4">
              <Link 
                to="/login"
                className="block w-full md:w-auto md:inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="bg-red-900 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-500 mb-4">Verification Failed</h2>
            <p className="text-lg text-gray-300 mb-6">{message}</p>
            <div className="space-y-4">
              <Link 
                to="/request-verification"
                className="block w-full md:w-auto md:inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mr-0 md:mr-4 mb-4 md:mb-0"
              >
                Request New Verification
              </Link>
              <Link 
                to="/"
                className="block w-full md:w-auto md:inline-block bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        );

      default:
        return null;
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
            Email <span className="text-red-500">Verification</span>
          </h1>
          
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            {renderContent()}
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

export default VerifyEmail;
