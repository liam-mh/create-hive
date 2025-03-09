import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';
import BaseButtonViewModel from '@/viewModels/BaseButtonViewModel';
import { SharedButtonProps } from '@/types/SharedButtonProps';
import { getIcon } from '@/utils/iconUtils';

const BaseIconButton: React.FC<SharedButtonProps> = (props) => { 
  const viewModel = new BaseButtonViewModel(props);
  const textAndIconColor = props.pending || props.isSelected
    ? COLOURS.primary
    : COLOURS.black
    
  const iconElement = getIcon(viewModel.iconToUse, undefined, textAndIconColor);

  const handlePress = () => {
    viewModel.toggleSelected();
    if (!viewModel.pending && viewModel.onPress) {
      viewModel.onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={viewModel.pending}
    >
      {iconElement}
      <Text style={[TEXT.small, { color: textAndIconColor }]}>{viewModel.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: UNIT/4,
  }
});

export default BaseIconButton;