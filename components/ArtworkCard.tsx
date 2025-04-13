import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';

import InformationButton from './buttons/InformationButton';
import DetailsContainer from './DetailsContainer';
import DetailsRow from './DetailsRow';
import SaveButton from './buttons/Savebutton';
import { useAuth } from '@/context/authContext';
import ArtworkCardViewModel from '@/viewModels/ArtworkCardViewModel';
import { Artwork } from '@/models/Artwork';
import VisitProfileButton from './buttons/VisitProfileButton';

interface ArtworkCardProps {
  artworkId: string;
  inputArtwork?: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ( props ) => {
  let viewModel = null;
  props.inputArtwork
    ? viewModel = new ArtworkCardViewModel(props.artworkId, props.inputArtwork)
    : viewModel = new ArtworkCardViewModel(props.artworkId);
  
  const userId = useAuth().user!.userId;
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [artwork, setArtwork] = useState(viewModel.artwork);
  const [imageUri, setImageUri] = useState(viewModel.imageUri);
  const [icon, setIcon] = useState(viewModel.icon);
  const [artist, setArtist] = useState(viewModel.artist);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchArtworkData();
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setArtwork(viewModel.artwork);
      setImageUri(viewModel.imageUri);
      setIcon(viewModel.icon);
      setArtist(viewModel.artist);
    };
    fetchData();
  }, [props]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }
  if (!artwork) {
    return <View style={styles.contentContainer}><Text>Artwork not found.</Text></View>;
  }

  const defaultImage = require('@/assets/images/default-artwork-photo.jpg')

  return (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.innerRow}>
          <Text style={TEXT.h1}>{artwork.medium.primary}</Text>
          {icon}
        </View>
        <View style={styles.innerRow}>
          <SaveButton itemId={artwork.artworkId} itemType={'artwork'} userId={userId} isIconButton={true} />
        </View>
      </View>
      
      <DetailsContainer>
        <DetailsRow iconName='cardHeading' text={`${artwork.title}`} />
        <DetailsRow iconName='palette' text={`${artwork.medium.primary} - ${artwork.medium.secondary}`} />
        <DetailsRow iconName='person' text={`${artist?.userAt.toLocaleLowerCase()}`} profileLink={artist?.userId} />
      </DetailsContainer>

      <View style={styles.imageContainer}>
        <Image
          source={imageUri ? { uri: imageUri } : defaultImage}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <InformationButton type={'artwork'} id={artwork.artworkId} />
        <VisitProfileButton id={artwork.userId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: UNIT * 15,
  },
  contentContainer: {
    padding: UNIT,
    gap: UNIT,
    width: '100%',
    backgroundColor: COLOURS.white
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: UNIT,
    alignItems: 'center'
  },
});

export default ArtworkCard;