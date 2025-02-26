import { DocumentData } from "firebase/firestore";

export interface ArtworkDetail {
  artworkDetailId: string;
  information: Record<string, any>;
}

export const mapArtworkDetailFirestore = (data: DocumentData | undefined): ArtworkDetail | null => {
  if (!data) return null;

  return {
    artworkDetailId: data.id,
    information: data,
  };
};