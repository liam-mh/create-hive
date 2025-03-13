import { getEventsByUserIdPaginated } from '@/services/eventService';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Event } from '@/models/Event'; 

const pageSize = 10; 

class ProfileTabEventsDisplayViewModel {
  private _userId: string;
  private _events: Event[] | null = null;
  private _lastDocument: QueryDocumentSnapshot<DocumentData> | null = null;

  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userId: string) {
    this._userId = userId;
  }

  get events(): Event[] | null {
    return this._events;
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

  private async fetchEvents(): Promise<void> {
    this._loading = true;
    try {
      const { events, lastDocument } = await getEventsByUserIdPaginated(
        this._userId,
        pageSize,
        this._lastDocument || undefined
      );
      this._events = events;
      this._lastDocument = lastDocument;
    } catch (err) {
      this._error = 'Failed to load events.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchEvents();
    } catch (err) {
      this._error = 'Failed to load profile data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileTabEventsDisplayViewModel;