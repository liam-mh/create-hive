import { Coordinate } from '@/types/Coordinate';
import * as Location from 'expo-location';

export interface AddressData {
  city: string | null;
  country: string | null;
  district: string | null;
  isoCountryCode: string | null;
  name: string | null;
  postalCode: string | null;
  region: string | null;
  street: string | null;
  streetNumber: string | null;
  subregion: string | null;
  timezone: string | null;
}

export const getAddressFromCoordinates = async (
  coordinate: Coordinate
): Promise<AddressData | null> => {
  try {
    const response = await Location.reverseGeocodeAsync(coordinate);
    console.log(response);
    if (response.length > 0) {
      const locationData = response[0];
      return {
        city: locationData.city || null,
        country: locationData.country || null,
        district: locationData.district || null,
        isoCountryCode: locationData.isoCountryCode || null,
        name: locationData.name || null,
        postalCode: locationData.postalCode || null,
        region: locationData.region || null,
        street: locationData.street || null,
        streetNumber: locationData.streetNumber || null,
        subregion: locationData.subregion || null,
        timezone: locationData.timezone || null,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

export const getCityFromCoordinates = async (
  coordinate: Coordinate
): Promise<string | null> => {
  try {
    const address = await getAddressFromCoordinates(coordinate);
    return address?.city || null; 
  } catch (error) {
    console.error('Error getting city:', error);
    return null; 
  }
};

export const formatDistrictCity = (address: AddressData | null): string | null => {
  if (!address) {
    return null;
  }

  if (address.district && address.city) {
    return `${address.district}, ${address.city}`;
  } else if (address.city) {
    return address.city;
  } else if (address.district){
    return address.district;
  } else {
    return null;
  }
};