import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const API_URL = "http://localhost:8000/api/v1/drivers"

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(API_URL);
        setDrivers(response.data);
      } catch (err) {
        setError('Failed to load drivers');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="text-red-500 text-xl">{error}</div>
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
          <button className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-red-600">
            Drivers
          </button>
          <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md border border-white">
            Login
          </Link>
          <Link to="/profile" className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors duration-200 rounded-md bg-gray-600 cursor-not-allowed" disabled>
            Profile
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            F1 <span className="text-red-500">Drivers</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center leading-relaxed max-w-4xl mx-auto">
            Discover and rate Formula 1 drivers. From legendary champions to rising stars, 
            see how the community rates their favorite drivers.
          </p>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {drivers.map((driver) => (
              <Link
                key={driver.id}
                to={`/drivers/${driver.id}`}
                className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300"
              >
                {/* Team Color Bar */}
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: driver.team_color || '#666' }}
                />

                {/* Driver Image */}
                <div className="relative h-48 bg-gray-800 flex items-center justify-center p-4">
                  {driver.image_url ? (
                    <img
                      src={driver.image_url}
                      alt={driver.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-24 w-24 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-3xl text-gray-400">{driver.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Driver Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold group-hover:text-red-500 transition-colors">
                      {driver.name}
                    </h2>
                    {driver.driver_number && (
                      <span className="text-gray-400 font-mono">
                        #{driver.driver_number}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{driver.constructor}</span>
                    <span>{driver.nationality}</span>
                  </div>
                </div>
              </Link>
            ))}
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
