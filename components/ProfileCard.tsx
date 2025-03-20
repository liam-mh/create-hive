import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';
import InformationButton from './buttons/InformationButton';
import DetailsContainer from './DetailsContainer';
import DetailsRow from './DetailsRow';
import ProfileCardViewModel from '@/viewModels/ProfileCardViewModel';

interface ProfileCardProps {
  userId: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ( props ) => {
  const viewModel = new ProfileCardViewModel(props.userId);
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const [user, setUser] = useState(viewModel.user);
  const [userProfile, setUserProfile] = useState(viewModel.userProfile);
  const [imageUri, setImageUri] = useState(viewModel.imageUri);
  const [city, setCity] = useState(viewModel.city);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchProfileData();
      setLoading(viewModel.loading);
      setError(viewModel.error);

      setUser(viewModel.user);
      setUserProfile(viewModel.userProfile);
      setImageUri(viewModel.imageUri);
      setCity(viewModel.city);
    };
    fetchData();
  }, [props.userId]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }
  if (!user || !userProfile || !city) {
    return <View style={styles.contentContainer}><Text>User not found.</Text></View>;
  }

  const defaultImage = require('@/assets/images/default-profile-photo.jpg');

  return (
    <View style={styles.contentContainer}>
      <View style={styles.innerRow}>
        <View>
          <Image
            source={imageUri ? { uri: imageUri } : defaultImage}
            style={styles.image} 
          />
        </View>
        <DetailsContainer>
          <DetailsRow iconName='at' text={user.userAt} />
          <DetailsRow iconName='palette' text={`${userProfile.medium.primary} - ${userProfile.medium.secondary}`} />
          <DetailsRow iconName='geoAlt' text={city} />
          <View style={styles.innerRow}>
            <DetailsRow iconName='people' text={userProfile.followers.toString()} />
            <DetailsRow iconName='heart' text={userProfile.likes.toString()} />
          </View>
        </DetailsContainer>
      </View>
      <Text style={TEXT.regularGrey}>{userProfile.bio}</Text>
      <View style={styles.innerRow}>
        <InformationButton type={'event'} id={user.userId} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: UNIT,
    backgroundColor: COLOURS.white,
    paddingTop: UNIT
  },
  image: {
    flex: 1,
    height: UNIT * 6.5,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default
  },
  innerRow: {
    flexDirection: 'row',
    gap: UNIT,
  },
});

export default ProfileCard;