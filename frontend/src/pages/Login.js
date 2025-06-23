import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { isLoggedIn } = useAuth();

  // Show different content based on login status, but don't redirect
    return (<div className="min-h-screen bg-black text-white p-6">
          {/* Header */}      <header className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-white transition-colors duration-200">
              BoxBox
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
                Home
              </Link>
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
          </header>          {/* Page Content */}
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
          ) : (
            <>
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-red-500">Login</span> to BoxBox
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Sign in to rate races, save your favorites, and join the F1 community.
              </p>
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Login Form</h2>
                <div className="space-y-4">
                  <div className="text-left">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
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
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button 
                    type="button"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <p className="text-gray-400 text-sm text-center">
                    Login functionality will be connected to the backend soon!
                  </p>
                </div>
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