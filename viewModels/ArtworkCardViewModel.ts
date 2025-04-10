import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { SIZES, COLOURS } from '@/styles';
import { getIcon } from '@/utils/iconUtils';
import { getUserById } from '@/services/userService';
import { User } from '@/models/User';
import { Artwork } from '@/models/Artwork';
import { getArtworkById } from '@/services/artworkService';

class ArtworkCardViewModel {
  private _artworkId: string;
  private _artwork: Artwork | null = null;
  private _imageUri: string | null = null;
  private _icon: React.ReactNode | null = null;
  private _artist: User | null = null;
  
  private _loading: boolean = true;
  private _error: string | null = null;
  
  constructor(artworkId: string, inputArtwork?: Artwork) {
    this._artworkId = artworkId;
    if (inputArtwork) {
      this._artwork = inputArtwork;
    }
  }

  get artwork(): Artwork | null {
    return this._artwork;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get imageUri(): string | null {
    return this._imageUri;
  }

  get icon(): React.ReactNode | null {
    return this._icon;
  }

  get artist(): User | null {
    return this._artist;
  }

  private async fetchArtist(): Promise<void> {
    this._loading = true;
    try {
      if (this._artwork) {
        this._artist = await getUserById(this._artwork.userId);
      }
    } catch (err) {
      this._error = 'Failed to load artist.';
      console.error(err);
    }finally {
      this._loading = false;
    }
  }

  async fetchArtworkData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      if (!this._artwork) {
        await this.fetchArtwork();
      }
      if (this._artwork) {
        await this.fetchArtworkImage();
        await this.fetchArtist();
        this.fetchIcon();
      }
    } catch (err) {
      this._error = 'Failed to load artwork data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchArtwork(): Promise<void> {
    this._loading = true;
    try {
      this._artwork = await getArtworkById(this._artworkId);
    } catch (err) {
      this._error = 'Failed to load artwork.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchArtworkImage(): Promise<void> {
    this._loading = true;
    try {
      this._imageUri = await getImageUrl('artwork', this._artworkId);
    } catch (err) {
      this._error = 'Failed to load artwork image.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private fetchIcon(): void {
    if (this._artwork) {
      this._icon = getIcon('paletteFill', SIZES.l, COLOURS.secondary);
    } else {
      this._icon = null;
    }
  }
}

export default ArtworkCardViewModel;