import React, { useState, useRef } from 'react';
import CustomMarker, { CustomMarkerProps } from '@/components/CustomMarker';
import MapView, { Region } from 'react-native-maps';
import { Coordinate } from '@/types/Coordinate';

interface MarkerManagerProps {
  markers: CustomMarkerProps[];
  mapRef: React.RefObject<MapView>;
}

const MarkerManager: React.FC<MarkerManagerProps> = ({ markers, mapRef }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleMarkerPress = (markerKey: string, coordinate: Coordinate) => { 
    setSelectedMarker(prevSelectedMarker => {
      return prevSelectedMarker === markerKey ? null : markerKey;
    });

    if (mapRef.current) {
      const region: Region = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapRef.current.animateToRegion(region, 350);
    }
  };

  return (
    <>
      {markers.map((marker) => {
        const markerKey = `${marker.type}-${marker.filename}`;
        const isSelected = selectedMarker === markerKey;
        return (
          <CustomMarker
            key={markerKey}
            coordinate={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            type={marker.type}
            filename={marker.filename}
            text={marker.text}
            isSelected={isSelected}
            onPress={() => handleMarkerPress(markerKey, marker.coordinate)} 
          />
        );
      })}
    </>
  );
};

export default MarkerManager;