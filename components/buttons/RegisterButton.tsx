import React, { useEffect, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { addAttendee, getAttendeeByUserIdAndEventId } from '@/services/attendeeService';
import { Attendee } from '@/models/Attendee';

import IconRegister from '@/assets/icons/plus-square.svg';
import IconRegistered from '@/assets/icons/check-square-fill.svg';
import IconPendingFill from '@/assets/icons/lock-fill.svg';
import { registerUserForEvent } from '@/services/interaction/registerService';

interface RegisterButtonProps {
  id: string;
}

const InformationButton: React.FC<RegisterButtonProps> = ({ id }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  useEffect(() => {
    const fetchAttendee = async () => {
      const fetchedAttendee = await getAttendeeByUserIdAndEventId( id, 'FghLfeUlFYO0RMZYjzI3' );
      setAttendee(fetchedAttendee);
    };

    fetchAttendee();
  }, [id, isSelected]);

  const handlePress = async () => {
    setIsSelected(!isSelected);
    console.log(
      `Register button with eventId ${id} pressed. State: ${
        !isSelected ? 'selected' : 'unselected'
      }`
    );
    registerUserForEvent( 'FghLfeUlFYO0RMZYjzI3', id );
    addAttendee(id, 'FghLfeUlFYO0RMZYjzI3');
  };

  let text = 'register';
  let icon = IconRegister
  let pending = false;

  if (attendee) {
    if (attendee.approved) {
      text = 'registered';
      pending = false;
    } else {
      text = 'pending';
      icon = IconPendingFill
      pending = true;
    }
  }

  return (
    <BaseButton
      text={text}
      icon={icon}
      iconFill={IconRegistered}
      pending={pending} 
      onPress={handlePress}
      isSelected={isSelected}
    />
  );
};

export default InformationButton;