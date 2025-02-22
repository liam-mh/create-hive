import { DocumentData, Timestamp } from "firebase/firestore";
import { Medium, PrimaryMedium, SecondaryMedium } from "@/types/Medium";
import { Location } from "@/types/Location";
import { ArtworkDetail } from "./ArtworkDetails";

export interface Artwork {
  artworkId: string;
  title: string;
  userId: string;
  location: Location;
  medium: Medium;
  timestamp: Timestamp;
  details?: ArtworkDetail | null;
  tags: string[];
}

export const mapArtworkFirestore = (data: DocumentData | undefined): Artwork | null => { 
  if (!data) return null; 

  const primaryMedium = data.primaryMedium as PrimaryMedium | undefined;
  const secondaryMedium = data.secondaryMedium as SecondaryMedium | undefined;
  if (!primaryMedium || !secondaryMedium) return null;

  return {
    artworkId: data.id, 
    title: data.title,
    userId: data.userId,
    location: data.location ?? { latitude: 0, longitude: 0 },
    medium: {
      primary: primaryMedium,
      secondary: secondaryMedium,
    },
    timestamp: data.timestamp instanceof Timestamp ? data.timestamp : new Timestamp(0, 0),
    tags: data.tags ?? []
  };
};