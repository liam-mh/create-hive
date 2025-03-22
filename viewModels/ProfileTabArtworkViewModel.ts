import { Artwork } from '@/models/Artwork';
import { getArtwork, getNewArtworkByUserId } from '@/services/artworkService';

class ProfileTabArtworkViewModel {
  private _userId: string;
  private _newArtwork: Artwork[] = [];
  private _popularArtwork: Artwork[] = [];

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

  async fetchData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchNewArtwork();
      // await this.fetchPopularArtwork();
    } catch (err) {
      this._error = 'Failed to profile artwork data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileTabArtworkViewModel;