import CustomHeader from '@/components/CustomHeader';
import TEXT, { SIZES, UNIT, COLOURS, CORNERS } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { Event } from '@/models/Event';
import InformationButton from '@/components/buttons/InformationButton';
import CreateArtwork from '@/components/createPage/CreateArtwork';
import CreateEventScreen from '@/components/createPage/CreateEventScreen';
import { CreateEventProvider } from '@/context/createEventContext';

export default function Create() {
  const userId = useAuth().user!.userId;
  const userLocation = useAuth().user!.location;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [successfulCreateEvent, setSuccessfulCreateEvent] = useState<Event | null>(null);
  const [successfulCreateArtwork, setSuccessfulCreateArtwork] = useState<Event | null>(null);
  const [showCreateArtwork, setShowCreateArtwork] = useState(false);

  const iconEvent = getIcon('calendarPlus', SIZES.l, COLOURS.white);
  const iconArtwork = getIcon('paletteFill', SIZES.l, COLOURS.white);
  const iconSuccess = getIcon('checkCircle', SIZES.l, COLOURS.primary);

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

  const handleResetCreate = () => {
    setShowCreateEvent(false);
    setShowCreateArtwork(false);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <CustomHeader hideBackButton showCreateIcon={handleResetCreate}>
        <Text style={TEXT.h1}>create</Text>
      </CustomHeader>

      {successfulCreateEvent ? (
        <View style={{flex: 1, backgroundColor: COLOURS.white, width:'100%'}}>
          <View style={styles.successContainer}>
            {iconSuccess}
            <Text style={TEXT.boldPrimary}>event created</Text>
            <Text style={TEXT.regularGrey}>view your new event</Text>
            <InformationButton type={'event'} id={successfulCreateEvent.eventId} />
          </View>
        </View>
      ) : (
        <ScrollView
          style={[
            styles.container,
            (showCreateArtwork || showCreateEvent) && { backgroundColor: COLOURS.white },
          ]}
        >
          {showCreateEvent && !successfulCreateEvent &&
            <CreateEventProvider>
              <CreateEventScreen 
                onSuccess={setSuccessfulCreateEvent}
                onRefresh={handleResetCreate}
              />
            </CreateEventProvider>
          }
          {showCreateArtwork && !successfulCreateArtwork &&
            <CreateArtwork 
              userId={userId} 
              userLocation={userLocation} 
              onSuccess={setSuccessfulCreateEvent}
              onRefresh={handleResetCreate}
            />
          }
        </ScrollView>
      )}

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: UNIT,
    backgroundColor: COLOURS.offwhite,
  },
  successContainer: {
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: UNIT,
    backgroundColor: COLOURS.white
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
  },
  panelContainer: {
    flex: 1,
    gap: UNIT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: UNIT,
    backgroundColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  sheetContentContainer: {
    padding: UNIT,
    alignItems: 'center',
    gap: UNIT,
  },
});