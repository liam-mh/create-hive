import React, { useEffect, useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import SaveButtonViewModel from '@/viewModels/SaveButtonViewModel';
import { ItemType } from '@/models/Interaction';

interface SaveButtonProps {
  itemId: string;
  itemType: ItemType;
  userId: string;
  isIconButton?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  userId,
  itemId,
  itemType,
  isIconButton,
}) => {
  const viewModel = new SaveButtonViewModel(userId, itemId, itemType);

  const [loading, setLoading] = useState(viewModel.loading);
  const [buttonState, setButtonState] = useState(viewModel.buttonState);
  const [isSelected, setIsSelected] = useState(viewModel.isSelected);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchSavedState();
      setLoading(viewModel.loading);
      setButtonState(viewModel.buttonState);
      setIsSelected(viewModel.isSelected);
    };
    fetchData();
  }, [itemId]);

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

export default SaveButton;