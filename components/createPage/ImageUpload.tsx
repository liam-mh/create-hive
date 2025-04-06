import { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';

interface ImageUploadProps {
  onUpload: (image: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ( props ) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      props.onUpload(selectedUri);  
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.panelContainer} onPress={() => pickImage()} >
        <Text style={TEXT.regularPrimary}>select an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover"/>}
    </View>
  );
}  

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: UNIT
  },
  image: {
    width: '100%',
    height: UNIT*15,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
  },
  panelContainer: {
    width: '100%',
    gap: UNIT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: UNIT,
    backgroundColor: COLOURS.white,
    borderRadius: CORNERS.default,
    borderWidth: 2,
    borderColor: COLOURS.primary,
  },
});
