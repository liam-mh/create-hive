import { DocumentData, where } from "firebase/firestore";
import { queryCollection, readCollection } from "../hooks/useFirestore";
import { Event, EventType, mapEventFirestore } from "../models/Event";

export async function getEvent(): Promise<Event[]> {
  try {
    const eventsData = await readCollection<DocumentData>('event');
    return eventsData.map(data => mapEventFirestore(data)).filter(event => event !== null) as Event[]; 
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
}

export async function getEventsByType(eventType: EventType): Promise<Event[]> {
  try {
    const queryConstraints = [where("eventType", "==", eventType)];
    const eventsData = await queryCollection<DocumentData>("event", queryConstraints);
    return eventsData
      .map((data) => mapEventFirestore(data))
      .filter((event) => event !== null) as Event[];
  } catch (error) {
    console.error(`Error getting events of type ${eventType}:`, error);
    throw error;
  }
}