import { Timestamp } from "firebase/firestore";
import { Medium } from "./Medium";
import { Location } from "./Location";

export type EventType = "casual" | "workshop" | "exhibiton";

export interface Event {
    eventId: string;
    userId: string;
    title: string;
    medium: Medium;
    startDate: Timestamp;
    endDate: Timestamp;
    private: boolean;
    location: Location;
    description: string;
    attendee: string[];
}