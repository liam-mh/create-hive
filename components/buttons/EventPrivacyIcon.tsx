import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';

interface EventPrivacyIconProps {
  isPrivate: boolean;
}

const InformationButton: React.FC<EventPrivacyIconProps> = ({ isPrivate = false }) => {
  const handlePress = () => {};

  if (isPrivate) {
    return (
      <BaseButton
        text='private'
        icon='lock'
        iconFill='lock'
        pending={false}
        onPress={handlePress}
        isSelected={false}
        isIconButton={true}
      />
    );
  } else {
    null;
  }
};

export default InformationButton;