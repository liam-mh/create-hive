import { UNIT } from '@/styles';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileTabEventsDisplay from './ProfileTabEventsDisplay';
import ProfileTabVerification from './ProfileTabVerification';
import ProfileTabArtwork from './ProfileTabArtwork';
import SlidingTabSelector from '../SlidingTabSelector';

type ProfileTab = 'events' | 'artwork' | 'verification';

interface ProfileTabSelectorProps {
  userId: string;
}

const ProfileTabSelector: React.FC<ProfileTabSelectorProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('events');
  const [mountedTabs, setMountedTabs] = useState<ProfileTab[]>(['events']); 

  const handleTabChange = (tab: ProfileTab) => {
    if (!mountedTabs.includes(tab)) {
      setMountedTabs((prev) => [...prev, tab]); 
    }
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <SlidingTabSelector
        tabs={[
          {
            icon: 'brushFill',
            onPress: () => handleTabChange('events'),
          },
          {
            icon: 'paletteFill',
            onPress: () => handleTabChange('artwork'),
          },
          {
            icon: 'personFill',
            onPress: () => handleTabChange('verification'),
          },
        ]}
        style={{ marginHorizontal: 16, marginBottom: UNIT }}
      />

      <View style={styles.container}>
        {mountedTabs.includes('events') && (
          <View style={{ display: activeTab === 'events' ? 'flex' : 'none' }}>
            <ProfileTabEventsDisplay userId={userId} />
          </View>
        )}
        {mountedTabs.includes('artwork') && (
          <View style={{ display: activeTab === 'artwork' ? 'flex' : 'none' }}>
            <ProfileTabArtwork userId={userId} />
          </View>
        )}
        {mountedTabs.includes('verification') && (
          <View style={{ display: activeTab === 'verification' ? 'flex' : 'none' }}>
            <ProfileTabVerification userId={userId} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileTabSelector;