import CustomHeader from '@/components/CustomHeader';
import TEXT, { SIZES, UNIT, COLOURS, CORNERS } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import CreateEvent from '@/components/createPage/CreateEvent';
import { useAuth } from '@/context/authContext';

export default function Create() {
  const userId = useAuth().user!.userId;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateArtwork, setShowCreateArtwork] = useState(false);

  const iconEvent = getIcon('calendarPlus', SIZES.l, COLOURS.white);
  const iconArtwork = getIcon('paletteFill', SIZES.l, COLOURS.white);

  const handleEventPress = () => {
    setShowCreateEvent(true);
    setShowCreateArtwork(false);
    bottomSheetRef.current?.close(); 
  };

  const handleArtworkPress = () => {
    setShowCreateEvent(false);
    setShowCreateArtwork(true);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <CustomHeader hideBackButton>
        <Text style={TEXT.h1}>create</Text> 
      </CustomHeader>

      <View style={styles.container}>
        {showCreateEvent && <CreateEvent userId={userId} />}

      </View>

      <GestureHandlerRootView>
        <BottomSheet ref={bottomSheetRef}>
          <BottomSheetView style={styles.sheetContentContainer}>
            <Text style={TEXT.bold}>What would you like to create?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.panelContainer} onPress={handleEventPress}>
                {iconEvent}
                <Text style={TEXT.regularWhite}>Host an event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.panelContainer} onPress={handleArtworkPress}>
                {iconArtwork}
                <Text style={TEXT.regularWhite}>Post my artwork</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingVertical: UNIT,
    backgroundColor: COLOURS.white
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
  },
  panelContainer: {
    flex: 1,
    gap: UNIT/2,
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: UNIT,
    backgroundColor: COLOURS.primary,
    borderRadius: CORNERS.default
  },
  sheetContentContainer: {
    padding: UNIT,
    alignItems: 'center',
    gap: UNIT
  },
});