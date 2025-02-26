import { BaseService } from './baseService';
import { Artwork, mapArtworkFirestore } from '@/models/Artwork';
import { ArtworkDetail, mapArtworkDetailFirestore } from '@/models/ArtworkDetails';

export const artworkService = new BaseService<Artwork>('artwork', mapArtworkFirestore);
export const artworkDetailService = new BaseService<ArtworkDetail>('artworkDetail', mapArtworkDetailFirestore);

// Artwork Service functions
export async function getArtwork(): Promise<Artwork[]> {
  return artworkService.get();
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  return artworkService.getById(id);
}

// ArtworkDetail Service functions
export async function getArtworkDetailsById(id: string): Promise<ArtworkDetail | null> {
  return artworkDetailService.getById(id);
}