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
    setHasError(false); // Reset error state on re-fetch

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
    >
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.container, SHADOWS.containerShadow]}>
          <View style={[styles.pin, { width: DEFAULT_SIZE + 8, height: DEFAULT_SIZE + 8, backgroundColor: colour, borderRadius: corners }]}>
            {loading ? (
              <ActivityIndicator size="small" color={COLOURS.white} />
            ) : (
              <Image
                source={imageUri ? { uri: imageUri } : defaultImage}
                style={[{ width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: corners }]}
                onError={() => {
                  console.log("Error loading image from URI, falling back to default.");
                  setImageUri(null); // Clear the URI so the default image is shown
                }}
              />
            )}
          </View>

          <View style={[styles.triangle, { borderTopColor: colour }]} />

          {props.text && <Text style={[TEXT.small, styles.text]}>{props.text}</Text>}
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