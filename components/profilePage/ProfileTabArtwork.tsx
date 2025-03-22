import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import { DIVS, UNIT } from '@/styles';
import ArtworkPanelReel from '../ArtworkPanelReel';
import ProfileTabArtworkViewModel from '@/viewModels/ProfileTabArtworkViewModel';
import { Artwork } from '@/models/Artwork';

interface ProfileTabArtworkProps {
  userId: string;
}

const ProfileTabArtwork: React.FC<ProfileTabArtworkProps> = (props) => {
  const viewModel = new ProfileTabArtworkViewModel(props.userId);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [newArtwork, setNewArtwork] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await viewModel.fetchData();
        setNewArtwork(viewModel.newArtwork);
      } catch (e) {
        setError('Failed to fetch artwork.');
        console.error('Error fetching artwork:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [props.userId]);

  if (loading) {
    return (
      <View style={styles.contentContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.contentContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      {newArtwork && newArtwork.length > 0 && (
        <View style={styles.sectionContainer}>
          <ContentDropdownContainer
            title={'new'}
            addPadding={true}
            expanded={true}
            children={<ArtworkPanelReel artwork={newArtwork} />}
          />
        </View>
      )}
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
    overflow: 'visible',
  },
});

export default ProfileTabArtwork;