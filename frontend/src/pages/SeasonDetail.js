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

    const seasons = [
    {year: 2025, description: 'The current Formula 1 season is underway, with teams competing for the championship.'},
    { year: 2024, description: 'The 2024 Formula 1 season was a historic and fiercely competitive year where Max Verstappen secured his fourth consecutive world championship, while McLaren won a dramatic World Constructors\' Championship over Ferrari in the final race.'},
    { year: 2023, description: 'The 2023 Formula 1 season was a dominant year for Max Verstappen and Red Bull Racing, with Verstappen securing his third consecutive World Drivers\' Championship and Red Bull achieving their first-ever 1-2 finish in the Constructors\' Championship. The season featured a record-breaking 23 races, including the debut of the Las Vegas Grand Prix, and saw Red Bull win all but one race.' },
    { year: 2022, description: 'The 2022 Formula 1 season was a landmark year characterized by revolutionary new technical regulations, designed to promote closer racing, and the introduction of a record 23-race calendar.' },
    { year: 2021, description: 'The 2021 Formula 1 season was an intensely competitive and controversial year dominated by a fierce, year-long title battle between Lewis Hamilton (Mercedes) and Max Verstappen (Red Bull), culminating in a dramatic, on-track showdown at the final Abu Dhabi Grand Prix where Verstappen won the championship on the last lap.' },
    { year: 2020, description: 'The 2020 Formula 1 season was defined by the unprecedented disruption of the COVID-19 pandemic, which delayed its start and led to a unique, truncated 17-race calendar featuring closed-door events, rescheduled circuits, and double-header races. It was a season of Mercedes domination and Lewis Hamilton\'s record-equalling seventh World Championship.' },
    { year: 2019, description: 'The 2019 Formula 1 season saw Lewis Hamilton win his sixth World Drivers\' Championship, while Mercedes clinched their sixth consecutive World Constructors\' Championship, a dominant run that put them in second place in F1 history for consecutive titles.' },
    { year: 2018, description: 'The 2018 Formula 1 season featured a dominant Lewis Hamilton and the Mercedes-AMG Petronas Motorsport team, who secured both the Drivers\' and Constructors\' Championships after a mid-season shift in form.' },
    { year: 2017, description: 'The 2017 Formula 1 season was marked by a close championship battle between Lewis Hamilton and Sebastian Vettel, with Hamilton ultimately securing his fourth World Championship title.' },
    { year: 2016, description: 'The 2016 Formula 1 season saw Nico Rosberg win his first and only World Championship title, before announcing his shock retirement from the sport shortly after.' },
    { year: 2015, description: 'The 2015 Formula 1 season was dominated by Lewis Hamilton, who secured his third World Championship title with a series of impressive performances throughout the year.' },
    { year: 2014, description: 'The 2014 Formula 1 season marked the beginning of the hybrid era, with Mercedes emerging as the dominant force in the sport.' },
    { year: 2013, description: 'The 2013 Formula 1 season was characterized by Sebastian Vettel\'s dominance, as he secured his fourth consecutive World Championship title with a series of impressive performances.' },
    { year: 2012, description: 'The 2012 Formula 1 season was defined by a fierce rivalry between Fernando Alonso and Sebastian Vettel, culminating in a dramatic title fight that went down to the final race in Brazil.' },
    { year: 2011, description: 'The 2011 Formula 1 season was marked by a dominant performance from Sebastian Vettel, who secured his second consecutive World Championship title with a series of impressive victories.' },
    { year: 2010, description: 'The 2010 Formula 1 season was notable for the intense rivalry between Mark Webber and Sebastian Vettel, who were teammates at Red Bull Racing and fought for the championship until the final race.' }
  ];


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
    
    // Find the season description from our seasons array
    const currentSeason = seasons.find(season => season.year.toString() === year);
    if (currentSeason) {
      setSeasonInfo(currentSeason);
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
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-3">Season Overview</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                {seasonInfo.description}
              </p>
            </div>
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
            {races.map((race) => (
              <div key={race.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors duration-200">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{race.name}</h3>
                  <p className="text-gray-400 mb-4">{race.circuit}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg font-bold">{race.avg_rating ? race.avg_rating.toFixed(1) : 'N/A'}</span>
                      <span className="text-gray-500 ml-2">({race.total_ratings} ratings)</span>
                    </div>
                    <Link 
                      to={`/races/${race.id}`}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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