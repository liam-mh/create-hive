import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import ProfileCard from '@/components/profilePage/ProfileCard';
import ProfileTabSelector from '@/components/profilePage/ProfileTabSelector';
import { getUserById } from '@/services/userService';
import TEXT, { COLOURS, DIVS, UNIT } from '@/styles';
import { User } from '@/models/User';
import { useAuth } from '@/context/authContext';

interface ProfilePageProps {
  userId?: string;
  user?: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ( props ) => {
  const sessionUser = useAuth().user;
  const [user, setUser] = useState<User | null>(null); 
  const ownProfile: boolean = sessionUser?.userId === (props.userId || props.user?.userId);

  useEffect(() => {
    setUser(null);
    const fetchData = async () => {
      try {
        if (!props.user && props.userId) {
          const userData = await getUserById(props.userId);
          setUser(userData);
        } else if (props.user) {
          setUser(props.user); 
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, [props.user, props.userId]);

  if (!user) {
    return <View style={styles.container}><Text>Could not find user</Text></View>;
  };

  return (
    <>
      <CustomHeader
        showSettingsIcon={ownProfile}
        hideBackButton={ownProfile}
        children={
          <Text style={TEXT.h1}>{`${user.firstName.toLowerCase()}`}</Text> 
        }
      />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.sectionContainer}>
            <ProfileCard inputUser={user}/> 
          </View>
          <View style={DIVS.offwhite} />
          <ProfileTabSelector userId={user.userId}/>
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

export default ProfilePage;