import { Artwork } from '@/models/Artwork';
import { getArtwork, getArtworkByUserIdPaginated, getNewArtworkByUserId } from '@/services/artworkService';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const pageSize = 10;
class ProfileTabArtworkViewModel {
  private _userId: string;
  private _newArtwork: Artwork[] = [];
  private _popularArtwork: Artwork[] = [];
  private _artwork: Artwork[] = [];
  private _lastDocument: QueryDocumentSnapshot<DocumentData> | null = null;

  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userId: string) {
    this._userId = userId;
  }

  get newArtwork(): Artwork[] {
    return this._newArtwork;
  }

  get popularArtwork(): Artwork[] {
    return this._popularArtwork;
  }

  get artwork(): Artwork[] {
    return this._artwork;
  }

  get lastDocument(): QueryDocumentSnapshot<DocumentData> | null {
    return this._lastDocument;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  private async fetchNewArtwork(): Promise<void> {
    this._loading = true;
    try {
      const artwork = await getNewArtworkByUserId(this._userId);
      this._newArtwork = artwork;
    } catch (err) {
      this._error = 'Failed to get new artwork.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchPopularArtwork(): Promise<void> {
    this._loading = true;
    try {
      const artwork = await getArtwork()
      this._newArtwork = artwork;
    } catch (err) {
      this._error = 'Failed to get popular artwork.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchArtwork(): Promise<void> {
    this._loading = true;
    try {
      const { artwork, lastDocument } = await getArtworkByUserIdPaginated(
        this._userId,
        pageSize,
        this._lastDocument || undefined
      );
      this._artwork = [...this._artwork, ...artwork];
      this._lastDocument = lastDocument;
    } catch (err) {
      this._error = 'Failed to load artwork.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchInitialArtwork(): Promise<void> {
    this._loading = true;
    try {
      await this.fetchArtwork();
    } catch (err) {
      this._error = 'Failed to load initial artwork.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchNextPage(): Promise<void> {
    if (!this._lastDocument) return;
    await this.fetchArtwork();
  }

  async fetchData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchNewArtwork();
      // await this.fetchPopularArtwork();
      await this.fetchInitialArtwork();
    } catch (err) {
      this._error = 'Failed to load profile artwork data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileTabArtworkViewModel;