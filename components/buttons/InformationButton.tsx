import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface InformationButtonProps {
  type: 'event' | 'artwork';
  id: string;
}

const InformationButton: React.FC<InformationButtonProps> = ( props: InformationButtonProps ) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/eventInformation',
      params: {
        type: props.type,
        id: props.id
      }
    });
  };

  return (
    <BaseButton
      text='more information'
      icon='infoSquare'
      iconFill='infoSquareFill'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={false}
    />
  );
};

export default InformationButton;