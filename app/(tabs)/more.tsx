import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import ProfileCard from '@/components/ProfileCard';
import ProfileTabSelector from '@/components/ProfileTabSelector';
import { getUserById } from '@/services/userService';
import TEXT, { COLOURS, DIVS, UNIT } from '@/styles';
import { User } from '@/models/User';

interface MoreProps {
  userId: string;
}

const More: React.FC<MoreProps> = ( props ) => { 
  if (!props.userId) {
    props.userId = 'FghLfeUlFYO0RMZYjzI3'
  }
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById('FghLfeUlFYO0RMZYjzI3'); 
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [props.userId]); 

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
            <ProfileCard userId={'FghLfeUlFYO0RMZYjzI3'} /> 
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

export default More;