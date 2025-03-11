import { useState, useEffect } from 'react';
import { getEventById } from '@/services/eventService';
import { Event } from '@/models/Event';
import { calculateEventDateTime } from '@/utils/dateTimeUtils';
import { formatDistrictCity, getAddressFromCoordinates } from '@/utils/locationUtils';
import { Coordinate } from '@/types/Coordinate';
import { getImageUrl } from "@/hooks/useFirebaseStorage";
import { SIZES, COLOURS } from '@/styles';
import { IconNameType, getEventIconName, getIcon } from '@/utils/iconUtils';
import { getUserById } from '@/services/userService';
import { User } from '@/models/User';

class EventCardViewModel {
  private _eventId: string;
  private _event: Event | null = null;
  private _loading: boolean = true;
  private _error: string | null = null;
  private _eventLocation: string | null = null;
  private _imageUri: string | null = null;
  private _icon: React.ReactNode | null = null;
  private _host: User | null = null;

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

  get icon(): React.ReactNode | null {
    return this._icon;
  }

  get host(): User | null {
    return this._host;
  }

  private async fetchHost(): Promise<void> {
    this._loading = true;
    try {
      if (this._event) {
        this._host = await getUserById(this._event.userId);
      }
    } catch (err) {
      this._error = 'Failed to load host .';
      console.error(err);
    }finally {
      this._loading = false;
    }
  }

  async fetchEventData(): Promise<void> {
    this._loading = true;
    this._error = null;

    try {
      await this.fetchEvent();
      if (this._event) {
        await this.fetchEventLocation();
        await this.fetchEventImage();
        await this.fetchHost();
        this.fetchIcon();
      }
    } catch (err) {
      this._error = 'Failed to load event data.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchEvent(): Promise<void> {
    this._loading = true;
    try {
      this._event = await getEventById(this._eventId);
    } catch (err) {
      this._error = 'Failed to load event.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  private async fetchEventLocation(): Promise<void> {
    this._loading = true;
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
    } finally {
      this._loading = false;
    }
  }

  private async fetchEventImage(): Promise<void> {
    this._loading = true;
    try {
      this._imageUri = await getImageUrl('event', this._eventId);
    } catch (err) {
      this._error = 'Failed to load event image.';
      console.error(err);
    } finally {
      this._loading = false;
    }
  }

  get eventDateTime() {
    if (this._event) {
      return calculateEventDateTime(this._event.start, this._event.end);
    } else {
      return null;
    }
  }

  private fetchIcon(): void {
    if (this._event) {
      const iconHeaderName: IconNameType = getEventIconName(this._event.eventType);
      const iconHeaderSize = SIZES.l;
      const iconHeaderColour = COLOURS.primary;
      this._icon = getIcon(iconHeaderName, iconHeaderSize, iconHeaderColour);
    } else {
      this._icon = null;
    }
  }
}

export default EventCardViewModel;