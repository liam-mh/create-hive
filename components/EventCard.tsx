import { getEventById } from '@/services/eventService';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Event } from '@/models/Event';
import TEXT, { COLOURS, UNIT } from '@/styles';
import { calculateEventDateTime } from '@/utils/dateTimeUtils';
import { formatDistrictCity, getAddressFromCoordinates } from '@/utils/locationUtils';
import { Coordinate } from '@/types/Coordinate';
import { getImageUrl } from "@/hooks/useFirebaseStorage";

import IconWorkshopFill from '@/assets/icons/brush-fill.svg';
import IconBookmark from '@/assets/icons/bookmark.svg';
import IconLock from '@/assets/icons/lock.svg';
import IconArtwork from '@/assets/icons/palette.svg';
import IconCalendar from '@/assets/icons/calendar.svg';
import IconClock from '@/assets/icons/clock.svg';
import IconMarker from '@/assets/icons/geo-alt.svg';
import InformationButton from './buttons/InformationButton';
import RegisterButton from './buttons/RegisterButton';

interface EventCardProps {
  eventId: string;
}

const EventCard: React.FC<EventCardProps> = ({ eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventLocation, setEventLocation] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const eventTypeIconSize = UNIT * 1.5;
  const iconSize = UNIT;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEventById(eventId);
        setEvent(fetchedEvent);

        if (fetchedEvent) {
          const coordinate: Coordinate = {
            latitude: fetchedEvent.location.latitude,
            longitude: fetchedEvent.location.longitude,
          };
          const address = await getAddressFromCoordinates(coordinate);
          const formattedAddress = formatDistrictCity(address);
          setEventLocation(formattedAddress);

          const url = await getImageUrl('event', eventId);
          setImageUri(url);
        }
      } catch (err) {
        setError('Failed to load event.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.contentContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.contentContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.contentContainer}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  const eventDateTime = calculateEventDateTime(event.start, event.end);

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
            <IconWorkshopFill width={eventTypeIconSize} height={eventTypeIconSize} fill={COLOURS.secondary} />
          </View>
          <View style={styles.innerRow}>
            {!event.private && <IconLock width={iconSize} height={iconSize} fill={COLOURS.black} />}
            <IconBookmark width={iconSize} height={iconSize} fill={COLOURS.black} />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.innerRow}>
            <IconArtwork width={iconSize} height={iconSize} fill={COLOURS.black} />
            <Text style={TEXT.regular}>{event.medium.primary} - {event.medium.secondary}</Text>
          </View>
          <View style={styles.innerRow}>
            <IconCalendar width={iconSize} height={iconSize} fill={COLOURS.black} />
            <Text style={TEXT.regular}>{eventDateTime.date}</Text>
          </View>
          <View style={styles.innerRow}>
            <IconClock width={iconSize} height={iconSize} fill={COLOURS.black} />
            <Text style={TEXT.regular}>{eventDateTime.time}</Text>
          </View>
          <View style={styles.innerRow}>
            <IconMarker width={iconSize} height={iconSize} fill={COLOURS.black} />
            <Text style={TEXT.regular}>{eventLocation?.toLocaleLowerCase()}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <InformationButton type={'event'} id={event.eventId} />
          <RegisterButton id={event.eventId} />
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
  detailsContainer: {
    gap: UNIT / 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: UNIT,
  },
});

export default EventCard;