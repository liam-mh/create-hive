import { addAttendee, getAttendeeByUserIdAndEventId } from '@/services/attendeeService';
import { Attendee } from '@/models/Attendee';
import { RegisterServiceProps, registerUserForEvent } from '@/services/interaction/registerService';

import IconRegister from '@/assets/icons/plus-square.svg';
import IconPending from '@/assets/icons/slash-square.svg';
import IconRegistered from '@/assets/icons/check-square-fill.svg';

class RegisterButtonViewModel {
  private _eventId: string;
  private _eventIsPrivate: boolean = false;
  private _userId: string;
  private _attendee: Attendee | null = null;
  private _loading: boolean = true;
  private _isSelected: boolean = false;

  constructor(eventId: string, eventIsPrivate: boolean, userId: string) {
    this._eventId = eventId;
    this._eventIsPrivate = eventIsPrivate;
    this._userId = userId;
  }

  get loading(): boolean {
    return this._loading;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  async handleRegister() {
    const register: RegisterServiceProps = {
      userId: this._userId,
      itemId: this._eventId,
    };
    return register;
  }

  async fetchAttendee(): Promise<void> {
    this._loading = true;
    this._attendee = await getAttendeeByUserIdAndEventId(this._eventId, this._userId);
    this._loading = false;
  }

  async handlePress(): Promise<void> {
    this._isSelected = !this._isSelected;
    console.log(
      `Register button with eventId ${this._eventId} pressed. State: ${
        this._isSelected ? 'selected' : 'unselected'
      }`
    );
    await registerUserForEvent(await this.handleRegister());
    await addAttendee(this._eventId, this._eventIsPrivate, this._userId);
    await this.fetchAttendee();
  }

  get buttonState() {
    let text = 'register';
    let icon = IconRegister;
    let pending = false;

    if (this._attendee) {
      if (this._attendee.approved) {
        text = 'registered';
        pending = false;
        this._isSelected = true;
      } else {
        text = 'pending';
        icon = IconPending;
        pending = true;
      }
    }
  
    return {
      text,
      icon,
      pending,
      iconFill: IconRegistered,
      onPress: async () => await this.handlePress(), 
      isSelected: this._isSelected,
    };
  }
}

export default RegisterButtonViewModel;