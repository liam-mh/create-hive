import CustomHeader from '@/components/CustomHeader';
import TEXT, { SIZES, UNIT, COLOURS, CORNERS } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef } from 'react';

export default function Create() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  let createEvent = false;
  let createArtwork = false;

  const iconEvent = getIcon('calendarPlus', SIZES.l, COLOURS.white);
  const iconArtwork = getIcon('paletteFill', SIZES.l, COLOURS.white);

  const handleEventPress = () => {
    createArtwork = false;
    createEvent = true;
  }

  const handleArtworkPress = () => {
    createEvent = false;
    createArtwork = true;
  }

  return (
    <>
      <CustomHeader
        hideBackButton
        children={
          <Text style={TEXT.h1}>create</Text> 
        }
      />

      <View style={styles.container}>
       {createEvent && (<CreateEvent />)}
       {createArtwork && (<CreateArtwork />)} 
      </View>

      <GestureHandlerRootView>
        <BottomSheet ref={bottomSheetRef}>
          <BottomSheetView style={styles.sheetContentContainer}>
            <Text style={TEXT.bold}>what would you like to create?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.panelContainer} onPress={handleEventPress}>
                {iconEvent}
                <Text style={TEXT.regularWhite}>host an event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.panelContainer} onPress={handleArtworkPress}>
                {iconArtwork}
                <Text style={TEXT.regularWhite}>post my artwork</Text>
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
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
  },
  panelContainer: {
    flex: 1,
    gap: UNIT,
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