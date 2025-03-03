import { DocumentData, Timestamp } from "firebase/firestore";

export interface Attendee {
  id?: string;
  eventId: string;
  attendeeId: string;
  approved: boolean;
  timestamp: Timestamp;
} 

export const mapAttendeeFirestore = (data: DocumentData | undefined): Attendee | null => { 
  if (!data) return null; 

  return {
    id: data.id,
    eventId: data.id, 
    attendeeId: data.attendeeId,
    approved: data.approved,
    timestamp: data.timestamp instanceof Timestamp ? data.timestamp : new Timestamp(0, 0),
  };
};