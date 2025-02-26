import { BaseService } from './baseService';
import { Event, mapEventFirestore, EventType } from '@/models/Event';
import { where } from 'firebase/firestore';

export const eventService = new BaseService<Event>('event', mapEventFirestore);

export async function getEvent(): Promise<Event[]> {
  return eventService.get();
}

export async function getEventById(id: string): Promise<Event | null> {
  return eventService.getById(id);
}

export async function getEventsByType(eventType: EventType): Promise<Event[]> {
  return eventService.get([where('eventType', '==', eventType)]);
}