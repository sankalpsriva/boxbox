import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SeasonDetail() {
  const { year } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [races, setRaces] = useState([]);
  const [seasonInfo, setSeasonInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have data from navigation state, use it
    if (location.state) {
      setRaces(location.state.races || []);
      setSeasonInfo(location.state.seasonInfo);
      setError(location.state.error || null);
    } else {
      // If no state data, fetch it
      fetchSeasonData();
    }
  }, [year, location.state]);

  const fetchSeasonData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/races?year=${year}`);
      setRaces(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching season data:', err);
      setError('Failed to load season data');
      setRaces([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateSeasonStats = () => {
    if (races.length === 0) return null;
    
    const avgRating = races.reduce((sum, race) => sum + race.avg_rating, 0) / races.length;
    const totalRatings = races.reduce((sum, race) => sum + race.total_ratings, 0);
    const topRace = races.reduce((prev, curr) => 
      (prev.avg_rating > curr.avg_rating) ? prev : curr
    );

    return {
      avgRating: avgRating.toFixed(1),
      totalRatings,
      topRace,
      totalRaces: races.length
    };
  };

  const stats = calculateSeasonStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading {year} season...</p>
        </div>
      </div>
    );
  }

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
            <Link to="/profile" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-gray-600 cursor-not-allowed" disabled>
                Profile
            </Link>
        </div>
      </header>

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/seasons')}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
        >
          <span className="mr-2">←</span>
          Back to Seasons
        </button>
      </div>

      {/* Season Header */}
      <section className="text-center mb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="text-red-500">{year}</span> F1 Season
          </h1>
          {seasonInfo && (
            <p className="text-xl text-gray-300 mb-8">
              {seasonInfo.description}
            </p>
          )}

          {/* Season Statistics */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-3xl font-bold text-red-500 mb-2">{stats.totalRaces}</h3>
                <p className="text-gray-400">Total Races</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">{stats.avgRating}</h3>
                <p className="text-gray-400">Average Rating</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-3xl font-bold text-blue-400 mb-2">{stats.totalRatings}</h3>
                <p className="text-gray-400">Total Ratings</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-green-400 mb-2">{stats.topRace?.name}</h3>
                <p className="text-gray-400">Top Rated Race</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-500 p-4 rounded-lg mb-8 max-w-6xl mx-auto">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchSeasonData}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      )}

      {/* Races Grid */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Season Races</h2>
        
        {races.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-4">No races found for {year}</p>
            <p>Try refreshing or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          </div>
        )}
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

export default SeasonDetail;