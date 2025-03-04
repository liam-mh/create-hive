import React, { useEffect, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import RegisterButtonViewModel from '@/viewModels/RegisterButtonViewModel';

interface RegisterButtonProps {
  eventId: string;
  userId?: string; // TODO: make dynamic from session
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ eventId, userId = 'FghLfeUlFYO0RMZYjzI3' }) => {
  const viewModel = new RegisterButtonViewModel(eventId, userId);

  const [isSelected, setIsSelected] = useState(viewModel.isSelected);
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
    setIsSelected(viewModel.isSelected);
    setButtonState(viewModel.buttonState);
  };

  return (
    <BaseButton
      text={buttonState.text}
      icon={buttonState.icon}
      iconFill={buttonState.iconFill}
      pending={buttonState.pending}
      onPress={handlePress}
      isSelected={isSelected}
    />
  );
};

export default RegisterButton;