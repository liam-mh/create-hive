import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import ContentDropdownContainer from './ContentDropdownContainer';
import { DIVS, UNIT } from '@/styles';
import ArtworkPanelReel from './ArtworkPanelReel';

interface ProfileTabArtworkProps {
  userId: string;
}

const ProfileTabArtwork: React.FC<ProfileTabArtworkProps> = ( props ) => {

  if (!props) {
    return <View style={styles.contentContainer}><Text>No artwork to show.</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'new'} 
          addPadding={true}
          expanded={true}
          children={
            <ArtworkPanelReel
              artworkPanelProps={[
                { artworkId: 'UmXdEypRkdkOo8aiR1SQ', likes: 33 }, 
                { artworkId: 'UmXdEypRkdkOo8aiR1SQ', likes: 33 }, 
                { artworkId: 'UmXdEypRkdkOo8aiR1SQ', likes: 33 }, 
              ]}
            />
          }
        />
      </View>
      <View style={DIVS.offwhite} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    paddingBottom: UNIT,
  },
  sectionContainer: {
    paddingInline: UNIT,
    overflow: 'visible'
  }
});

export default ProfileTabArtwork;