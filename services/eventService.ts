import { DocumentData } from "firebase/firestore";
import { readCollection } from "../hooks/useFirestore";
import { Event, mapEventFirestore } from "../models/Event";

export async function getEvent(): Promise<Event[]> {
    try {
        const eventsData = await readCollection<DocumentData>('event');
        return eventsData.map(data => mapEventFirestore(data)).filter(event => event !== null) as Event[]; 
    } catch (error) {
        console.error("Error getting events:", error);
        throw error;
    }
}