import { Timestamp } from "firebase/firestore";
import { UserProfile } from "./UserProfile";

export interface User {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    location: Location;
    created: Timestamp;
    profile?: UserProfile;
}