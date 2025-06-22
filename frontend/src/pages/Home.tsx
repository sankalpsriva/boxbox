import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/drivers/top').then((res) => {
      setDrivers(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Top Rated F1 Drivers</h1>
        <div>
          <button className="mr-4">Login</button>
          <button>Profile</button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-gray-900 p-4 rounded-lg shadow">
            <img src={driver.image_url} alt={driver.name} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 text-xl font-semibold">{driver.name}</h3>
            <p className="text-sm text-gray-400">Avg Rating: {driver.avg_rating.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
