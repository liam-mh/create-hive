import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface EditButtonProps {
  type: 'event' | 'artwork' | 'profile';
  id: string;
  iconButton?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {};

  return (
    <BaseButton
      text={'edit '+ props.type}
      icon='pencilSquare'
      iconFill='pencilSquare'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={props.iconButton ? true : false}
    />
  );
};

export default EditButton;