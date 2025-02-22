// models/ArtworkDetail.ts

import { DocumentData } from "firebase/firestore";

export interface ArtworkDetail {
  artworkDetailId: string;
  information: Record<string, any>;
}

export const mapArtworkDetailFirestore = (data: DocumentData | undefined, artworkDetailId: string): ArtworkDetail | null => {
  if (!data) return null;

  return {
    artworkDetailId: artworkDetailId, 
    information: data, 
  };
};