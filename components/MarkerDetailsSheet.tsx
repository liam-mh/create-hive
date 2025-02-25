import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomMarkerProps } from '@/components/CustomMarker';
import EventCard from './EventCard';

interface MarkerDetailsSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedMarkerData: CustomMarkerProps | null;
}

const MarkerDetailsSheet: React.FC<MarkerDetailsSheetProps> = ({ bottomSheetRef, selectedMarkerData }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true} 
    >
      <BottomSheetView style={styles.contentContainer}>
        {selectedMarkerData?.type == 'event' ? (
          <EventCard eventId={selectedMarkerData.id} />
        ) : (
          <View>
            <Text>Artwork</Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default MarkerDetailsSheet;