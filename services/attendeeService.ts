import { BaseService } from './baseService';
import { Attendee, mapAttendeeFirestore } from '@/models/Attendee';
import { where } from 'firebase/firestore';

export function createAttendeeService(eventId: string) {
  return new BaseService<Attendee>('attendee', mapAttendeeFirestore, eventId);
}

export async function getAttendeesByEventId(eventId: string): Promise<Attendee[]> {
  const attendeeService = createAttendeeService(eventId);
  return attendeeService.get();
}

export async function getAttendeeByUserIdAndEventId(eventId: string, userId: string): Promise<Attendee | null> {
  const attendeeService = createAttendeeService(eventId);
  return attendeeService.get([where('attendeeId', '==', userId)]).then(attendees => attendees[0] || null);
}