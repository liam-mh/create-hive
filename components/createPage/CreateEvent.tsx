import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';
import TimeDurationPicker from './TimeDurationPicker';
import EventTypeSelection from './EventTypeSelection';
import MediumSelection from './MediumSelection';
import PrivacySelection from './PrivacySelection';
import SmallMap from '../SmallMap';
import { Coordinate } from '@/types/Coordinate';
import TagManager, { TagManagerRef } from '../TagManager';
import { Event } from '@/models/Event';
import ImageUpload from './ImageUpload';


interface CreateEventProps {
  userId: string;
  userLocation: Coordinate;
  onSuccess: (event: Event) => void;
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId, props.userLocation));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [validationError, setValidationError] = useState<string | null>(null);
  const tagManagerRef = useRef<TagManagerRef>(null);

  const [typeReady, setTypeReady] = useState(false);
  const [mediumReady, setMediumReady] = useState(false);

  const handleCompletePress = async () => {
    setValidationError(null);
    if (tagManagerRef.current) {
      const currentTags = tagManagerRef.current.getFinalTags();
      viewModel.setEventTags(currentTags);
    }
    setLoading(true);
    const result = await viewModel.createEvent();
    setLoading(viewModel.loading); 

    if (typeof result === 'string') {
      setValidationError(result);
      console.log('Validation Error:', result);
    } else if (result) {
      props.onSuccess(result);
      console.log('Event creation successful!', result);
    } else {
      setError(viewModel.error || 'Failed to create event.');
      console.log('Event creation failed:', viewModel.error);
    }
  };

  useEffect(() => {
    setLoading(viewModel.loading);
    setError(viewModel.error);
  }, [viewModel.loading, viewModel.error]);

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
          <Text style={[TEXT.regular, {paddingBottom: UNIT}]}>what kind of event would you be hosting?</Text>
          <EventTypeSelection 
            onSelect={(type) => {
              viewModel.setEventType(type);
              if (viewModel.eventType) {
                setTypeReady(true);
              }
            }}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="art medium" addPadding expanded>
          <Text style={[TEXT.regular, {paddingBottom: UNIT}]}>what medium will you be using? pick the most dominant one.</Text>
          <MediumSelection
            onPrimarySelect={viewModel.setPrimaryMedium}
            onSecondarySelect={(secondary) => {
              viewModel.setSecondaryMedium(secondary);
              if (viewModel.eventMedium) {
                setMediumReady(true);
              }
            }}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="date" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>when will you be hosting the event?</Text>
            <CalendarDateTimeSelection onDateSelection={viewModel.setEventTimestamp} />
            <Text style={TEXT.boldGrey}>length</Text>
            <Text style={TEXT.regularGrey}>how long will the event run for?</Text>
            <TimeDurationPicker onTimeDurationChange={viewModel.setEventDuration} />
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="privacy" addPadding expanded>
          <PrivacySelection onSelect={viewModel.setEventPrivate} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="location" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>place a pin where you want the event to be</Text>
              <SmallMap 
                initialCoordinate={props.userLocation} 
                outputPin={{onPinDrop: viewModel.setVenueLocation}}            
              />
            <Text style={TEXT.regularGrey}>ensure you have contacted the venue prior</Text>

            <Text style={TEXT.bold}>venue</Text>
            <Text style={TEXT.regular}>the name of the location you intend to host at</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"cafe create" / "my house"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={viewModel.setVenueName}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>detials specific to the venue</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"floor 2, room 5" / "tell reception you are with create-hive" / "message me on arrival"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={viewModel.setVenueDetails}
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
              onChangeText={viewModel.setEventTitle}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>explain the contents of the event</Text>
            <TextInput style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"what to bring" / "what to expect" / "suggested experience level"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={viewModel.setEventDescription}
              autoCapitalize='none'
              multiline={true}
              textAlignVertical="top" 
              textAlign='left'
            />

            <Text style={TEXT.bold}>cover image</Text>
            <Text style={TEXT.regular}>upload a photo of the event</Text>
            <ImageUpload onUpload={viewModel.setImage} />

            <Text style={TEXT.bold}>tags</Text>
            <Text style={TEXT.regular}>help members discover you with related tags</Text>
            <Text style={TEXT.regularGrey}>the type of medium is automatically added, but try more such as: 'beginner', 'flowers', 'detailing'</Text>
            {typeReady && mediumReady ? (
              <>
                <TagManager
                  ref={tagManagerRef}
                  itemId={null} 
                  itemType={'event'}
                  medium={viewModel.eventMedium!} 
                  editTags
                />
                <Text style={TEXT.smallGrey}>empty tags will be removed</Text>
              </>
            ) : (
              <Text style={TEXT.regularError}>Select a primary and secondary medium to add tags.</Text>
            )}
            
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          style={styles.panelContainer} 
          onPress={handleCompletePress}
          disabled={loading}
        >
          <Text style={TEXT.regularWhite}>{loading ? 'submitting...' : 'submit event information'}</Text>
        </TouchableOpacity>
        {validationError && (
          <Text style={TEXT.regularError}>{validationError}</Text>
        )}
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
    overflow: 'visible'
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