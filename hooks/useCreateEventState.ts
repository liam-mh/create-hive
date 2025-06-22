import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Event, EventType } from '@/models/Event';
import { Coordinate } from '@/types/Coordinate';
import { PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import { uploadImageAsJPG } from '@/hooks/useFirebaseStorage';
import { createEvent } from '@/services/eventService';
import { createMedium } from '@/utils/mediumUtils';
import { useAuth } from '@/context/authContext';
import { addHours } from 'date-fns';
import { createTomorrowNoonTimestamp } from '@/utils/dateTimeUtils';

export const useCreateEventState = () => {
  const user = useAuth().user!;
  const userId = user.userId;
  const userLocation = user.location;

  const DEFAULT_START_TIME = createTomorrowNoonTimestamp();
  const DEFAULT_LOCATION: Coordinate = userLocation;
  const DEFAULT_PRIMARY_MEDIUM: PrimaryMedium | null = user.profile?.medium.primary || null;
  const DEFAULT_SECONDARY_MEDIUM: SecondaryMedium | null = user.profile?.medium.secondary || null;

  const [eventStart, setEventStart] = useState<Timestamp | null>(DEFAULT_START_TIME);
  const [eventEnd, setEventEnd] = useState<Timestamp | null>(null);

  const [eventType, setEventType] = useState<EventType | null>(null);
  const [eventPrivate, setEventPrivate] = useState<boolean>(false);
  const [primaryMedium, setPrimaryMedium] = useState<PrimaryMedium | null>(DEFAULT_PRIMARY_MEDIUM);
  const [secondaryMedium, setSecondaryMedium] = useState<SecondaryMedium | null>(DEFAULT_SECONDARY_MEDIUM);
  const [venueName, setVenueName] = useState<string | null>(null);
  const [venueDetails, setVenueDetails] = useState<string | null>(null);
  const [venueLocation, setVenueLocation] = useState<Coordinate | null>(DEFAULT_LOCATION);
  const [eventTitle, setEventTitle] = useState<string | null>(null);
  const [eventDescription, setEventDescription] = useState<string | null>(null);
  const [eventTags, setEventTags] = useState<string[] | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const eventMedium = primaryMedium && secondaryMedium
    ? createMedium(primaryMedium, secondaryMedium)
    : null;

  const create = async (): Promise<Event | string> => {
    setLoading(true);
    const missingFields: string[] = [];

    if (!eventType) missingFields.push('Event Type');
    if (!primaryMedium) missingFields.push('Primary Medium');
    if (!secondaryMedium) missingFields.push('Secondary Medium');
    if (!eventStart) missingFields.push('Event Start');
    if (!eventEnd) missingFields.push('Event End');
    if (!venueName) missingFields.push('Venue Name');
    if (!venueLocation) missingFields.push('Venue Location');
    if (!eventTitle) missingFields.push('Event Title');
    if (!eventDescription) missingFields.push('Event Description');
    if (!image) missingFields.push('Event Image');

    if (eventStart && eventEnd) {
      const minDuration = addHours(eventStart.toDate(), 1).getTime();
      if (eventEnd.toDate().getTime() < minDuration) {
        missingFields.push('Event Duration (minimum 1 hour)');
      }
    }

    if (missingFields.length > 0) {
      setLoading(false);
      return `Please fill in the following fields: ${missingFields.join(', ')}`;
    }

    try {
      const newEvent = await createEvent({
        userId,
        title: eventTitle!,
        medium: eventMedium!,
        eventType: eventType!,
        start: eventStart!,
        end: eventEnd!,
        private: eventPrivate,
        location: venueLocation!,
        description: eventDescription!,
      });

      if (!newEvent) throw new Error('Event not created');

      if (image) {
        const uploaded = await uploadImageAsJPG(image, 'event', newEvent.eventId);
        if (!uploaded) console.warn('Image upload failed.');
      }

      return newEvent;
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
      return 'Failed to create event';
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setEventType(null);
    setEventPrivate(false);
    setPrimaryMedium(null);
    setSecondaryMedium(null);
    setEventStart(null);
    setEventEnd(null);
    setVenueName(null);
    setVenueDetails(null);
    setVenueLocation(null);
    setEventTitle(null);
    setEventDescription(null);
    setEventTags(null);
    setImage(null);
    setError(null);
  };

  return {
    userId,
    userLocation,
    eventType,
    eventPrivate,
    primaryMedium,
    secondaryMedium,
    eventStart,
    eventEnd,
    venueName,
    venueDetails,
    venueLocation,
    eventTitle,
    eventDescription,
    eventTags,
    image,
    loading,
    error,
    eventMedium,
    setEventType,
    setEventPrivate,
    setPrimaryMedium,
    setSecondaryMedium,
    setEventStart,
    setEventEnd,
    setVenueName,
    setVenueDetails,
    setVenueLocation,
    setEventTitle,
    setEventDescription,
    setEventTags,
    setImage,
    setLoading,
    setError,
    create,
    reset,
  };
};