import { BaseService } from './baseService';
import { Artwork, mapArtworkFirestore } from '@/models/Artwork';
import { ArtworkDetail, mapArtworkDetailFirestore } from '@/models/ArtworkDetails';
import { Medium } from '@/types/Medium';
import { orderBy, limit, where, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const artworkService = new BaseService<Artwork>('artwork', mapArtworkFirestore);
export const artworkDetailService = new BaseService<ArtworkDetail>('artworkDetail', mapArtworkDetailFirestore);

// Artwork Service functions
export async function getArtwork(): Promise<Artwork[]> {
  return artworkService.get();
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  return artworkService.getById(id);
}

export async function getNewArtworkByUserId(userId: string): Promise<Artwork[]> {
  return artworkService.get([
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(4),
  ]);
}

export async function getArtworkByUserIdPaginated(
  userId: string,
  pageSize: number,
  lastDocument?: QueryDocumentSnapshot<DocumentData>
): Promise<{ artwork: Artwork[]; lastDocument: QueryDocumentSnapshot<DocumentData> | null }> {
  const result = await artworkService.getPaginated([where('userId', '==', userId)], pageSize, lastDocument);
  return { artwork: result.data, lastDocument: result.lastDocument };
}

export async function getNewArtworkByMedium(medium: Medium): Promise<Artwork[]> {
  return artworkService.get([
    where('primaryMedium', '==', medium.primary),
    where('secondaryMedium', '==', medium.secondary),
    orderBy('timestamp', 'desc'),
    limit(4),
  ]);
}

// ArtworkDetail Service functions
export async function getArtworkDetailsById(id: string): Promise<ArtworkDetail | null> {
  return artworkDetailService.getById(id);
}