import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Seasons() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingYear, setLoadingYear] = useState(null);

  // Define available F1 seasons
  const seasons = [
    {year: 2025, status: 'current'},    
    { year: 2024, status: 'completed'},
    { year: 2023, status: 'completed'},
    { year: 2022, status: 'completed'},
    { year: 2021, status: 'completed'},
    { year: 2020, status: 'completed'},
    { year: 2019, status: 'completed'},
    { year: 2018, status: 'completed'},
    { year: 2017, status: 'completed'},
    { year: 2016, status: 'completed'},
    { year: 2015, status: 'completed'},
    { year: 2014, status: 'completed'},
    { year: 2013, status: 'completed'},
    { year: 2012, status: 'completed'},
    { year: 2011, status: 'completed'},
    { year: 2010, status: 'completed'}
  ];

  const handleSeasonClick = async (year) => {
    setLoading(true);
    setLoadingYear(year);
    
    try {
      // Call API to get races for the season
      console.log(`Fetching races for ${year}...`);
      const response = await axios.get(`http://localhost:8000/api/v1/races?year=${year}`);
      
      // Navigate to season detail page with the data
      navigate(`/seasons/${year}`, { 
        state: { 
          year: year, 
          races: response.data,
          seasonInfo: seasons.find(s => s.year === year)
        } 
      });
    } catch (error) {
      console.error(`Error fetching ${year} season:`, error);
      // Navigate anyway with fallback data
      navigate(`/seasons/${year}`, { 
        state: { 
          year: year, 
          races: [],
          seasonInfo: seasons.find(s => s.year === year),
          error: 'Failed to load race data'
        } 
      });
    } finally {
      setLoading(false);
      setLoadingYear(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-white transition-colors duration-200">
          BoxBox
        </Link>
        <div className="flex items-center space-x-4">
        </Link>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-red-600">
            Seasons
          </button>
          <Link to="/races" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Races
          </Link>
          <Link to="/drivers" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md">
            Drivers
          </Link>
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
        <div className="max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            F1 <span className="text-red-500">Seasons</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Explore Formula 1 seasons, championship standings, and season statistics. 
            Click on any season to view races and detailed information.
          </p>

          {/* Season Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {seasons.map((season) => (
              <div 
                key={season.year}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-red-500"
              >
                <div className="relative">
                  {/* Season Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      season.status === 'current' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {season.status === 'current' ? 'CURRENT' : 'COMPLETED'}
                    </span>
                  </div>

                  {/* Season Header */}
                  <div className="h-24 bg-gradient-to-r from-red-900 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {season.year}
                      </div>
                      <div className="text-sm text-gray-300">
                        F1 Season
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Season {season.year}
                  </h3>
                  {/* <p className="text-gray-400 text-sm mb-4">
                    {season.description}
                  </p> */}

                  {/* Season Button */}
                  <button
                    onClick={() => handleSeasonClick(season.year)}
                    disabled={loading && loadingYear === season.year}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      loading && loadingYear === season.year
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
                    }`}
                  >
                    {loading && loadingYear === season.year ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      `View ${season.year} Season`
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading season data...</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading season data...</p>
            </div>
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

export default Seasons;