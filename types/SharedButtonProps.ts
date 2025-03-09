import { IconNameType } from '@/utils/iconUtils';
import React from 'react';

export interface SharedButtonProps {
  text: string;
  icon: IconNameType;
  iconFill: IconNameType
  pending: boolean;
  onPress: () => void;
  isSelected: boolean;
  isIconButton: boolean;
}