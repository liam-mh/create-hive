import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import IconInformation from '@/assets/icons/info-square.svg';
import IconInformationFill from '@/assets/icons/info-square-fill.svg';

interface InformationButtonProps {
  type: 'event' | 'artwork';
  id: string;
}

const InformationButton: React.FC<InformationButtonProps> = ({ type, id }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    console.log(`Information button for ${type} with id ${id} pressed. State: ${!isSelected ? 'selected' : 'unselected'}`);
  };

  return (
    <BaseButton
      text='more information'
      icon={IconInformation}
      iconFill={IconInformationFill}
      pending={false}
      onPress={handlePress}
      isSelected={isSelected}
      isIconButton={false}
    />
  );
};

export default InformationButton;