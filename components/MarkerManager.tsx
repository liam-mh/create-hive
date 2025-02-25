import React, { useState, useRef, Dispatch, RefObject } from 'react';
import CustomMarker, { CustomMarkerProps } from '@/components/CustomMarker';
import MapView, { Region } from 'react-native-maps';
import { Coordinate } from '@/types/Coordinate';
import BottomSheet from '@gorhom/bottom-sheet';

interface MarkerManagerProps {
  markers: CustomMarkerProps[];
  mapRef: RefObject<MapView>;
  bottomSheetRef: RefObject<BottomSheet>;
  setSelectedMarkerData: Dispatch<React.SetStateAction<CustomMarkerProps | null>>;
  selectedMarkerData: CustomMarkerProps | null;
}

const MarkerManager: React.FC<MarkerManagerProps> = ({ markers, mapRef, bottomSheetRef, setSelectedMarkerData, selectedMarkerData }) => {
  const handleMarkerPress = (markerData: CustomMarkerProps) => {
    setSelectedMarkerData(prevSelectedMarkerData => {
      if (prevSelectedMarkerData && prevSelectedMarkerData.id === markerData.id && prevSelectedMarkerData.type === markerData.type) {
        bottomSheetRef.current?.close();
        return null;
      } else {
        bottomSheetRef.current?.expand();
        return markerData;
      }
    });

    if (mapRef.current) {
      const region: Region = {
        latitude: markerData.coordinate.latitude-0.004,
        longitude: markerData.coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapRef.current.animateToRegion(region, 350);
    }
  };

  return (
    <>
      {markers.map((marker) => {
        const markerKey = `${marker.type}-${marker.id}`;
        const isSelected = selectedMarkerData && selectedMarkerData.id === marker.id && selectedMarkerData.type === marker.type ? true : false;
        return (
          <CustomMarker
            key={markerKey}
            coordinate={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            type={marker.type}
            id={marker.id}
            text={marker.text}
            isSelected={isSelected}
            onPress={() => handleMarkerPress(marker)}
          />
        );
      })}
    </>
  );
};

export default MarkerManager;