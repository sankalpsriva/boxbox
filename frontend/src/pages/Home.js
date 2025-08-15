import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Home() {
  const [drivers, setDrivers] = useState([]);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use authentication context
  const { isLoggedIn, user, login, logout } = useAuth();
  useEffect(() => {
    // Load both drivers and races data
    Promise.all([
      axios.get('/api/v1/drivers/top'),
      axios.get('/api/v1/races/recent')
    ])
    .then(([driversResponse, racesResponse]) => {
      setDrivers(driversResponse.data);
      setRaces(racesResponse.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log('API not available, using mock data');
      // Use mock data for demo
      setDrivers([
        {
          id: 1,
          name: 'Lewis Hamilton',
          avg_rating: 4.8
        },
        {
          id: 2,
          name: 'Max Verstappen',
          avg_rating: 4.9
        },
        {
          id: 3,
          name: 'Charles Leclerc',
          avg_rating: 4.7
        }
      ]);
      
      // Mock races data
      setRaces([
        {
          id: 1,
          name: 'Monaco Grand Prix 2024',
          date: '2024-05-26',
          location: 'Monaco',
          avg_rating: 4.2,
          total_ratings: 150
        },
        {
          id: 2,
          name: 'British Grand Prix 2024',
          date: '2024-07-07',
          location: 'Silverstone, UK',
          avg_rating: 4.6,
          total_ratings: 200
        },
        {
          id: 3,
          name: 'Japanese Grand Prix 2024',
          date: '2024-10-13',
          location: 'Suzuka, Japan',
          avg_rating: 4.8,
          total_ratings: 180
        }
      ]);
      
      setLoading(false);
    });
  }, []);
  // Handle login/logout
  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logout logic
      // Prompt to make sure user wants to log out, if another click occurs within 2 seconds, log out

      let logoutTimeout;
      const confirmLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
          logout();
        }
      };
      logoutTimeout = setTimeout(confirmLogout, 2000);
      return () => clearTimeout(logoutTimeout);
    } else {
      // Let user know that login was unsuccessful
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}      <header className="flex justify-between items-center mb-8">
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
          {/* Always visible Login/Logout Button */}
          <Link 
            to={isLoggedIn ? '#' : '/login'}
            onClick={handleAuthAction}
            className={`px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md ${
              isLoggedIn ? 'bg-red-600 hover:bg-red-700' : 'border border-white'
            }`}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Link>

          {/* Always visible Profile Button */}
          <Link 
            to="/profile"
            className={`px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md ${
              isLoggedIn ? 'bg-gray-700' : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? `Profile (${user.name})` : 'Profile'}
          </Link>
        </div>
      </header>      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-red-500">BoxBox</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The ultimate F1 race rating platform where fans come together to rate and discuss 
            the most thrilling moments in Formula 1. Share your thoughts on epic battles, 
            stunning overtakes, and unforgettable race weekends.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              className={`px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                isLoggedIn 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              onClick={isLoggedIn ? null : handleAuthAction}
            >
              {isLoggedIn ? '✓ Ready to Rate!' : 'Get Started'}
            </button>
            <button className="px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-colors duration-200">
              Browse Races
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Message for logged in users */}
      {isLoggedIn && (
        <div className="bg-green-900 border border-green-500 p-4 rounded-lg mb-8">
          <p className="text-green-400 font-semibold">👋 Welcome back, {user.name}!</p>
          <p className="text-gray-300 text-sm mt-1">
            Ready to rate some epic races? Check out the top-rated races below!
          </p>
        </div>
      )}      {/* Top Races Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🏆 Top Rated Races</h2>
          <p className="text-gray-400 text-lg">
            Discover the races that had fans on the edge of their seats
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {races.map((race, index) => (
            <div 
              key={race.id} 
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-red-500"
            >
              {/* Race Rank Badge */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-yellow-500 text-black' : 
                    index === 1 ? 'bg-gray-300 text-black' : 
                    index === 2 ? 'bg-orange-600 text-white' : 
                    'bg-gray-600 text-white'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-red-900 to-gray-900 flex items-center justify-center">
                  <div className="text-4xl">🏎️</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {race.name}
                </h3>
                <div className="text-gray-400 text-sm mb-4 space-y-1">
                  <p className="flex items-center">
                    <span className="mr-2">📍</span>
                    {race.location}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📅</span>
                    {new Date(race.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                {/* Rating Display */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-bold text-2xl mr-2">
                      {race.avg_rating.toFixed(1)}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-xl ${
                            i < Math.floor(race.avg_rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 text-sm">
                      {race.total_ratings} ratings
                    </div>
                    <div className="text-gray-400 text-xs">
                      by fans
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isLoggedIn 
                      ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                  onClick={() => isLoggedIn && alert(`Rating race: ${race.name}`)}
                >
                  {isLoggedIn ? '⭐ Rate This Race' : '🔒 Login to Rate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>      {/* Call to Action Section */}
      <section className="text-center mb-16 bg-gray-900 rounded-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">
          Join the F1 Community
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          Connect with fellow F1 enthusiasts, share your race opinions, and help build 
          the ultimate database of Formula 1 race ratings. Every race tells a story - 
          what's yours?
        </p>
        {!isLoggedIn && (
          <button 
            onClick={handleAuthAction}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
          >
            Sign Up to Start Rating
          </button>
        )}
        {isLoggedIn && (
          <div className="space-y-4">
            <p className="text-green-400 font-semibold">🎉 You're all set to rate races!</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                View All Races
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                My Ratings
              </button>
            </div>
          </div>
        )}
      </section>      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-500 p-4 rounded-lg mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="#" className="hover:text-white transition-colors duration-200">About</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
          <p className="mb-2">BoxBox - The Ultimate F1 Race Rating Platform</p>
          <p className="text-xs text-gray-600">
            Built with ❤️ for F1 fans around the world • Not affiliated with Formula 1
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;