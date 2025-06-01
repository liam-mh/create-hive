import { DocumentData, Timestamp } from "firebase/firestore";

export interface Attendee {
  eventId: string;
  eventTitle: string;
  eventIsPrivate: boolean;
  attendeeId: string;
  attendeeAt: string;
  attendeeName: string;
  approved: boolean;
  approvedTimestamp: Timestamp | null;
  timestamp: Timestamp;
} 

export const mapAttendeeFirestore = (data: DocumentData | undefined): Attendee | null => { 
  if (!data) return null; 

  return {
    eventId: data.eventId, 
    eventTitle: data.eventTitle,
    eventIsPrivate: data.eventIsPrivate,
    attendeeId: data.attendeeId,
    attendeeAt: data.attendeeAt,
    attendeeName: data.attendeeName,
    approved: data.approved,
    approvedTimestamp: data.approvedTimestamp,
    timestamp: data.timestamp,
  };
};