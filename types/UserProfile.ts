import { Verification } from "./Verification";

export interface UserProfile {
    followers: number;
    likes: number;
    medium: string;
    bio: string;
    location: Location;
    artwork: string[];
    event: string[];
    verification: Verification;
}