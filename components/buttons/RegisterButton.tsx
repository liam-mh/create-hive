import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRegisterButtonViewModel } from '@/viewModels/RegisterButtonViewModel';

interface RegisterButtonProps {
  eventId: string;
  eventTitle: string;
  eventIsPrivate: boolean;
  userId?: string;
  userAt?: string;
  userName?: string;
  isIconButton?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = (props) => {
  const {
    state,
    handlers
  } = useRegisterButtonViewModel(props);

  return (
    <BaseButton
      isIconButton={props.isIconButton}
      state={state}
      variant="primary"
      states={{
        default: {
          text: "register",
          icon: "plusSquare",
          onPress: handlers.default,
        },
        pending: {
          text: "pending",
          icon: "slashSquare",
          onPress: handlers.pending,
        },
        active: {
          text: "registered",
          icon: "checkSquareFill",
          onPress: handlers.active,
        },
        disabled: {
          text: "expired",
          icon: "xCircle",
          onPress: handlers.disabled,
        },
      }}
    />
  );
};

export default RegisterButton;