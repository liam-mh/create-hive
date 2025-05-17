import { useEffect, useState } from 'react';
import { getAddressFromCoordinates, formatDistrictCity } from '@/utils/locationUtils';
import { getImageUrl } from '@/hooks/useFirebaseStorage';
import { getUserById, getUserProfileById } from '@/services/userService';
import { Coordinate } from '@/types/Coordinate';
import { User } from '@/models/User';
import { UserProfile } from '@/models/UserProfile';

export const useProfileCardViewModel = (
  userId: string,
  inputUser?: User,
  minimal: boolean = false
) => {
  const [user, setUser] = useState<User | null>(inputUser ?? null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const usr = user ?? await getUserById(userId);
        if (!usr) {
          setError('User not found');
          return;
        }
        setUser(usr);

        await Promise.all([
          !minimal ? fetchUserProfile(userId) : null,
          !minimal ? fetchLocation(usr) : null,
          fetchImage(userId),
        ]);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async (userId: string) => {
      const profile = await getUserProfileById(userId);
      setUserProfile(profile);
    };

    const fetchLocation = async (usr: User) => {
      const coordinate: Coordinate = {
        latitude: usr.location.latitude,
        longitude: usr.location.longitude,
      };
      const address = await getAddressFromCoordinates(coordinate);
      setCity(formatDistrictCity(address));
    };

    const fetchImage = async (userId: string) => {
      const uri = await getImageUrl('user', userId);
      setImageUri(uri);
    };

    fetchData();
  }, [userId]);

  return {
    user,
    userProfile,
    imageUri,
    city,
    loading,
    error,
  };
};