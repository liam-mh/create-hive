import React from 'react';
import BaseTextButton from './BaseTextButton';
import BaseIconButton from './BaseIconButton';
import { SharedButtonProps } from '@/types/SharedButtonProps';

const BaseButton: React.FC<SharedButtonProps> = (props) => {
  if (props.isIconButton) {
    return <BaseIconButton {...props} />;
  } else {
    return <BaseTextButton {...props} />;
  }
};

export default BaseButton;