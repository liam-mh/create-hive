import { DocumentData, Timestamp } from "firebase/firestore";
import { UserProfile } from "@/models/UserProfile";
import { Coordinate } from "@/types/Coordinate";

export interface User {
  userId: string;
  userAt: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  location: Coordinate;
  created: Timestamp;
  profile?: UserProfile;
}

export const mapUserFirestore = (data: DocumentData | undefined): User | null => { 
  if (!data) return null; 

  return {
    userId: data.id, 
    userAt: data.userAt ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    email: data.email ?? '',
    mobile: data.mobile ?? '',
    location: data.location ?? { latitude: 0, longitude: 0 },
    created: data.created instanceof Timestamp ? data.created : new Timestamp(0, 0),
    profile: data.profile,
  };
};