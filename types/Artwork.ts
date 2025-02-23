import { Medium } from "./Medium";
import { Coordinate } from "./Coordinate";
import { Timestamp } from "firebase/firestore";

export interface Artwork {
    title: string;
    artist: string;
    location: Coordinate;
    medium: Medium;
    timestamp: Timestamp;
    details?: object;
    tags: string[];
}