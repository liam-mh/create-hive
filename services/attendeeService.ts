import { BaseService } from './baseService';
import { Attendee, mapAttendeeFirestore } from '@/models/Attendee';
import { Timestamp, where } from 'firebase/firestore';

const collectionName = 'attendee';

export function createAttendeeService(eventId: string) {
  return new BaseService<Attendee>(collectionName, mapAttendeeFirestore, eventId, collectionName);
}

export async function addAttendee(eventId: string, userId: string): Promise<Attendee | null> {
  const attendeeService = createAttendeeService(eventId);
  const newAttendee: Omit<Attendee, 'id'> = {
    eventId: eventId,
    attendeeId: userId,
    approved: false,
    timestamp: Timestamp.now(),
  };
  return attendeeService.create(newAttendee);
}

export async function getAttendeesByEventId(eventId: string): Promise<Attendee[]> {
  const attendeeService = createAttendeeService(eventId);
  return attendeeService.get();
}

export async function getAttendeeByUserIdAndEventId(eventId: string, userId: string): Promise<Attendee | null> {
  const attendeeService = createAttendeeService(eventId);
  return attendeeService.get([where('attendeeId', '==', userId)]).then(attendees => attendees[0] || null);
}