import React, { useEffect, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import RegisterButtonViewModel from '@/viewModels/RegisterButtonViewModel';

interface RegisterButtonProps {
  eventId: string;
  eventIsPrivate: boolean;
  userId?: string;
  isIconButton?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
  eventId,
  eventIsPrivate,
  userId = 'FghLfeUlFYO0RMZYjzI3',
  isIconButton,
}) => {
  const viewModel = new RegisterButtonViewModel(eventId, eventIsPrivate, userId);

  const [loading, setLoading] = useState(viewModel.loading);
  const [buttonState, setButtonState] = useState(viewModel.buttonState);
  const [isSelected, setIsSelected] = useState(viewModel.isSelected);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchAttendee();
      setLoading(viewModel.loading);
      setButtonState(viewModel.buttonState);
      setIsSelected(viewModel.isSelected); 
    };
    fetchData();
  }, [eventId]);

  const handlePress = async () => {
    await viewModel.handlePress();
    setButtonState(viewModel.buttonState);
    setIsSelected(viewModel.isSelected); 
  };

  return (
    <BaseButton
      text={buttonState.text}
      icon={buttonState.icon}
      iconFill={buttonState.iconFill}
      pending={buttonState.pending}
      onPress={handlePress}
      isSelected={isSelected} 
      isIconButton={isIconButton ?? false}
    />
  );
};

export default RegisterButton;