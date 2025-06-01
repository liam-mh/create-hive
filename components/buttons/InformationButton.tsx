import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface InformationButtonProps {
  type: 'event' | 'artwork';
  id: string;
}

const InformationButton: React.FC<InformationButtonProps> = ( props ) => {
  const router = useRouter();
  const text = props.type == 'event' 
    ? 'more information' 
    : 'view post'

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
        state='default'
        states={{
          default: {
            text: text,
            icon: 'infoSquare',
            onPress: handlePress
          }
        }}
      />
  );
};

export default InformationButton;