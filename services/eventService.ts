import { BaseService } from './baseService';
import { Event, mapEventFirestore, EventType } from '@/models/Event';
import { DocumentData, QueryDocumentSnapshot, where } from 'firebase/firestore';

export type EventServicePost = Omit<Event, 'eventId'>; 

export const eventService = new BaseService<Event>('event', mapEventFirestore);

export async function createEvent(props: EventServicePost): Promise<Event | null> {
  return eventService.create<'eventId'>(props);
}

export async function getEvent(): Promise<Event[]> {
  return eventService.get();
}

export async function getEventById(id: string): Promise<Event | null> {
  return eventService.getById(id);
}

export async function getEventsByUserId(userId: string): Promise<Event[]> {
  return eventService.get([where('userId', '==', userId)]);
}

export async function getEventsByUserIdPaginated(
  userId: string,
  pageSize: number,
  lastDocument?: QueryDocumentSnapshot<DocumentData>
): Promise<{ events: Event[]; lastDocument: QueryDocumentSnapshot<DocumentData> | null }> {
  const result = await eventService.getPaginated([where('userId', '==', userId)], pageSize, lastDocument);
  return { events: result.data, lastDocument: result.lastDocument };
}

export async function getEventsByType(eventType: EventType): Promise<Event[]> {
  return eventService.get([where('eventType', '==', eventType)]);
}