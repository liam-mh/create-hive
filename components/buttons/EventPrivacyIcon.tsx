import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';
import IconLock from '@/assets/icons/lock.svg';

interface EventPrivacyIconProps {
  isPrivate: boolean;
}

const InformationButton: React.FC<EventPrivacyIconProps> = ({ isPrivate = false }) => {
  const handlePress = () => {};

  if (isPrivate) {
    return (
      <BaseButton
        text='private'
        icon={IconLock}
        iconFill={IconLock}
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