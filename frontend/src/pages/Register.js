import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Call register function from AuthContext
      await register(username, email, password);
      setRegistered(true);
      setRegisteredEmail(email);
    } catch (error) {
      setError(error.message || 'Failed to register');
    } finally {
      setLoading(false);
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
          <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Login
          </Link>
        </div>
      </header>
      
      {/* Page Content */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          {registered ? (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                Registration <span className="text-green-500">Successful!</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Thank you for registering with BoxBox. We've sent a verification email to <span className="font-bold text-white">{registeredEmail}</span>.
              </p>
              
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                <div className="bg-green-900 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">Check Your Email</h2>
                <p className="text-gray-300 mb-6">
                  Please check your email and click the verification link to activate your account. If you don't see the email, please check your spam folder.
                </p>
                <div className="space-y-4">
                  <Link 
                    to="/login"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-4"
                  >
                    Go to Login
                  </Link>
                  <Link 
                    to="/request-verification"
                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Request New Verification Email
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-red-500">Register</span> for BoxBox
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create an account to rate races, save your favorites, and join the F1 community.
              </p>
              
              {error && (
                <div className="bg-red-900 text-white p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Registration Form</h2>
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
                      placeholder="Choose a username"
                    />
                  </div>
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
                      placeholder="Enter your email"
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
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="text-left">
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="passwordConfirm"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200`}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="text-red-400 hover:text-red-300">
                        Login here
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

export default Register;
