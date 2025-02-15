import { Medium } from "./Medium";
import { Location } from "./Location";
import { Timestamp } from "firebase/firestore";

export interface Artwork {
    title: string;
    artist: string;
    location: Location;
    medium: Medium;
    timestamp: Timestamp;
    details?: object;
    tags: string[];
}