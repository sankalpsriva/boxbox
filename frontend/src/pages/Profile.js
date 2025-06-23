import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  // Don't render if not logged in (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-white transition-colors duration-200">
          BoxBox - Profile
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
          
          {/* Login/Profile buttons */}
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md border border-white"
          >
            Logout
          </button>
          <button className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-red-600">
            Profile
          </button>
        </div>
      </header>

      {/* Page Content */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Your <span className="text-red-500">Profile</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Welcome back, {user?.name}! Manage your account and view your F1 rating history.
          </p>
          
          {/* Profile Info */}
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Name</label>
                <p className="text-white text-lg">{user?.name}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <p className="text-white text-lg">{user?.email}</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Member Since</label>
                <p className="text-white text-lg">December 2024</p>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Total Ratings</label>
                <p className="text-white text-lg">42 races rated</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/races" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Rate More Races
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
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

export default Profile;