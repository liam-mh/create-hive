import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOURS } from '@/styles';
import { useLocalSearchParams } from 'expo-router';
import ProfilePage from '@/components/profilePage/ProfilePage';

interface UserProfileParams {
  userId?: string;
}

export default function UserProfile() {
  const { userId } = useLocalSearchParams<Partial<UserProfileParams>>(); 

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text>Could not find user</Text>
      </View>
    );
  }

  return <ProfilePage userId={userId} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
  },
});