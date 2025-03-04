import { useState, useEffect } from 'react';
import { getEventById } from '@/services/eventService';
import { Event } from '@/models/Event';
import { calculateEventDateTime } from '@/utils/dateTimeUtils';
import { formatDistrictCity, getAddressFromCoordinates } from '@/utils/locationUtils';
import { Coordinate } from '@/types/Coordinate';
import { getImageUrl } from "@/hooks/useFirebaseStorage";

class EventCardViewModel {
  private _eventId: string;
  private _event: Event | null = null;
  private _loading: boolean = true;
  private _error: string | null = null;
  private _eventLocation: string | null = null;
  private _imageUri: string | null = null;

  constructor(eventId: string) {
    this._eventId = eventId;
  }

  get event(): Event | null {
    return this._event;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  get eventLocation(): string | null {
    return this._eventLocation;
  }

  get imageUri(): string | null {
    return this._imageUri;
  }

  async fetchEventData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchEvent();
      if (this._event) {
        await this.fetchEventLocation();
        await this.fetchEventImage();
      }
    } catch (err) {
      this._error = 'Failed to load event data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchEvent(): Promise<void> {
    try {
      this._event = await getEventById(this._eventId);
    } catch (err) {
      this._error = 'Failed to load event.';
      console.error(err);
      throw err;
    }
  }

  private async fetchEventLocation(): Promise<void> {
    try {
      const coordinate: Coordinate = {
        latitude: this._event!.location.latitude,
        longitude: this._event!.location.longitude,
      };
      const address = await getAddressFromCoordinates(coordinate);
      this._eventLocation = formatDistrictCity(address);
    } catch (err) {
      this._error = 'Failed to load event location.';
      console.error(err);
      throw err;
    }
  }

  private async fetchEventImage(): Promise<void> {
    try {
      this._imageUri = await getImageUrl('event', this._eventId);
    } catch (err) {
      this._error = 'Failed to load event image.';
      console.error(err);
      throw err;
    }
  }

  get eventDateTime() {
    if (this._event) {
      return calculateEventDateTime(this._event.start, this._event.end);
    } else {
      return null;
    }
  }
}

export default EventCardViewModel;