import { Event, EventType } from '@/models/Event';
import { createEvent } from '@/services/eventService';
import { Coordinate } from '@/types/Coordinate';
import { Medium, PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import { createEndTimestamp, createStartTimestamp } from '@/utils/dateTimeUtils';
import { createMedium } from '@/utils/mediumUtils';
import { Timestamp } from 'firebase/firestore';

class CreateEventViewModel {
  private _userId: string;
  private _userLocation: Coordinate;

  private _eventType: EventType | null = null;
  private _eventPrivate: boolean = false;
  private _primaryMedium: PrimaryMedium | null = null;
  private _secondaryMedium: SecondaryMedium | null = null;
  private _eventTimestamp: Timestamp | null = null;
  private _startTime: string = '12:00';
  private _eventDuration: number = 1;
  private _venueName: string | null = null;
  private _venueDetails: string | null = null;
  private _venueLocation: Coordinate | null = null;
  private _eventTitle: string | null = null;
  private _eventDescription: string | null = null;
  private _eventTags: string[] | null = null;

  private _loading: boolean = false;
  private _error: string | null = null;

  constructor(userId: string, userLocation: Coordinate) {
    this._userId = userId;
    this._userLocation = userLocation;
    
    this.setEventType = this.setEventType.bind(this); 
    this.setEventPrivate = this.setEventPrivate.bind(this); 
    this.setPrimaryMedium = this.setPrimaryMedium.bind(this); 
    this.setSecondaryMedium = this.setSecondaryMedium.bind(this); 
    this.setEventTimestamp = this.setEventTimestamp.bind(this);
    this.setEventDuration = this.setEventDuration.bind(this);
    this.setVenueName = this.setVenueName.bind(this);
    this.setVenueDetails = this.setVenueDetails.bind(this);
    this.setVenueLocation = this.setVenueLocation.bind(this);
    this.setEventTitle = this.setEventTitle.bind(this);
    this.setEventDescription = this.setEventDescription.bind(this);
    this.setEventTags = this.setEventTags.bind(this);
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get eventType(): EventType | null {
    return this._eventType;
  }

  setEventType(value: EventType | null) {
    this._eventType = value;
  }

  get eventPrivate(): boolean {
    return this._eventPrivate;
  }

  setEventPrivate(value: boolean) {
    this._eventPrivate = value;
  }

  get primaryMedium(): PrimaryMedium | null {
    return this._primaryMedium;
  }

  setPrimaryMedium(value: PrimaryMedium | null) {
    this._primaryMedium = value;
    this._secondaryMedium = null;
    this._eventTags = null;
  }

  get secondaryMedium(): SecondaryMedium | null {
    return this._secondaryMedium;
  }

  setSecondaryMedium(value: SecondaryMedium | null) {
    this._secondaryMedium = value;
    this._eventTags = null;
  }

  get eventTimestamp(): Timestamp | null {
    return this._eventTimestamp;
  }

  setEventTimestamp = (value: Timestamp | null) => {
    this._eventTimestamp = value;
    if (value) {
      const date = value.toDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      this._startTime = `${hours}:${minutes}`;
    } 
  };

  get eventDuration(): number {
    return this._eventDuration;
  }

  setEventDuration(value: number) {
    this._eventDuration = value;
  }

  get venueName(): string | null {
    return this._venueName;
  }

  setVenueName(value: string) {
    this._venueName = value;
  }

  get venueDetails(): string | null {
    return this._venueDetails;
  }

  setVenueDetails(value: string) {
    this._venueDetails = value;
  }

  get venueLocation(): Coordinate | null {
    return this._venueLocation;
  }

  setVenueLocation(value: Coordinate | null) {
    this._venueLocation = value;
  }

  get eventTitle(): string | null {
    return this._eventTitle;
  }

  setEventTitle(value: string) {
    this._eventTitle = value;
  }

  get eventDescription(): string | null {
    return this._eventDescription;
  }

  setEventDescription(value: string) {
    this._eventDescription = value;
  }

  get eventTags(): string[] | null {
    return this._eventTags;
  }

  setEventTags(value: string[] | null) {
    this._eventTags = value;
  }

  get userId(): string {
    return this._userId;
  }

  get userLocation(): Coordinate {
    return this._userLocation;
  }

  get eventMedium(): Medium | null {
    if (this._primaryMedium && this._secondaryMedium) {
      return createMedium(this._primaryMedium, this._secondaryMedium) as Medium;
    }
    return null;
  }

  setLoading(value: boolean) {
    this._loading = value;
  }

  setError(value: string | null) {
    this._error = value;
  }

  async createEvent(): Promise<Event | string> {
    this._loading = true;
    const missingFields: string[] = [];

    if (!this.eventType) {
      missingFields.push('Event Type');
    }
    if (!this.primaryMedium) {
      missingFields.push('Primary Medium');
    }
    if (!this.secondaryMedium) {
      missingFields.push('Secondary Medium');
    }
    if (!this.eventTimestamp) {
      missingFields.push('Date and Time');
    }
    if (this.eventDuration <= 0) {
      missingFields.push('Event Duration');
    }
    if (!this.venueName) {
      missingFields.push('Venue Name');
    }
    if (!this.venueLocation) {
      missingFields.push('Venue Location');
    }
    if (!this.eventTitle) {
      missingFields.push('Event Title');
    }
    if (!this.eventDescription) {
      missingFields.push('Event Description');
    }

    this._loading = false;

    if (missingFields.length > 0) {
      return `Please fill in the following fields: ${missingFields.join(', ')}`;
    }

    try {

      const startTimestamp = createStartTimestamp(this._eventTimestamp, this._startTime)
      const endTimestamp = createEndTimestamp(startTimestamp, this._eventDuration)

      const newEvent = await createEvent({
        userId: this.userId,
        title: this.eventTitle!,
        medium: this.eventMedium!,
        eventType: this.eventType!,
        start: startTimestamp!,
        end: endTimestamp!,
        private: this._eventPrivate,
        location: this._venueLocation!,
        description: this._eventDescription!
      })

      if (newEvent !== null) {
        return newEvent as Event;
      } else {
        this._error = 'Failed to create event';
        return 'Failed to create event'; 
      }
    } catch (err: any) {
      this._error = 'Failed to create event';
      return 'Failed to create event';
    }
  }

  logState = () => {
    console.log('--- View Model State ---');
    console.log('userId:', this._userId);
    console.log('userLocation:', this._userLocation);
    console.log('eventType:', this._eventType);
    console.log('eventPrivate:', this._eventPrivate);
    console.log('primaryMedium:', this._primaryMedium);
    console.log('secondaryMedium:', this._secondaryMedium);
    console.log('eventTimestamp:', this._eventTimestamp);
    console.log('startTime:', this._startTime);
    console.log('eventDuration:', this._eventDuration);
    console.log('venueName:', this._venueName);
    console.log('venueDetails:', this._venueDetails);
    console.log('venueLocation:', this._venueLocation);
    console.log('eventTitle:', this._eventTitle);
    console.log('eventDescription:', this._eventDescription);
    console.log('eventTags:', this._eventTags);
    console.log('loading:', this._loading);
    console.log('error:', this._error);
    console.log('-------------------------');
  };

}

export default CreateEventViewModel;