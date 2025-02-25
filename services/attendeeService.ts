import { collection, getDocs, query, where } from "firebase/firestore";
import { Attendee, mapAttendeeFirestore } from "@/models/Attendee";
import { db } from "@/config/firebase";

const collectionName = 'attendee';

export async function getAttendeesByEventId(eventId: string): Promise<Attendee[]> {
  try {
    const attendeesCollectionRef = collection(db, 'attendee', eventId, 'attendee');
    const q = query(attendeesCollectionRef);
    const querySnapshot = await getDocs(q);
    const attendees: Attendee[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const mappedAttendee = mapAttendeeFirestore(doc.data());
      if(mappedAttendee){
        attendees.push(mappedAttendee);
      }
    });
    return attendees;
  } catch (error) {
    console.error(`Error getting attendees for eventId ${eventId}:`, error);
    throw error;
  }
}

export async function getAttendeeByUserIdAndEventId(eventId: string, userId: string): Promise<Attendee | null> {
  try {
    const attendeesCollectionRef = collection(db, 'attendee', eventId, 'attendee');
    const q = query(attendeesCollectionRef, where('attendeeId', '==', userId)); 
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const doc = querySnapshot.docs[0];
      const mappedAttendee = mapAttendeeFirestore(doc.data());
      return mappedAttendee || null;
    } else {
      return null; 
    }
  } catch (error) {
    console.error(`Error getting attendee for userId ${userId} and eventId ${eventId}:`, error);
    return null;
  }
}