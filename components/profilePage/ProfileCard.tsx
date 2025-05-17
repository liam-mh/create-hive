import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import DetailsContainer from '../DetailsContainer';
import DetailsRow from '../DetailsRow';
import MessageButton from '../buttons/MessageButton';
import FollowButton from '../buttons/FollowButton';
import EditButton from '../buttons/EditButton';

import { User } from '@/models/User';
import { navigateToUserProfile } from '@/utils/routerUtils';
import { router } from 'expo-router';
import { getIcon } from '@/utils/iconUtils';
import { useProfileCardViewModel } from '@/viewModels/ProfileCardViewModel';


interface ProfileCardProps {
  sessionUserId: string;
  profileUserId: string;
  inputProfileUser?: User;
  minimalCard?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  sessionUserId,
  profileUserId,
  inputProfileUser,
  minimalCard = false
}) => {
  const {
    user,
    userProfile,
    imageUri,
    city,
    loading,
    error,
  } = useProfileCardViewModel(profileUserId, inputProfileUser, minimalCard);

  const handleMinimalPress = () => {
    navigateToUserProfile({ router, userId: profileUserId });
  };

  const defaultImage = require('@/assets/images/default-profile-photo.jpg');
  const iconChevronRight = getIcon('chevronRight', SIZES.m, COLOURS.primary);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  if (user && userProfile && city && !minimalCard) {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.innerRow}>
          <Image
            source={imageUri ? { uri: imageUri } : defaultImage}
            style={styles.image}
          />
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
          {sessionUserId === profileUserId ? (
            <EditButton type="profile" id={sessionUserId} />
          ) : (
            <>
              <FollowButton userId={sessionUserId} userToFollowId={user.userId} />
              <MessageButton
                params={{
                  primaryUserId: sessionUserId,
                  secondaryUserId: user.userId,
                  secondaryUserName: user.firstName,
                }}
              />
            </>
          )}
        </View>
      </View>
    );
  } else if (minimalCard && user) {
    return (
      <TouchableOpacity style={styles.contentContainer} onPress={handleMinimalPress}>
        <View style={styles.innerRowMinimal}>
          <Image
            source={imageUri ? { uri: imageUri } : defaultImage}
            style={styles.image}
          />
          <View style={{ flex: 1, paddingLeft: UNIT }}>
            <DetailsContainer>
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

  return null;
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: UNIT,
    backgroundColor: COLOURS.white,
    paddingTop: UNIT,
  },
  image: {
    flex: 1,
    height: UNIT * 6.5,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  innerRow: {
    flexDirection: 'row',
    gap: UNIT,
  },
  innerRowMinimal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProfileCard;