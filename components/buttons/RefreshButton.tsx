import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';

interface RefreshButtonProps {
  onRefresh: () => void;
  iconButton?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ( props ) => {
  return (
    <BaseButton
      text='refresh'
      icon='arrowClockwise'
      iconFill='arrowClockwise'
      pending={false}
      onPress={props.onRefresh}
      isSelected={false}
      isIconButton={props.iconButton ? true : false}
    />
  );
};

export default RefreshButton;