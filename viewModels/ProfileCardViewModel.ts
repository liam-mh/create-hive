import { useEffect, useState } from 'react';
import { getAddressFromCoordinates, formatDistrictCity } from '@/utils/locationUtils';
import { getImageUrl } from '@/hooks/useFirebaseStorage';
import { getUserById, getUserProfileById } from '@/services/userService';
import { Coordinate } from '@/types/Coordinate';
import { User } from '@/models/User';
import { UserProfile } from '@/models/UserProfile';
import { navigateToUserProfile } from '@/utils/routerUtils';
import { router } from 'expo-router';
import { useAuth } from '@/context/authContext';

export const useProfileCardViewModel = (
  inputUser: string | User,
  getProfileData?: boolean,
) => {
  const { user: sessionUser } = useAuth();

  const [user, setUser] = useState<User | null>(
    typeof inputUser === 'object' ? inputUser : null
  );
  const [userId] = useState<string>(
    typeof inputUser === 'string' ? inputUser : inputUser.userId
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [personalProfile, setPersonalProfile] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let resolvedUser = user;
        if (!resolvedUser) {
          resolvedUser = await getUserById(userId);
          if (!resolvedUser) {
            setError('No user found');
            return;
          }
          setUser(resolvedUser);
        }

        const promises = [];
        if (!getProfileData) {
          promises.push(fetchUserProfile(resolvedUser.userId));
          promises.push(fetchLocation(resolvedUser.location));
          promises.push(checkPersonalProfile(resolvedUser.userId));
        }
        promises.push(fetchImage(resolvedUser.userId));
        await Promise.all(promises);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputUser]);

  const checkPersonalProfile = async (profileUserId: string) => {
    setPersonalProfile(sessionUser?.userId === profileUserId);
  };

  const fetchUserProfile = async (uid: string) => {
    const profile = await getUserProfileById(uid);
    setUserProfile(profile);
  };

  const fetchLocation = async (coordinate: any) => {
  const normalisedCoordinate = {
    latitude: coordinate.latitude ?? coordinate._lat,
    longitude: coordinate.longitude ?? coordinate._long,
  };

  const address = await getAddressFromCoordinates(normalisedCoordinate);
  setCity(formatDistrictCity(address));
};


  const fetchImage = async (uid: string) => {
    const uri = await getImageUrl('user', uid);
    setImageUri(uri);
  };

  const handleMinimalPress = () => {
    if (user) {
      navigateToUserProfile({ router, userId: user.userId });
    }
  };

  return {
    user,
    userProfile,
    imageUri,
    city,
    loading,
    error,
    personalProfile,
    handleMinimalPress,
  };
};