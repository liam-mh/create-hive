import React, { memo } from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLOURS, UNIT, TEXT, SHADOWS, CORNERS } from "@/styles";
import { Coordinate } from "@/types/Coordinate";
import { useMarkerImage } from '@/viewModels/CustomMarkerViewModel';

export interface CustomMarkerProps {
  coordinate: Coordinate;
  type: "artwork" | "event";
  id: string;
  text: string | null;
  isSelected: boolean;
  onPress?: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = (props) => {
  const {
    imageUri,
    imageOpacity,
    defaultImage,
    handleImageLoad,
    handleImageError,
    loading,
  } = useMarkerImage(props.type, props.id);

  const DEFAULT_SIZE = UNIT * 2.5;
  const colour = props.type === "event" ? COLOURS.primary : COLOURS.secondary;
  const corners = props.type === "event" ? 100 : CORNERS.default;

  return (
    <Marker
      coordinate={props.coordinate}
      key={`${props.type}-${props.id}`}
      tracksViewChanges={loading}
      testID={`custom-marker-${props.type}-${props.id}`}
    >
      <TouchableOpacity onPress={props.onPress} testID="marker-touchable">
        <View style={[styles.container, SHADOWS.containerShadow]} testID="marker-container">
          <View
            style={[
              styles.pin,
              {
                width: DEFAULT_SIZE + 8,
                height: DEFAULT_SIZE + 8,
                backgroundColor: colour,
                borderRadius: corners,
              },
            ]}
            testID={`pin-${props.type}`}
          >
            <View style={{ position: 'relative' }}>
              <Image
                source={defaultImage}
                style={[
                  StyleSheet.absoluteFillObject,
                  { 
                    width: DEFAULT_SIZE, 
                    height: DEFAULT_SIZE, 
                    borderRadius: corners 
                  },
                ]}
                testID="default-image"
              />
              {imageUri && (
                <Animated.Image
                  source={{ uri: imageUri }}
                  style={{
                    width: DEFAULT_SIZE,
                    height: DEFAULT_SIZE,
                    borderRadius: corners,
                    opacity: imageOpacity,
                  }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  testID="fetched-image"
                />
              )}
            </View>
          </View>

          <View
            style={[styles.triangle, { borderTopColor: colour }]}
            testID={`triangle-${props.type}`}
          />
          {props.text && (
            <Text style={[TEXT.small, styles.text]} testID="marker-text">
              {props.text}
            </Text>
          )}
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

export default memo(CustomMarker, (prev, next) =>
  prev.coordinate.latitude === next.coordinate.latitude &&
  prev.coordinate.longitude === next.coordinate.longitude &&
  prev.type === next.type &&
  prev.id === next.id &&
  prev.text === next.text &&
  prev.onPress === next.onPress
);