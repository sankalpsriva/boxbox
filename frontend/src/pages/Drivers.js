import React from 'react';
import { Link } from 'react-router-dom';

function Drivers() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-white transition-colors duration-200">
          BoxBox 
        </Link>        <div className="flex items-center space-x-4">
          <Link to="/" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Home
          </Link>
          <Link to="/seasons" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Seasons
          </Link>
          <Link to="/races" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Races
          </Link>
          <button className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-red-600">
            Drivers
          </button>

          {/* Login/Profile buttons - placeholder for now */}
          <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md border border-white">
            Login
          </Link>
          <Link to="/profile" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-gray-600 cursor-not-allowed" disabled>
            Profile
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            F1 <span className="text-red-500">Drivers</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover and rate Formula 1 drivers past and present. From legendary 
            champions to rising stars, see how the community rates their favorite 
            drivers' performances and careers.
          </p>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400">
              Driver profiles, statistics, and rating system will be available here soon!
            </p>
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

export default Drivers;
