import React, { useState } from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';
import { ButtonStateOptions } from '@/types/Button';

interface EditButtonProps {
  type: 'event' | 'artwork' | 'profile';
  id: string;
  iconButton?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ( props ) => {
  const [currentState, setCurrentState] = useState<ButtonStateOptions>('default');
  const router = useRouter();
  
  const handlePress = () => {};

  return (
    <BaseButton
      isIconButton={props.iconButton}
      state={currentState}
      variant='secondary'
      states={{
        default: {
          text: `edit ${props.type}`,
          icon: 'pencilSquare',
          onPress: handlePress
        }
      }}
    />
  );
};

export default EditButton;