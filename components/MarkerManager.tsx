import React, { useState } from 'react';
import CustomMarker, { CustomMarkerProps } from '@/components/CustomMarker';

interface MarkerManagerProps {
  markers: CustomMarkerProps[];
}

const MarkerManager: React.FC<MarkerManagerProps> = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const handleMarkerPress = (markerKey: string) => {
    setSelectedMarker(prevSelectedMarker => {
      return prevSelectedMarker === markerKey ? null : markerKey;
    });
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
              longitude: marker.coordinate.longitude 
            }}
            type={marker.type}
            filename={marker.filename}
            text={marker.text}
            isSelected={isSelected}
            onPress={() => handleMarkerPress(markerKey)}
          />
        );
      })}
    </>
  );
};

export default MarkerManager;