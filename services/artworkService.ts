import { DocumentData } from "firebase/firestore";
import { readCollection, readDocument } from "@/hooks/useFirestore";
import { Artwork, mapArtworkFirestore } from "@/models/Artwork";
import { ArtworkDetail, mapArtworkDetailFirestore } from "@/models/ArtworkDetails";

export async function getArtworks(): Promise<Artwork[]> {
  try {
    const artworksData = await readCollection<DocumentData>("artwork");
    return artworksData.map(data => mapArtworkFirestore(data)).filter(artwork => artwork !== null) as Artwork[];
  } catch (error) {
    console.error("Error getting artworks:", error);
    throw error;
  }
}

export async function getArtworkById(artworkId: string): Promise<Artwork | null> {
  try {
    const artworkDoc = await readDocument<DocumentData>("artwork", artworkId);
    const mappedArtwork = artworkDoc ? mapArtworkFirestore(artworkDoc) : null;
    return mappedArtwork;
  } catch (error) {
    console.error(`Error getting artwork for artworkId ${artworkId}:`, error);
    throw error;
  }
}

export async function getArtworkDetailsById(artworkDetailId: string): Promise<ArtworkDetail | null> {
  try {
    const artworkDetailDoc = await readDocument<DocumentData>("artworkDetail", artworkDetailId);
    const mappedDetails = artworkDetailDoc ? mapArtworkDetailFirestore(artworkDetailDoc, artworkDetailId) : null;
    return mappedDetails;
  } catch (error) {
    console.error(`Error getting artwork details for artworkDetailId ${artworkDetailId}:`, error);
    throw error;
  }
}