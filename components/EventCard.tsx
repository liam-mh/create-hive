import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TEXT, { UNIT } from '@/styles';
import EventCardViewModel from '@/viewModels/EventCardViewModel';
import InformationButton from './buttons/InformationButton';
import RegisterButton from './buttons/RegisterButton';
import DetailsContainer from './DetailsContainer';
import DetailsRow from './DetailsRow';
import EventPrivacyIcon from './buttons/EventPrivacyIcon';
import SaveButton from './buttons/Savebutton';

interface EventCardProps {
  eventId: string;
}

const EventCard: React.FC<EventCardProps> = ({ eventId }) => {
  const viewModel = new EventCardViewModel(eventId);
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [event, setEvent] = useState(viewModel.event);
  const [eventLocation, setEventLocation] = useState(viewModel.eventLocation);
  const [imageUri, setImageUri] = useState(viewModel.imageUri);
  const [eventDateTime, setEventDateTime] = useState(viewModel.eventDateTime);
  const [icon, setIcon] = useState(viewModel.icon);
  const [host, setHost] = useState(viewModel.host);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchEventData();
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setEvent(viewModel.event);
      setEventLocation(viewModel.eventLocation);
      setImageUri(viewModel.imageUri);
      setEventDateTime(viewModel.eventDateTime);
      setIcon(viewModel.icon);
      setHost(viewModel.host);
    };
    fetchData();
  }, [eventId]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }
  if (!event) {
    return <View style={styles.contentContainer}><Text>Event not found.</Text></View>;
  }

  return (
    <ImageBackground
      source={{ uri: imageUri || undefined }}
      style={styles.backgroundImage}
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
            <RegisterButton eventId={event.eventId} eventIsPrivate={event.private} userId={'FghLfeUlFYO0RMZYjzI3'} isIconButton={true} />  
            <SaveButton itemId={event.eventId} itemType={'event'} userId={'FghLfeUlFYO0RMZYjzI3'} isIconButton={true} />
          </View>
        </View>
        
        <DetailsContainer>
          <DetailsRow iconName='palette' text={`${event.medium.primary} - ${event.medium.secondary}`} />
          <DetailsRow iconName='calendar' text={`${eventDateTime?.date}`} />
          <DetailsRow iconName='clock' text={`${eventDateTime?.time}`} />
          <DetailsRow iconName='geoAlt' text={`${eventLocation?.toLocaleLowerCase()}`} />
          <DetailsRow iconName='person' text={`${host?.userAt.toLocaleLowerCase()}`} />
        </DetailsContainer>

        <View style={styles.buttonsContainer}>
          <InformationButton type={'event'} id={event.eventId} />
          <RegisterButton eventId={event.eventId} eventIsPrivate={event.private} userId={'FghLfeUlFYO0RMZYjzI3'} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
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
  },
});

export default EventCard;