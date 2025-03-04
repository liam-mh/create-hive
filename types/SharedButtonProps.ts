import React from 'react';

export interface SharedButtonProps {
  text: string;
  icon: React.ComponentType<any>; 
  iconFill: React.ComponentType<any>;
  pending: boolean;
  onPress: () => void;
  isSelected: boolean;
  isIconButton: boolean;
}