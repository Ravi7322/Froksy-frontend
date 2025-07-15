import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Location = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = '5d1de942e6904a928eacf60815741cc3'; // ✅ Your OpenCage key

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
            );

            const cityName =
              response.data.results[0].components.city ||
              response.data.results[0].components.town ||
              response.data.results[0].components.village ||
              response.data.results[0].components.county ||
              'Unknown';

            setCity(cityName);
          } catch (err) {
            setError('❌ Failed to get city');
          }
        },
        (err) => {
          setError('❌ Location access denied');
        }
      );
    } else {
      setError('❌ Geolocation not supported');
    }
  }, []);

  return (
    <div >
      <h6>📍 Your Location</h6>
      {error ? (
        <p>{error}</p>
      ) : coords.lat ? (
    
          <h6>City: {city}</h6>
        
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Location;
