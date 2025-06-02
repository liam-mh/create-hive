import { COLOURS, TEXT, UNIT } from '@/styles';
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return <ProfileTabEventsDisplay userId={userId} />;
      case 'artwork':
        return <ProfileTabArtwork userId={userId} />;
      case 'verification':
        return <ProfileTabVerification userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SlidingTabSelector
        tabs={[
          {
            icon: 'brushFill',
            onPress: () => setActiveTab('events'),
          },
          {
            icon: 'paletteFill',
            onPress: () => setActiveTab('artwork'),
          },
          {
            icon: 'personFill',
            onPress: () => setActiveTab('verification'),
          },
        ]}
        style={{ marginHorizontal: 16, marginBottom: UNIT }}
      />
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileTabSelector;