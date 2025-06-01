import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';

interface EventPrivacyIconProps {
  isPrivate: boolean;
}

const InformationButton: React.FC<EventPrivacyIconProps> = ({ isPrivate = false }) => {
  if (isPrivate) {
    return (
      <BaseButton
        isIconButton={true}
        state='default'
        states={{
          default: {
            text: 'private',
            icon: 'lock',
            onPress: () => {}
          }
        }}
      />
    );
  } 
};

export default InformationButton;