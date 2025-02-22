import { DocumentData, Timestamp } from "firebase/firestore";
import { UserProfile } from "@/types/UserProfile";

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

export const mapUserFirestore = (data: DocumentData | undefined): User | null => { 
  if (!data) return null; 

  return {
    userId: data.id, 
    userName: data.userName ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    email: data.email ?? '',
    mobile: data.mobile ?? '',
    location: data.location ?? { latitude: 0, longitude: 0 },
    created: data.created instanceof Timestamp ? data.created : new Timestamp(0, 0),
    profile: data.profile,
  };
};