import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, UNIT } from '@/styles';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';

import SmallMap from '../SmallMap';
import TagManager, { TagManagerRef } from '../TagManager';
import { Event } from '@/models/Event';
import ImageUpload from './ImageUpload';
import RefreshButton from '../buttons/RefreshButton';
import { useCreateEvent } from '@/context/createEventContext';
import EventTypeTabSelector from './EventTypeTabSelector';
import MediumTabSelector from './MediumTabSelector';
import PrivacyTabSelector from './PrivacyTabSelector';
import { addHourToTimestamp } from '@/utils/dateTimeUtils';

interface CreateEventScreenProps {
  onSuccess: (event: Event) => void;
  onRefresh: () => void;
}

const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  onSuccess,
  onRefresh,
}) => {
  const {
    userId,
    userLocation,
    eventTitle,
    setEventTitle,
    eventDescription,
    setEventDescription,
    eventType,
    setEventType,
    eventMedium,
    primaryMedium,
    setPrimaryMedium,
    secondaryMedium,
    setSecondaryMedium,
    eventStart,
    setEventStart,
    eventEnd, 
    setEventEnd,
    eventPrivate,
    setEventPrivate,
    venueLocation,
    setVenueLocation,
    venueName,
    setVenueName,
    venueDetails,
    setVenueDetails,
    setImage,
    create,
    loading,
    error,
    setError,
    setLoading,
  } = useCreateEvent();

  const [validationError, setValidationError] = useState<string | null>(null);
  const tagManagerRef = useRef<TagManagerRef>(null);

  const [typeReady, setTypeReady] = useState(false);
  const [mediumReady, setMediumReady] = useState(false);

  const handleCompletePress = async () => {
    setValidationError(null);
    setLoading(true);

    if (tagManagerRef.current) {
      const currentTags = tagManagerRef.current.getFinalTags();
      // You can add a `setEventTags(currentTags)` function in your hook if needed
    }

    const result = await create();

    if (typeof result === 'string') {
      setValidationError(result);
    } else if (result) {
      onSuccess(result);
    } else {
      setError('Failed to create event.');
    }

    setLoading(false);
  };

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={TEXT.regularError}>{error}</Text>
        <RefreshButton onRefresh={onRefresh} />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      {/* Event Type */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="event type" addPadding expanded>
          <Text style={[TEXT.regular, { paddingBottom: UNIT }]}>what kind of event would you be hosting?</Text>
          <EventTypeTabSelector
            eventType={eventType}
            setEventType={setEventType}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      {/* Art Medium */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="art medium" addPadding expanded>
          <Text style={[TEXT.regular, { paddingBottom: UNIT }]}>what medium will you be using? pick the most dominant one.</Text>
          <MediumTabSelector
            primary={primaryMedium}
            secondary={secondaryMedium}
            setPrimary={setPrimaryMedium}
            setSecondary={setSecondaryMedium}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      {/* Date & Duration */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="date" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>When will you be hosting the event?</Text>
            <CalendarDateTimeSelection
              defaultDateTime={eventStart ? eventStart : undefined}
              onDateSelection={setEventStart}
            />
            <Text style={TEXT.regularGrey}>When will the event end?</Text>
            <CalendarDateTimeSelection
              defaultDateTime={eventStart ? addHourToTimestamp(eventStart) : undefined}
              onDateSelection={setEventEnd}
              disableDate
            />
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      {/* Privacy */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="privacy" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>who do you want to attend your event?</Text>
            <PrivacyTabSelector onSelect={setEventPrivate} />
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      {/* Location */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="location" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>place a pin where you want the event to be</Text>
            <SmallMap
              initialCoordinate={userLocation}
              outputPin={{ onPinDrop: setVenueLocation }}
              showsPointsOfInterest
            />
            <Text style={TEXT.regularGrey}>ensure you have contacted the venue prior</Text>

            <Text style={TEXT.bold}>venue</Text>
            <Text style={TEXT.regular}>the name of the location you intend to host at</Text>
            <TextInput
              style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"cafe create" / "my house"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={setVenueName}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>details specific to the venue</Text>
            <TextInput
              style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"floor 2, room 5" / "tell reception you are with create-hive"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={setVenueDetails}
              autoCapitalize='none'
              multiline
              textAlignVertical="top"
              textAlign='left'
            />
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      {/* Event Details */}
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="details" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>what is the title of the event?</Text>
            <TextInput
              style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"back to basics" / "paint the cafe with me"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={setEventTitle}
              autoCapitalize='none'
            />

            <Text style={TEXT.bold}>description</Text>
            <Text style={TEXT.regular}>explain the contents of the event</Text>
            <TextInput
              style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`"what to bring" / "what to expect"`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={setEventDescription}
              autoCapitalize='none'
              multiline
              textAlignVertical="top"
              textAlign='left'
            />

            <Text style={TEXT.bold}>cover image</Text>
            <Text style={TEXT.regular}>upload a photo of the event</Text>
            <ImageUpload onUpload={setImage} />

            <Text style={TEXT.bold}>tags</Text>
            <Text style={TEXT.regular}>help members discover you with related tags</Text>
            <Text style={TEXT.regularGrey}>
              the type of medium is automatically added, but try more such as: 'beginner', 'flowers', 'detailing'
            </Text>
            {typeReady && mediumReady ? (
              <>
                <TagManager
                  ref={tagManagerRef}
                  itemId={null}
                  itemType={'event'}
                  medium={eventMedium!}
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

      {/* Submit */}
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
    overflow: 'visible',
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
  panelContainer: {
    flex: 1,
    gap: UNIT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: UNIT,
    backgroundColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  errorContainer: {
    flex: 1,
    gap: UNIT,
    backgroundColor: COLOURS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateEventScreen;