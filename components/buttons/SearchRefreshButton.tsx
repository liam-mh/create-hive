import React from 'react';
import BaseButton from '@/components/buttons/BaseButton';

interface SearchRefreshButtonProps {
  onRefresh: () => void;
  iconButton?: boolean;
}

const SearchRefreshButton: React.FC<SearchRefreshButtonProps> = ( props ) => {
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

export default SearchRefreshButton;