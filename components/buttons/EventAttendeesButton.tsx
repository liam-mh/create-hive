import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface EventAttendeesButtonProps {
  sessionUserId: string;
  eventId: string;
  iconButton?: boolean;
}

const EventAttendeesButton: React.FC<EventAttendeesButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/eventAttendees',
      params: {
        sessionUserId: props.sessionUserId,
        eventId: props.eventId
      }
    });
  };

  return (
    <BaseButton
      text='attendees'
      icon='personAdd'
      iconFill='personAdd'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={props.iconButton ? true : false}
    />
  );
};

export default EventAttendeesButton;