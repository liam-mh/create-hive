import { DocumentData, Timestamp } from "firebase/firestore";

export interface Verification {
  userId: string;
  joined: Timestamp;
  identity: boolean;
  email: boolean;
  mobile: boolean;
  location: boolean;
  events: number;
  rating: number;
  reviews: number;
}

export const mapVerificationFirestore = (data: DocumentData | undefined): Verification | null => { 
  if (!data) return null; 

  return {
    userId: data.id,
    joined: data.joined,
    identity: data.identity, 
    email: data.email,
    mobile: data.mobile,
    location: data.location,
    events: data.events,
    rating: data.rating,
    reviews: data.reviews
  };
};