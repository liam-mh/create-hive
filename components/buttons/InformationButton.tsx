import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';

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
      icon='infoSquare'
      iconFill='infoSquareFill'
      pending={false}
      onPress={handlePress}
      isSelected={isSelected}
      isIconButton={false}
    />
  );
};

export default InformationButton;