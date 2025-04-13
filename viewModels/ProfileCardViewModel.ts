import { formatDistrictCity, getAddressFromCoordinates } from '@/utils/locationUtils';
import { Coordinate } from '@/types/Coordinate';
import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { getUserById, getUserProfileById } from '@/services/userService';
import { User } from '@/models/User';
import { UserProfile } from '@/models/UserProfile';

class ProfileCardViewModel {
  private _userId: string;
  private _user: User | null = null;
  private _userProfile: UserProfile | null = null;
  private _imageUri: string | null = null;
  private _city: string | null = null;

  private _minimal: boolean = false;
  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userId: string, inputUser?: User, minimal?: boolean) {
    this._userId = userId;
    if (inputUser) this._user = inputUser;
    if (minimal) this._minimal = minimal
  }

  get user(): User | null {
    return this._user;
  }

  get userProfile(): UserProfile | null {
    return this._userProfile;
  }

  get imageUri(): string | null {
    return this._imageUri;
  }

  get city(): string | null {
    return this._city
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  private async fetchUser(): Promise<void> {
    if (this._user) return;
    this._loading = true;
    try {
      this._user = await getUserById(this._userId);
    } catch (err) {
      this._error = 'Failed to load user.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchUserProfile(): Promise<void> {
    this._loading = true;
    try {
      this._userProfile = await getUserProfileById(this._userId);
    } catch (err) {
      this._error = 'Failed to load userProfile.';
      console.error(err);
    }finally {
      this._loading = false;
    }
  }

  private async fetchLocation(): Promise<void> {
    this._loading = true;
    try {
      const coordinate: Coordinate = {
        latitude: this._user!.location.latitude,
        longitude: this._user!.location.longitude,
      };
      const address = await getAddressFromCoordinates(coordinate);
      this._city = formatDistrictCity(address);
    } catch (err) {
      this._error = 'Failed to load location.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchProfileImage(): Promise<void> {
    this._loading = true;
    try {
      this._imageUri = await getImageUrl('user', this._userId);
    } catch (err) {
      this._error = 'Failed to load event image.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchProfileData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchUser();
      if (this._user) {
        !this._minimal ? await this.fetchUserProfile() : null;
        !this._minimal ? await this.fetchLocation() : null;
        await this.fetchProfileImage();
      }
    } catch (err) {
      this._error = 'Failed to load profile data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileCardViewModel;