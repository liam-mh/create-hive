import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/context/authContext';
import { createAttendee, getAttendeeByUserIdAndEventId } from '@/services/attendeeService';
import { Attendee } from '@/models/Attendee';
import { ButtonStateOptions } from '@/types/Button';

interface UseRegisterButtonViewModelProps {
  eventId: string;
  eventTitle: string;
  eventIsPrivate: boolean;
  userId?: string;
  userAt?: string;
  userName?: string;
}

export function useRegisterButtonViewModel(props: UseRegisterButtonViewModelProps) {
  const {
    eventId,
    eventTitle,
    eventIsPrivate,
    userId,
    userAt,
    userName,
  } = props;

  const auth = useAuth();
  const [state, setState] = useState<ButtonStateOptions>('default');
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  const userToRegister = userId && userAt && userName
    ? { id: userId, at: userAt, name: userName }
    : { id: auth.user!.userId, at: auth.user!.userAt, name: auth.user!.firstName };

  const fetchAttendee = async () => {
    try {
      const result = await getAttendeeByUserIdAndEventId(eventId, userToRegister.id);
      setAttendee(result);
      if (result?.approved) setState('active');
      else if (result) setState('pending');
      else setState('default');
    } catch {
      setAttendee(null);
      setState('default');
    }
  };

  useEffect(() => {
    fetchAttendee();
  }, [eventId, userToRegister.id]);

  const register = async () => {
    setState('pending');
    try {
      await createAttendee(
        eventId,
        eventTitle,
        eventIsPrivate,
        userToRegister.id,
        userToRegister.at,
        userToRegister.name
      );
      await fetchAttendee();
    } catch {
      Alert.alert("Registration Failed", "Please try again.");
      await fetchAttendee();
    }
  };

  const unregister = async () => {
    if (!attendee) return;
    // TODO: Hook up backend unregistration
    console.log("Unregistering attendee", attendee.attendeeId);
    await fetchAttendee();
  };

  const confirmUnregister = () => {
    Alert.alert(
      "Remove Registration?",
      "This will cancel your registration.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: unregister },
      ]
    );
  };

  return {
    state,
    handlers: {
      default: register,
      pending: confirmUnregister,
      active: confirmUnregister,
      disabled: () => {}
    }
  };
}