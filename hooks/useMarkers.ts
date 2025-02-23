import { useState, useEffect } from 'react';
import { CustomMarkerProps } from '@/components/CustomMarker';
import { getArtwork } from '@/services/artworkService';
import { getEvent } from '@/services/eventService';
import { timestampToFormattedDate } from '@/utils/dateTimeUtils';

const useMarkers = (): { markers: CustomMarkerProps[]; loading: boolean; error: string | null } => {
  const [markers, setMarkers] = useState<CustomMarkerProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        const artworks = await getArtwork();
        const events = await getEvent();
        
        const artworkMarkers = artworks.map(artwork => ({
          coordinate: artwork.location,
          type: 'artwork' as 'artwork' | 'event', 
          filename: artwork.artworkId + ".jpg",
          text: artwork.medium.primary,
          isSelected: false,
        }));

        const eventMarkers = events.map(event => ({
          coordinate: event.location,
          type: 'event' as 'artwork' | 'event', 
          filename: event.eventId + ".jpg",
          text: event.start ? timestampToFormattedDate(event.start) : '',
          isSelected: false,
        }));

        setMarkers([...artworkMarkers, ...eventMarkers]);
      } catch (err) {
        setError('Failed to load markers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  return { markers, loading, error };
};

export default useMarkers;