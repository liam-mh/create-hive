import { useEffect, useState } from 'react';
import { Event, EventType } from '@/models/Event';
import { getEventById } from '@/services/eventService';
import { getAddressFromCoordinates, formatDistrictCity } from '@/utils/locationUtils';
import { getImageUrl } from '@/hooks/useFirebaseStorage';
import { getUserById } from '@/services/userService';
import { getEventIconName, getIcon } from '@/utils/iconUtils';
import { calculateEventDateTime, checkExpired, EventDateTime } from '@/utils/dateTimeUtils';
import { Coordinate } from '@/types/Coordinate';
import { COLOURS, SIZES } from '@/styles';
import { useAuth } from '@/context/authContext';

export const useEventCardViewModel = (eventId: string, initialEvent?: Event) => {
  const [event, setEvent] = useState<Event | null>(initialEvent ?? null);
  const [eventLocation, setEventLocation] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const [host, setHost] = useState<any | null>(null);
  const [eventDateTime, setEventDateTime] = useState<EventDateTime | null>(null);
  const [expired, setExpired] = useState<boolean>(false);
  const userId = useAuth().user!.userId;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const evt = initialEvent ?? await getEventById(eventId);
        if (!evt) {
          setError('Event not found');
          return;
        }
        setEvent(evt);
        setEventDateTime(calculateEventDateTime(evt.start, evt.end));
        setExpired(checkExpired(evt.start))

        await Promise.all([
          fetchLocation(evt),
          fetchImage(evt.eventId),
          fetchHost(evt.userId),
          fetchIcon(evt.eventType),
        ]);
      } catch (err) {
        console.error(err);
        setError('Failed to load event data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLocation = async (evt: Event) => {
      const coord: Coordinate = {
        latitude: evt.location.latitude,
        longitude: evt.location.longitude,
      };
      const address = await getAddressFromCoordinates(coord);
      setEventLocation(formatDistrictCity(address));
    };

    const fetchImage = async (eventId: string) => {
      const uri = await getImageUrl('event', eventId);
      setImageUri(uri);
    };

    const fetchHost = async (userId: string) => {
      const user = await getUserById(userId);
      setHost(user);
    };

    const fetchIcon = async (eventType: EventType) => {
      const iconName = getEventIconName(eventType);
      const iconNode = getIcon(iconName, SIZES.l, COLOURS.secondary);
      setIcon(iconNode);
    };

    fetchData();
  }, [eventId, initialEvent]);

  return {
    loading,
    error,
    userId,
    event,
    eventLocation,
    imageUri,
    icon,
    host,
    eventDateTime,
    expired
  };
};