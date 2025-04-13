import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import { useRouter } from 'expo-router';
import { navigateToUserProfile } from '@/utils/routerUtils';

interface VisitProfileButtonProps {
  id: string;
}

const VisitProfileButton: React.FC<VisitProfileButtonProps> = ( props ) => {
  const router = useRouter();

  const handlePress = () => {
    navigateToUserProfile({ router, userId: props.id });
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