import React, { Dispatch, RefObject, useMemo } from 'react';
import CustomMarker, { CustomMarkerProps } from '@/components/CustomMarker';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { MarkerManagerViewModel } from '@/viewModels/MarkerManagerViewModel';

interface MarkerManagerProps {
  markers: CustomMarkerProps[];
  mapRef: RefObject<MapView>;
  bottomSheetRef: RefObject<BottomSheet>;
  setSelectedMarkerData: Dispatch<React.SetStateAction<CustomMarkerProps | null>>;
  selectedMarkerData: CustomMarkerProps | null;
}

const MarkerManager: React.FC<MarkerManagerProps> = ({ markers, mapRef, bottomSheetRef, setSelectedMarkerData, selectedMarkerData }) => {
  const viewModel = useMemo(() => new MarkerManagerViewModel(
    markers, mapRef, bottomSheetRef, setSelectedMarkerData, selectedMarkerData), 
    [markers, mapRef, bottomSheetRef, setSelectedMarkerData, selectedMarkerData]
  );

  return (
    <>
      {viewModel.markers.map((marker) => {
        const markerKey = `${marker.type}-${marker.id}`;
        const isSelected = viewModel.selectedMarkerData && 
          viewModel.selectedMarkerData.id === marker.id && 
          viewModel.selectedMarkerData.type === marker.type;
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
            isSelected={!!isSelected}
            onPress={() => viewModel.handleMarkerPress(marker)}
          />
        );
      })}
    </>
  );
};

export default React.memo(MarkerManager);