import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  ImageStyle,
  StyleProp,
  View,
  StyleSheet,
} from 'react-native';
import { folderOptions, getImageUrl } from '@/hooks/useFirebaseStorage';
import { getIcon } from '@/utils/iconUtils';
import { SIZES, BUTTON_COLOURS } from '@/styles';

interface ImageLoaderProps {
  type: folderOptions;
  id: string;
  style?: StyleProp<ImageStyle>;
  borderRadius?: number;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  type,
  id,
  style,
  borderRadius,
  ...restProps
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const iconSize = SIZES.icon;
  const iconColour = BUTTON_COLOURS.secondaryText;  

  useEffect(() => {
    let isMounted = true;
    setError(false);
    setImageUri(null);
    imageOpacity.setValue(0);
    iconOpacity.setValue(1);

    const fetchImage = async () => {
      try {
        const url = await getImageUrl(type, id);
        if (isMounted) setImageUri(url);
      } catch (err) {
        console.warn(`Error fetching image URL for ${type}/${id}:`, err);
        if (isMounted) setError(true);
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [type, id]);

  const handleImageLoad = () => {
    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(iconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleImageError = () => {
    setImageUri(null);
    setError(true);
    imageOpacity.setValue(0);
    iconOpacity.setValue(1);
  };

  const fallbackIcon = (() => {
    if (error) {
      return getIcon('xCircle', iconSize, iconColour);
    }
    switch (type) {
      case 'event':
        return getIcon('brushFill', iconSize, iconColour);
      case 'artwork':
        return getIcon('paletteFill', iconSize, iconColour);
      case 'user':
        return getIcon('personFill', iconSize, iconColour);
      default :
        return getIcon('xCircle', iconSize, iconColour);
    }
  })();

  return (
    <View
      style={[
        styles.container,
        style,
        borderRadius !== undefined ? { borderRadius } : {},
      ]}
    >
      <Animated.View style={[styles.fallbackIconWrapper, { opacity: iconOpacity }]}>
        {fallbackIcon}
      </Animated.View>

      {imageUri && !error && (
        <Animated.Image
          source={{ uri: imageUri }}
          style={[styles.absoluteFill, { opacity: imageOpacity }]}
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...restProps}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: BUTTON_COLOURS.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  fallbackIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default ImageLoader;