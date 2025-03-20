import { COLOURS, TEXT, UNIT } from '@/styles';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileTabEventsDisplay from './ProfileTabEventsDisplay';
import ProfileTabVerification from './ProfileTabVerification';
import ProfileTabArtwork from './ProfileTabArtwork';

type ProfileTab = 'events' | 'artwork' | 'verification';

const ProfileTabSelector = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('events');

  const handleTabPress = (tabName: ProfileTab) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events':
        return (
          <ProfileTabEventsDisplay userId={'FghLfeUlFYO0RMZYjzI3'} />
        );
      case 'artwork':
        return (
          <ProfileTabArtwork userId={'FghLfeUlFYO0RMZYjzI3'} />
        );
      case 'verification':
        return (
          <ProfileTabVerification userId={'FghLfeUlFYO0RMZYjzI3'} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'events' && styles.activeTabBorder]}
          onPress={() => handleTabPress('events')}
        >
          <Text style={activeTab === 'events' ? TEXT.regularPrimary : TEXT.regular}>
            events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'artwork' && styles.activeTabBorder]}
          onPress={() => handleTabPress('artwork')}
        >
          <Text style={activeTab === 'artwork' ? TEXT.regularPrimary : TEXT.regular}>
            artwork
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'verification' && styles.activeTabBorder]}
          onPress={() => handleTabPress('verification')}
        >
          <Text style={activeTab === 'verification' ? TEXT.regularPrimary : TEXT.regular}>
            verification
          </Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLOURS.white,
    paddingBottom: UNIT
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: UNIT/4
  },
  activeTabBorder: {
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.primary,
  },
});

export default ProfileTabSelector;