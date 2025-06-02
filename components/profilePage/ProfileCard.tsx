import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import DetailsContainer from '../DetailsContainer';
import DetailsRow from '../DetailsRow';
import MessageButton from '../buttons/MessageButton';
import FollowButton from '../buttons/FollowButton';
import EditButton from '../buttons/EditButton';

import { User } from '@/models/User';
import { getIcon } from '@/utils/iconUtils';
import { useProfileCardViewModel } from '@/viewModels/ProfileCardViewModel';
import ImageLoader from '../ImageLoader';

interface ProfileCardProps {
  inputUser: string | User;
  minimalCard?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  inputUser,
  minimalCard = false,
}) => {
  const {
    user,
    userProfile,
    imageUri,
    city,
    loading,
    error,
    personalProfile,
    handleMinimalPress,
  } = useProfileCardViewModel(inputUser, minimalCard);

  const defaultImage = require('@/assets/images/default-profile-photo.jpg');
  const iconChevronRight = getIcon('chevronRight', SIZES.m, COLOURS.primary);

  if (loading) return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;

  if (user && userProfile && city && !minimalCard) {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.innerRow}>
          <ImageLoader
            type='user'
            id={user.userId}
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
          {personalProfile ? (
            <EditButton type="profile" id={user.userId} />
          ) : (
            <>
              <FollowButton userToFollowId={user.userId} />
              <MessageButton
                params={{
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
          <ImageLoader
            type='user'
            id={user.userId}
            style={styles.minimalImage} 
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
    width: UNIT * 6,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  minimalImage: {
    width: UNIT * 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  innerRow: {
    flexDirection: 'row',
    gap: UNIT,
    alignItems: 'center', 
  },
  innerRowMinimal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProfileCard;