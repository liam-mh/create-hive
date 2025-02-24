import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomMarkerProps } from '@/components/CustomMarker';

interface MarkerDetailsSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedMarkerData: CustomMarkerProps | null;
}

const MarkerDetailsSheet: React.FC<MarkerDetailsSheetProps> = ({ bottomSheetRef, selectedMarkerData }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
      <BottomSheetView style={styles.contentContainer}>
        {selectedMarkerData ? (
          <>
            <Text>Marker Details</Text>
            <Text>Type: {selectedMarkerData.type}</Text>
            <Text>Filename: {selectedMarkerData.filename}</Text>
            <Text>Text: {selectedMarkerData.text}</Text>
          </>
        ) : (
          <Text>Select a marker to view details.</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

export default MarkerDetailsSheet;