import { useState, useEffect } from 'react';
import { getCityFromCoordinates } from '@/utils/getCityFromCoordinates';

export const useCityFromCoordinates = (latitude: number, longitude: number) => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      const fetchedCity = await getCityFromCoordinates(latitude, longitude);
      setCity(fetchedCity);
    };

    fetchCity();
  }, [latitude, longitude]); 

  return city;
};