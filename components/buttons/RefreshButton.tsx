import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';

interface RefreshButtonProps {
  onRefresh: () => void;
  iconButton?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ( props ) => {
  return (
    <BaseButton
      isIconButton={props.iconButton}
      state='default'
      variant='primary'
      states={{
        default: {
          text: 'refresh',
          icon: 'arrowClockwise',
          onPress: props.onRefresh,
        },
      }}
    />
  );
};

export default RefreshButton;