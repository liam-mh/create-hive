import React, { memo, useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOURS, UNIT, TEXT, SHADOWS, CORNERS } from "@/styles";
import { Coordinate } from "@/types/Coordinate";
import { getImageUrl } from "@/hooks/useFirebaseStorage";

const DEFAULT_SIZE = UNIT * 2.5;

export interface CustomMarkerProps {
  coordinate: Coordinate;
  type: "artwork" | "event";
  id: string;
  text: string | null;
  isSelected: boolean;
  onPress?: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ( props ) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  let defaultImage = null;
  if (props.type === 'event') {
    defaultImage = require('@/assets/images/default-event-pin.jpg');
  } else {
    defaultImage = require('@/assets/images/default-artwork-photo.jpg');
  }
  const colour = props.type === "event" ? COLOURS.primary : COLOURS.secondary;
  const corners = props.type === "event" ? 100 : CORNERS.default;

  useEffect(() => {
    let isMounted = true;
    setHasError(false);

    const fetchImage = async () => {
      try {
        setLoading(true);
        const url = await getImageUrl(props.type, props.id);
        if (isMounted) {
          setImageUri(url);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching image URL:", error);
        if (isMounted) {
          setLoading(false);
          setHasError(true);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [props.type, props.id]);

  return (
    <Marker
      coordinate={props.coordinate}
      key={`${props.type}-${props.id}`}
      tracksViewChanges={loading}
      testID={`custom-marker-${props.type}-${props.id}`} 
    >
      <TouchableOpacity 
        onPress={props.onPress} 
        testID="marker-touchable"
      >
        <View 
          style={[styles.container, SHADOWS.containerShadow]} 
          testID="marker-container"
        >
          <View 
            style={[styles.pin, { width: DEFAULT_SIZE + 8, height: DEFAULT_SIZE + 8, backgroundColor: colour, borderRadius: corners }]} 
            testID={`pin-${props.type}`}
          >
            {loading ? (
              <ActivityIndicator 
                size="small" 
                color={COLOURS.white} 
                testID="loading-indicator" 
              />
            ) : (
              <Image
                source={imageUri ? { uri: imageUri } : defaultImage}
                style={[{ width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: corners }]}
                onError={() => {
                  console.log("Error loading image from URI, falling back to default.");
                  setImageUri(null); 
                }}
                testID={imageUri ? 'fetched-image' : `default-image-${props.type}`}
              />
            )}
          </View>

          <View 
            style={[styles.triangle, { borderTopColor: colour }]} 
            testID={`triangle-${props.type}`} 
          />
          {props.text && 
            <Text 
              style={[TEXT.small, styles.text]} 
              testID="marker-text">{props.text}
            </Text>
          }
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pin: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  text: {
    marginTop: 4,
  },
});

export default memo(CustomMarker, (prevProps, nextProps) => {
  return (
    prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
    prevProps.coordinate.longitude === nextProps.coordinate.longitude &&
    prevProps.type === nextProps.type &&
    prevProps.id === nextProps.id &&
    prevProps.text === nextProps.text &&
    prevProps.onPress === nextProps.onPress
  );
});