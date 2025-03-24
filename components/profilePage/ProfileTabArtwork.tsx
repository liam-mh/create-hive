import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { DIVS, UNIT } from '@/styles';
import ArtworkPanelReel from '../ArtworkPanelReel';
import ProfileTabArtworkViewModel from '@/viewModels/ProfileTabArtworkViewModel';
import { Artwork } from '@/models/Artwork';

interface ProfileTabArtworkProps {
  userId: string;
}

const ProfileTabArtwork: React.FC<ProfileTabArtworkProps> = ( props ) => {
  const [viewModel] = useState(() => new ProfileTabArtworkViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [newArtwork, setNewArtwork] = useState<Artwork[]>([]);
  const [allArtwork, setAllArtwork] = useState<Artwork[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchData();
      await viewModel.fetchInitialArtwork();
  
      setNewArtwork([...viewModel.newArtwork]);
      setAllArtwork([...viewModel.artwork]);
      
      setLoading(viewModel.loading);
      setError(viewModel.error);
    };
  
    fetchData();
  }, [props.userId]);

  const loadMoreArtwork = async () => {
    if (!viewModel.lastDocument) return; 

    setIsFetchingMore(true);
    await viewModel.fetchNextPage();
    
    setAllArtwork([...viewModel.artwork]); 
    setIsFetchingMore(false);
  };

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title='new' addPadding expanded>
          <ArtworkPanelReel artwork={newArtwork} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title='all' addPadding expanded>
          <ArtworkPanelReel artwork={allArtwork} />
          {viewModel.lastDocument && (
            <View style={styles.loadMoreContainer}>
              <Text onPress={loadMoreArtwork} style={TEXT.regularPrimary}>
                {isFetchingMore ? 'loading...' : 'load more'}
              </Text>
            </View>
          )}
        </ContentDropdownContainer>
      </View>
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
  loadMoreContainer: {
    padding: UNIT,
    alignItems: 'center',
  },
});

export default ProfileTabArtwork;