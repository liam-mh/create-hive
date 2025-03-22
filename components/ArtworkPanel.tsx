import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { Artwork } from "@/models/Artwork";
import { CORNERS } from "@/styles";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface ArtworkPanelProps {
  artwork: Artwork;
  likes?: number;
}

const ArtworkPanel: React.FC<ArtworkPanelProps> = ( props ) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = await getImageUrl('artwork', props.artwork.artworkId);
      setImageUri(url);
    };
    fetchData();
  }, [props.artwork]);

  if (!props.artwork) {
    return <View><Text>Artwork not found.</Text></View>;
  }

  const defaultImage = require('@/assets/images/default-artwork-photo.jpg')

  return (
    <Image
      source={imageUri ? { uri: imageUri } : defaultImage}
      style={styles.image} 
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: CORNERS.default
  }
});

export default ArtworkPanel;