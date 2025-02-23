import { DocumentData, Timestamp } from "firebase/firestore";
import { Medium, PrimaryMedium, SecondaryMedium } from "@/types/Medium";
import { Coordinate } from "@/types/Coordinate";

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
  attendee: string[];
}

export const mapEventFirestore = (data: DocumentData | undefined): Event | null => { 
  if (!data) return null; 

  const primaryMedium = data.primaryMedium as PrimaryMedium | undefined;
  const secondaryMedium = data.secondaryMedium as SecondaryMedium | undefined;
  if (!primaryMedium || !secondaryMedium) return null;

  return {
    eventId: data.id,
    userId: data.userId ?? '',
    title: data.title ?? '',
    medium: {
      primary: primaryMedium,
      secondary: secondaryMedium,
    },
    eventType: data.eventType ?? '',
    start: data.start instanceof Timestamp ? data.start : new Timestamp(0, 0),
    end: data.end instanceof Timestamp ? data.end : new Timestamp(0, 0),
    private: data.private ?? false,
    location: data.location ?? { latitude: 0, longitude: 0 },
    description: data.description ?? "",
    attendee: data.attendee ?? [],
  };
};