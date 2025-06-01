import { BaseService } from './baseService';
import { Attendee, mapAttendeeFirestore } from '@/models/Attendee';
import { Timestamp, where } from 'firebase/firestore';

const collectionName = 'attendee';

export const attendeeService = new BaseService<Attendee>(collectionName, mapAttendeeFirestore);

const createDocId = (eventId:string, userId:string): string => {
  return `${eventId}-${userId}`;
}

export async function createAttendee(
  eventId: string, 
  eventTitle: string, 
  eventIsPrivate: boolean, 
  userId: string,
  userAt: string,
  userName: string,
): Promise<Attendee | null> {
  const docId = createDocId(eventId, userId);
  const newAttendee: Attendee = {
    eventId: eventId,
    eventTitle: eventTitle,
    eventIsPrivate: eventIsPrivate,
    attendeeId: userId,
    attendeeAt: userAt,
    attendeeName: userName,
    approved: !eventIsPrivate,
    approvedTimestamp: null,
    timestamp: Timestamp.now(),
  };
  return await attendeeService.createById(docId, newAttendee);
}

export async function getAttendeesByEventId(eventId: string): Promise<Attendee[]> {
  return attendeeService.get([
    where('eventId', '==', eventId)
  ]);
}

export async function getEventsByAttendeeId(userId: string): Promise<Attendee[]> {
  return attendeeService.get([
    where('attendeeId', '==', userId)
  ]);
}

export async function getAttendeeByUserIdAndEventId(eventId: string, userId: string): Promise<Attendee | null> {
  return attendeeService.get([
    where('attendeeId', '==', userId),
    where('eventId', '==', eventId)
  ]).then(attendees => attendees[0] || null);
}