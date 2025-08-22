import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const API_URL = "https://localhost:8000/api/v1/drivers"

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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {drivers.map((driver) => (
                <Link 
                  key={driver.id} 
                  to={`/drivers/${driver.id}`}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-red-500 group"
                >
                  <div className="relative">
                    {/* Team Color Bar */}
                    <div 
                      className="h-2 w-full"
                      style={{ backgroundColor: driver.team_color || '#666' }}
                    />
                    
                    {/* Driver Image */}
                    <div className="h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center p-4">
                      {driver.image_url ? (
                        <img 
                          src={driver.image_url} 
                          alt={driver.name}
                          className="h-full w-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="h-32 w-32 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-4xl text-gray-500">
                            {driver.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">
                        {driver.name}
                      </h3>
                      {driver.driver_number && (
                        <span className="text-gray-400 font-mono">
                          #{driver.driver_number}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">
                        {driver.constructor}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {driver.nationality}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
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

export default Drivers;
