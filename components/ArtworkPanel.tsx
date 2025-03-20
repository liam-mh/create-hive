import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface ArtworkPanelProps {
  artworkId: string;
  likes?: number;
}

const ArtworkPanel: React.FC<ArtworkPanelProps> = ( props ) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = await getImageUrl('artwork', props.artworkId);
      setImageUri(url);
    };
    fetchData();
  }, [props.artworkId]);

  if (!props.artworkId) {
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
  }
});

export default ArtworkPanel;