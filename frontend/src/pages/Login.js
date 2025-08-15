import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { isLoggedIn, login, verificationError, requestVerification } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Call login function from AuthContext
      await login(username, password);
      navigate('/profile');
    } catch (error) {
      // Check if this is a verification error
      if (error.message === "Please verify your email before logging in") {
        setNeedsVerification(true);
      } else {
        setError(error.message || 'Failed to log in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      // Get the email associated with this username from the verificationError
      const response = await fetch(`http://localhost:8000/api/v1/request-verification?email=${username}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setVerificationSent(true);
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to send verification email');
      }
    } catch (error) {
      setError('Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  // Show different content based on login status, but don't redirect
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
          {/* Login/Profile buttons - Show current state */}
          {isLoggedIn ? (
            <Link to="/profile" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-blue-600">
              Profile
            </Link>
          ) : (
            <span className="px-4 py-2 text-white bg-red-600 rounded-md">
              Login (Current Page)
            </span>
          )}
        </div>
      </header>
      
      {/* Page Content */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          {isLoggedIn ? (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                You're Already <span className="text-green-500">Logged In!</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Welcome back! You can go to your profile or continue browsing.
              </p>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">What would you like to do?</h2>
                <div className="space-y-4">
                  <Link 
                    to="/profile"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Go to Profile
                  </Link>
                  <Link 
                    to="/"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </>
          ) : needsVerification ? (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                Email <span className="text-yellow-500">Verification</span> Required
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                You need to verify your email address before logging in.
              </p>
              
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                {verificationSent ? (
                  <div className="text-center">
                    <div className="bg-green-900 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-500 mb-4">Verification Email Sent!</h2>
                    <p className="text-lg text-gray-300 mb-6">
                      We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                    </p>
                    <Link 
                      to="/login"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-4"
                    >
                      Try Logging In Again
                    </Link>
                    <Link 
                      to="/"
                      className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Back to Home
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Verify Your Email</h2>
                    <p className="text-lg text-gray-300 mb-6">
                      You need to verify your email address before you can log in. Would you like us to send a new verification link?
                    </p>
                    <button 
                      onClick={handleResendVerification}
                      disabled={loading}
                      className={`w-full ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-4`}
                    >
                      {loading ? 'Sending...' : 'Send Verification Email'}
                    </button>
                    <Link 
                      to="/"
                      className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Back to Home
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-red-500">Login</span> to BoxBox
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Sign in to rate races, save your favorites, and join the F1 community.
              </p>
              
              {error && (
                <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Login Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200`}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-gray-400">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-red-400 hover:text-red-300">
                        Register here
                      </Link>
                    </p>
                    <p className="text-gray-400 mt-2">
                      Need to verify your email?{' '}
                      <Link to="/request-verification" className="text-blue-400 hover:text-blue-300">
                        Request verification
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </>
          )}
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

export default Login;