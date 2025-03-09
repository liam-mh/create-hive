import { DocumentData, Timestamp } from "firebase/firestore";
import { Medium, PrimaryMedium, SecondaryMedium } from "@/types/Medium";
import { Coordinate } from "@/types/Coordinate";
import { Attendee } from "@/models/Attendee";

export type EventType = "casual" | "workshop" | "exhibiton";

export interface Event {
  eventId: string;
  userId: string;
  title: string;
  medium: Medium;
  eventType: EventType;
  start: Timestamp;
  end: Timestamp;
  private: boolean;
  location: Coordinate;
  description: string;
  attendee?: Attendee[] | null;
}

export const mapEventFirestore = (data: DocumentData | undefined): Event | null => {
  if (!data) return null;

  const medium = data.medium as Medium | undefined;
  const location = data.location as Coordinate | undefined;

  if (
    !medium ||
    typeof medium !== 'object' ||
    !medium.primary ||
    !medium.secondary ||
    !location ||
    typeof location !== 'object' ||
    typeof location.latitude !== 'number' ||
    typeof location.longitude !== 'number'
  ) {
    return null; 
  }

  return {
    eventId: data.id,
    userId: data.userId ?? '',
    title: data.title ?? '',
    medium: {
      primary: medium.primary as PrimaryMedium,
      secondary: medium.secondary as SecondaryMedium,
    },
    eventType: data.eventType ?? '',
    start: data.start instanceof Timestamp ? data.start : new Timestamp(0, 0),
    end: data.end instanceof Timestamp ? data.end : new Timestamp(0, 0),
    private: data.private ?? false,
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    description: data.description ?? "",
    attendee: data.attendee ?? null,
  };
};