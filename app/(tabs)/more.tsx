import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import ProfileCard from '@/components/ProfileCard';
import ProfileTabSelector from '@/components/ProfileTabSelector';
import { getUserById } from '@/services/userService';
import TEXT, { COLOURS, DIVS, UNIT } from '@/styles';
import { User } from '@/models/User';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context/authContext';

interface MoreParams {
  userId?: string;
}

export default function More() {
  const { userId } = useLocalSearchParams<Partial<MoreParams>>(); 
  const { user: authUser } = useAuth();
  const [ user, setUser ] = useState<User | null>(null); 

  console.log('More page with userId: ', userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
        } else {
          setUser(authUser); 
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [userId, authUser]);

  if (!user) {
    return <View style={styles.container}><Text>Could not find user</Text></View>;
  }

  return (
    <>
      <CustomHeader
        children={
          <Text style={TEXT.h1}>{`${user.firstName} ${user.lastName}`}</Text> 
        }
      />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.sectionContainer}>
            <ProfileCard userId={user.userId} /> 
          </View>
          <View style={DIVS.offwhite} />
          <ProfileTabSelector />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
  },
  content: {
    gap: UNIT,
    flexGrow: 1,
  },
  sectionContainer: {
    paddingInline: UNIT,
  },
});