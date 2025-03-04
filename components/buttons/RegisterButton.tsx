import React, { useEffect, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import RegisterButtonViewModel from '@/viewModels/RegisterButtonViewModel';

interface RegisterButtonProps {
  eventId: string;
  userId?: string;
  isIconButton?: boolean; 
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  eventId,
  userId = 'FghLfeUlFYO0RMZYjzI3',
  isIconButton, 
}) => {
  const viewModel = new RegisterButtonViewModel(eventId, userId);

  const [loading, setLoading] = useState(viewModel.loading);
  const [buttonState, setButtonState] = useState(viewModel.buttonState);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchAttendee();
      setLoading(viewModel.loading);
      setButtonState(viewModel.buttonState);
    };
    fetchData();
  }, [eventId]);

  const handlePress = async () => {
    await viewModel.handlePress();
    setButtonState(viewModel.buttonState);
  };

  return (
    <BaseButton
      text={buttonState.text}
      icon={buttonState.icon}
      iconFill={buttonState.iconFill}
      pending={buttonState.pending}
      onPress={handlePress}
      isSelected={viewModel.isSelected}
      isIconButton={isIconButton ?? false}
    />
  );
};

export default RegisterButton;