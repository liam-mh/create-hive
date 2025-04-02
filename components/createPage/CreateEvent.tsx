import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { Medium, PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import { Timestamp } from 'firebase/firestore';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';
import TimeDurationPicker from './TimeDurationPicker';
import EventTypeSelection from './EventTypeSelection';
import MediumSelection from './MediumSelection';
import PrivacySelection from './PrivacySelection';
import SmallMap from '../SmallMap';
import { Coordinate } from '@/types/Coordinate';
import ImagePickerExample from './ImagePicker';
import TagManager, { TagManagerRef } from '../TagManager';
import { createMedium } from '@/utils/mediumUtils';

interface CreateEventProps {
  userId: string;
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  // Event Type Selection State
  const [selectedEventKind, setSelectedEventKind] = useState<string | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<boolean>(false);

  // Art Medium Selection States
  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(null);

  // Date and Time Selection States
  const [selectedTimestamp, setSelectedTimestamp] = useState<Timestamp | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00'); 
  const [timeDuration, setTimeDuration] = useState<number>(0);

  const [venueName, setVenueName] = useState<string>('');
  const [venueDetails, setVenueDetails] = useState<string>('');
  const [venueLocation, setVenueLocation] = useState<Coordinate | null>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [finalTags, setFinalTags] = useState<string[] | null>(null);
  const tagManagerRef = useRef<TagManagerRef>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      // await viewModel.loadData(); 
      // setLoading(viewModel.loading);
      setLoading(false);
      setError(viewModel.error);
    };

    fetchData();
  }, [props.userId, viewModel]);

  const handleEventKindSelect = (eventType: string | null) => {
    setSelectedEventKind(eventType);
    console.log('Selected Event Kind:', eventType);
  };

  const handlePrimarySelect = (primary: PrimaryMedium | null) => {
    setSelectedPrimary(primary);
    setSelectedSecondary(null);
    setFinalTags(null);
  };

  const handleSecondarySelect = (secondary: SecondaryMedium | null) => {
    setSelectedSecondary(secondary);
    setFinalTags(null);
    console.log('Selected Secondary:', secondary);
  };

  const handleDateSelection = (timestamp: Timestamp | null) => {
    setSelectedTimestamp(timestamp);
    if (timestamp) {
      const date = timestamp.toDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setStartTime(`${hours}:${minutes}`);
      console.log('Selected Timestamp:', date);
    } else {
      console.log('No Timestamp selected');
      setStartTime('12:00');
    }
  };

  const handleTimeDurationChange = (duration: number) => {
    setTimeDuration(duration);
    console.log('Time Duration:', duration);
  };

  const handlePrivacyKindSelect = (isPrivate: boolean) => {
    setSelectedPrivacy(isPrivate);
    console.log('Selected Event Privacy:', isPrivate); 
  };

  const handleLocationSelected = (coordinate: Coordinate | null) => {
    setVenueLocation(coordinate);
    console.log('Selected Coordinate:', coordinate);
  };

  const handleReturnTagsPress = () => {
    if (tagManagerRef.current) {
      const currentTags = tagManagerRef.current.getFinalTags();
      setFinalTags(currentTags); 
      console.log("Returned final tags:", currentTags);
    } else {
      console.log("TagManager ref not available yet.");
        if (!selectedPrimary || !selectedSecondary) {
          console.log("Please select primary and secondary medium first.");
        }
        setFinalTags([]); 
    }
  };

  const eventMedium = React.useMemo(() => {
    if (selectedPrimary && selectedSecondary) {
      return createMedium(selectedPrimary, selectedSecondary) as Medium;
    }
    return null; 
  }, [selectedPrimary, selectedSecondary]);



  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="event type" addPadding expanded>
          <EventTypeSelection onSelect={handleEventKindSelect} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="art medium" addPadding expanded>
          <MediumSelection
            onPrimarySelect={handlePrimarySelect}
            onSecondarySelect={handleSecondarySelect}
            selectedPrimary={selectedPrimary}
            selectedSecondary={selectedSecondary}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="date" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>when will you be hosting the event?</Text>
            <CalendarDateTimeSelection onDateSelection={handleDateSelection} />
            {selectedTimestamp && (
              <>
                <Text style={TEXT.boldGrey}>length</Text>
                <Text style={TEXT.regularGrey}>how long will the event run for?</Text>
                <TimeDurationPicker onTimeDurationChange={handleTimeDurationChange} />
              </>
            )}
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="privacy" addPadding expanded>
          <PrivacySelection onSelect={handlePrivacyKindSelect} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="location" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>place a pin where you want the event to be</Text>
              {/* MAP NEEDS USER CONTEXT */}
              <SmallMap 
                initialCoordinate={ {latitude: 51.5074, longitude: 0.1278} } 
                outputPin={{onPinDrop: handleLocationSelected}}            
              />
            <Text style={TEXT.regularGrey}>ensure you have contacted the venue prior</Text>

            <Text style={TEXT.bold}>venue</Text>
            <Text style={TEXT.regular}>the name of the location you intend to host at</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"cafe create" / "my house"`}
              placeholderTextColor={COLOURS.darkgrey}
              value={venueName} 
              onChangeText={setVenueName}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>detials specific to the venue</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"floor 2, room 5" / "tell reception you are with create-hive" / "message me on arrival"`}
              placeholderTextColor={COLOURS.darkgrey}
              value={venueDetails} 
              onChangeText={setVenueDetails}
              autoCapitalize='none'
              multiline={true}
              textAlignVertical="top" 
              textAlign='left'
            />

          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="details" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>what is the title of the event?</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"back to basics" / "paint the cafe with me"`}
              placeholderTextColor={COLOURS.darkgrey}
              value={title} 
              onChangeText={setTitle}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>explain the contents of the event</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"what to bring" / "what to expect" / "suggested experience level"`}
              placeholderTextColor={COLOURS.darkgrey}
              value={description} 
              onChangeText={setDescription}
              autoCapitalize='none'
              multiline={true}
              textAlignVertical="top" 
              textAlign='left'
            />

            <Text style={TEXT.bold}>cover image</Text>
            <Text style={TEXT.regular}>upload a photo of the event</Text>
            <ImagePickerExample />

            <Text style={TEXT.bold}>tags</Text>
            <Text style={TEXT.regular}>help members discover you with related tags</Text>
            <Text style={TEXT.regularGrey}>the type of medium is automatically added, but try more such as: 'beginner', 'flowers', 'detailing'</Text>
            {eventMedium ? (
              <TagManager
                ref={tagManagerRef}
                itemId={null} 
                itemType={'event'}
                medium={eventMedium} 
                editTags
              />
            ) : (
                 <Text style={TEXT.regularError}>Select a primary and secondary medium to add tags.</Text>
            )}
            <Text style={TEXT.smallGrey}>empty tags will be removed</Text>
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.panelContainer} onPress={handleReturnTagsPress}>
          <Text style={TEXT.regularWhite}>return tags</Text>
        </TouchableOpacity>
        <Text>
          {finalTags !== null
              ? `Final Tags: ${JSON.stringify(finalTags)}`
              : 'Press "return tags" to see the final list.'}
        </Text>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    overflow: 'visible',
    paddingBottom: UNIT,
  },
  sectionContainer: {
    paddingHorizontal: UNIT,
  },
  gapContainer: {
    gap: UNIT,
  },
  textInput: {
    flexDirection: 'row',
    gap: UNIT,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
    padding: UNIT,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: UNIT / 2,
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
});

export default CreateEvent;