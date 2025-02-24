import React, { useEffect, useState } from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOURS, UNIT, TEXT, SHADOWS } from "@/styles";
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

const CustomMarker: React.FC<CustomMarkerProps> = ({ coordinate, type = 'event', id, text, onPress }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const url = await getImageUrl(type, id);
        setImageUri(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [type, id]);

  const colour = type === "event" ? COLOURS.primary : COLOURS.secondary;
  const corners = type === "event" ? 100 : 2;

  if (loading || !imageUri) {
    return (
      <Marker coordinate={coordinate} tracksViewChanges={false}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLOURS.primary} />
          <Text style={TEXT.small}>Loading...</Text>
        </View>
      </Marker>
    );
  }

  return (
    <Marker 
      coordinate={coordinate} 
      key={`${type}-${id}`}
      tracksViewChanges={false}
    >
      <TouchableOpacity onPress={onPress}> 
        <View style={[styles.container, [SHADOWS.containerShadow]]}>
          <View style={[styles.pin, { width: DEFAULT_SIZE + 8, height: DEFAULT_SIZE + 8, backgroundColor: colour, borderRadius: corners }]}>
            <Image source={{ uri: imageUri }} style={[{ width: DEFAULT_SIZE, height: DEFAULT_SIZE, borderRadius: corners }]} />
          </View>

          <View style={[styles.triangle, {borderTopColor: colour }]} />

          <Text style={[TEXT.small, styles.text]}>{text}</Text>
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  loadingContainer: {
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

export default CustomMarker;