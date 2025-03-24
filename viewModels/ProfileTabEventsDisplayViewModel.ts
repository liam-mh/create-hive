import { getEventsByUserIdPaginated, getUpcomingEventsByUserId } from '@/services/eventService';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Event } from '@/models/Event'; 

const pageSize = 10; 

class ProfileTabEventsDisplayViewModel {
  private _userId: string;
  private _events: Event[] = [];
  private _upcomingEvents: Event[] = [];
  private _lastDocument: QueryDocumentSnapshot<DocumentData> | null = null;

  private _loading: boolean = true;
  private _error: string | null = null;

  constructor(userId: string) {
    this._userId = userId;
  }

  get events(): Event[] {
    return this._events;
  }

  get upcomingEvents(): Event[] {
    return this._upcomingEvents;
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

  private async fetchUpcomingEvents(): Promise<void> {
    this._loading = true;
    try {
      const upcomingEvents = await getUpcomingEventsByUserId(this._userId);
      this._upcomingEvents = upcomingEvents;
    } catch (err) {
      this._error = 'Failed to get upcoming events.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchAllEvents(): Promise<void> {
    this._loading = true;
    try {
      const { events, lastDocument } = await getEventsByUserIdPaginated(
        this._userId,
        pageSize,
        this._lastDocument || undefined
      );
      this._events = [...this._events, ...events];
      this._lastDocument = lastDocument;
    } catch (err) {
      this._error = 'Failed to load events.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchInitialEvents(): Promise<void> {
    this._loading = true;
    try {
      await this.fetchAllEvents();
    } catch (err) {
      this._error = 'Failed to load initial events.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  async fetchNextPage(): Promise<void> {
    if (!this._lastDocument) return;
    await this.fetchAllEvents();
  }


  async fetchData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchUpcomingEvents();
    } catch (err) {
      this._error = 'Failed to load profile events data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }
}

export default ProfileTabEventsDisplayViewModel;