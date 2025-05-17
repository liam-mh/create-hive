import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TEXT, { CORNERS, UNIT } from '@/styles';
import InformationButton from './buttons/InformationButton';
import RegisterButton from './buttons/RegisterButton';
import DetailsContainer from './DetailsContainer';
import DetailsRow from './DetailsRow';
import EventPrivacyIcon from './buttons/EventPrivacyIcon';
import SaveButton from './buttons/Savebutton';

import { Event } from '@/models/Event';
import { useEventCardViewModel } from '@/viewModels/EventCardViewModel';

interface EventCardProps {
  eventId: string;
  inputEvent?: Event;
}

const EventCard: React.FC<EventCardProps> = ({ 
  eventId, 
  inputEvent 
}) => {
  const {
    userId,
    event,
    host,
    imageUri,
    eventLocation,
    eventDateTime,
    expired,
    icon,
    loading,
    error,
  } = useEventCardViewModel(eventId, inputEvent);

  if (loading) return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  if (error || !event) return <View style={styles.contentContainer}><Text>{error || 'Event not found.'}</Text></View>;

  return (
    <ImageBackground
      source={{ uri: imageUri || undefined }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.innerRow}>
            <Text style={TEXT.h1}>{event.eventType}</Text>
            {icon}
          </View>
          <View style={styles.innerRow}>
            <EventPrivacyIcon isPrivate={event.private} />
            <SaveButton itemId={event.eventId} itemType={'event'} userId={userId} isIconButton={true} />
          </View>
        </View>

        <DetailsContainer>
          <DetailsRow iconName='palette' text={`${event.medium.primary} - ${event.medium.secondary}`} />
          <DetailsRow iconName='calendar' text={`${eventDateTime?.date}`} />
          <DetailsRow iconName='clock' text={`${eventDateTime?.time}`} />
          <DetailsRow iconName='geoAlt' text={`${eventLocation?.toLocaleLowerCase()}`} />
          <DetailsRow iconName='person' text={`${host?.userAt.toLocaleLowerCase()}`} profileLink={event.userId} />
        </DetailsContainer>

        <View style={styles.buttonsContainer}>
          <InformationButton type={'event'} id={event.eventId} />
          {expired ? (
            <Text style={TEXT.regularError}>expired</Text>
          ) : (
            userId != event.userId && (
              <RegisterButton eventId={event.eventId} eventIsPrivate={event.private} userId={userId} />
            )
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    borderRadius: CORNERS.default,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
  },
  contentContainer: {
    padding: UNIT,
    gap: UNIT,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: UNIT,
    alignItems: 'center'
  },
});

export default EventCard;
