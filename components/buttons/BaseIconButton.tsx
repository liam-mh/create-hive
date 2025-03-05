import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';
import BaseButtonViewModel from '@/viewModels/BaseButtonViewModel';
import { SharedButtonProps } from '@/types/SharedButtonProps';

const BaseIconButton: React.FC<SharedButtonProps> = (props) => { 
  const viewModel = new BaseButtonViewModel(props);
  const textAndIconColor = props.pending || props.isSelected
    ? COLOURS.primary
    : COLOURS.black
  const iconSize = UNIT;

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
      {viewModel.iconToUse && (
        React.createElement(viewModel.iconToUse, {
          width: iconSize,
          height: iconSize,
          fill: textAndIconColor,
        })
      )}
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