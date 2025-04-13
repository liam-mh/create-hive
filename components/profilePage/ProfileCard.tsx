import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import DetailsContainer from '../DetailsContainer';
import DetailsRow from '../DetailsRow';
import ProfileCardViewModel from '@/viewModels/ProfileCardViewModel';
import MessageButton from '../buttons/MessageButton';
import FollowButton from '../buttons/FollowButton';
import EditButton from '../buttons/EditButton';
import { User } from '@/models/User';
import { navigateToUserProfile } from '@/utils/routerUtils';
import { router } from 'expo-router';
import { getIcon } from '@/utils/iconUtils';

interface ProfileCardProps {
  sessionUserId: string;
  profileUserId: string;
  inputProfileUser?: User;
  minimalCard?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ( props ) => {
  let viewModel = null;
  props.inputProfileUser
    ? viewModel = new ProfileCardViewModel(
      props.profileUserId, 
      props.inputProfileUser, 
      props.minimalCard ? true : false
    )
    : viewModel = new ProfileCardViewModel(props.profileUserId);

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
  }, [props]);

  const handleMinimalPress = () => {
    navigateToUserProfile({ router, userId: props.profileUserId });
  };

  const defaultImage = require('@/assets/images/default-profile-photo.jpg');
  const iconChevronRight = getIcon('chevronRight', SIZES.m, COLOURS.primary);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  if (user && userProfile && city && !props.minimalCard) {
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
          {props.sessionUserId == props.profileUserId ? (
            <EditButton 
              type={'profile'} 
              id={props.sessionUserId}
            />        
          ) : (
            <>
              <FollowButton 
                userId={props.sessionUserId} 
                userToFollowId={user.userId} 
              />
              <MessageButton
                params={{
                  primaryUserId: props.sessionUserId,
                  secondaryUserId: user.userId, 
                  secondaryUserName: user.firstName,
                }}
              />
            </>
          )}
        </View>
      </View>
    );
  } else if (props.minimalCard && user) {
    return (
      <TouchableOpacity style={styles.contentContainer} onPress={handleMinimalPress}>
        <View style={styles.innerRowMinimal}>
          <View>
            <Image
              source={imageUri ? { uri: imageUri } : defaultImage}
              style={styles.image} 
            />
          </View>
          <View style={{ flex: 1, paddingLeft: UNIT }}>
            <DetailsContainer >
              <DetailsRow iconName='at' text={user.userAt} />
              <DetailsRow iconName='person' text={`${user.firstName} ${user.lastName}`} />
            </DetailsContainer>
          </View>
          <View>
            {iconChevronRight}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
  innerRowMinimal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

export default ProfileCard;