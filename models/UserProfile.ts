import { DocumentData } from "firebase/firestore";
import { Verification } from "./Verification";
import { Medium, PrimaryMedium, SecondaryMedium } from "@/types/Medium";
import { Coordinate } from "@/types/Coordinate";

export interface UserProfile {
  userID: string;
  followers: number;
  likes: number;
  medium: Medium;
  bio: string;
  location: Coordinate;
  verification?: Verification;
}

export const mapUserProfileFirestore = (data: DocumentData | undefined): UserProfile | null => { 
  if (!data) return null; 

  const medium = data.medium as Medium | undefined;
  const location = data.location as Coordinate | undefined;

  if (
    !medium || typeof medium !== 'object' || !medium.primary || !medium.secondary ||
    !location || typeof location !== 'object' || typeof location.latitude !== 'number' || typeof location.longitude !== 'number'
  ) {
    return null; 
  }

  return {
    userID: data.userId,
    followers: data.followers, 
    likes: data.likes,
    medium: {
      primary: medium.primary as PrimaryMedium,
      secondary: medium.secondary as SecondaryMedium,
    },
    bio: data.bio,
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
    }
  };
};