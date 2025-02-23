import * as Location from 'expo-location';

export const getCityFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await Location.reverseGeocodeAsync({ latitude, longitude });
    return response.length > 0 ? response[0].city || 'Unknown' : 'Unknown';
  } catch (error) {
    console.error("Error fetching city:", error);
    return 'Unknown';
  }
};

/*
EXAMPLE

const handleFetchCity = async () => {
  const city = await getCityFromCoordinates(53.380871, -1.4701);
  console.log("City:", city);
};
*/