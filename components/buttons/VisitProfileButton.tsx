import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';

interface VisitProfileButtonProps {
  id: string;
}

const VisitProfileButton: React.FC<VisitProfileButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/userProfile',
      params: {
        userId: props.id
      }
    });
  };

  return (
    <BaseButton
      text='visit artist profile'
      icon='person'
      iconFill='personFill'
      pending={false}
      onPress={handlePress}
      isSelected={false}
      isIconButton={false}
    />
  );
};

export default VisitProfileButton;