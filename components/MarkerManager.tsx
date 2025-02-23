import React, { useState } from 'react';
import CustomMarker, { CustomMarkerProps } from '@/components/CustomMarker';

interface MarkerManagerProps {
  markers: CustomMarkerProps[];
}

const MarkerManager: React.FC<MarkerManagerProps> = ({ markers }) => {
  console.log('MARKER MANAGER: ', markers);

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

        console.log('MARKER: ', marker);

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
          />
         
        );
      })}
    </>
  );
};

export default MarkerManager;