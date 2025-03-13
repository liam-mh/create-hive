import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface InformationButtonProps {
  type: 'event' | 'artwork';
  id: string;
}

const InformationButton: React.FC<InformationButtonProps> = ({ type, id }) => {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    setIsSelected(!isSelected);
    try {
      router.push('/eventInformation');
    } catch(error) {
      throw(error);
    }
    
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