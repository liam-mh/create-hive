import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomMarkerProps } from '@/components/CustomMarker';
import EventCard from './EventCard';
import ArtworkCard from './ArtworkCard';
import { UNIT } from '@/styles';

interface MarkerDetailsSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedMarkerData: CustomMarkerProps | null;
}

const MarkerDetailsSheet: React.FC<MarkerDetailsSheetProps> = ( props ) => {
  if (!props.selectedMarkerData) return null;

  return (
    <BottomSheet ref={props.bottomSheetRef} enablePanDownToClose={true} index={0} >
      <BottomSheetView style={styles.contentContainer}>
        {props.selectedMarkerData?.type == 'event' ? (
          <EventCard eventId={props.selectedMarkerData.id} />
        ) : (
          <ArtworkCard artworkId={props.selectedMarkerData.id} />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingBottom: UNIT / 2
  },
});

export default MarkerDetailsSheet;