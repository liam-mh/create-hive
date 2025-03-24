import { Verification } from '@/models/Verification';
import { getVerificationById } from '@/services/verificationService';
import { timestampToMonthYear } from '@/utils/dateTimeUtils';

class ProfileTabVerificationViewModel {
  private _userId: string;
  private _verification: Verification | null = null;
  private _formattedJoinedDate: string | null = null;

  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userId: string) {
    this._userId = userId;
  }

  get verification(): Verification | null {
    return this._verification;
  }

  get formattedJoinedDate(): string | null {
    return this._formattedJoinedDate;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  private async fetchVerification(): Promise<void> {
    this._loading = true;
    try {
      this._verification = await getVerificationById(this._userId);
    } catch (err) {
      this._error = 'Failed to load verification.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async convertDate(): Promise<void> {
    if (this._verification && this._verification.joined) {
      this._formattedJoinedDate = timestampToMonthYear(this._verification.joined);
    }
  }

  async fetchData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchVerification();
      await this.convertDate();
    } catch (err) {
      this._error = 'Failed to load verification data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileTabVerificationViewModel;