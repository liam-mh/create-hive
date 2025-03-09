import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';
import BaseButtonViewModel from '@/viewModels/BaseButtonViewModel';
import { SharedButtonProps } from '@/types/SharedButtonProps';
import { getIcon } from '@/utils/iconUtils';

const BaseTextButton: React.FC<SharedButtonProps> = (props) => {
  const viewModel = new BaseButtonViewModel(props);
  
  let buttonStyle = styles.unselectedContainer;
  let textAndIconColor = COLOURS.black;

  if (props.pending) {
    buttonStyle = styles.pendingContainer;
    textAndIconColor = COLOURS.primary;
  }
  if (props.isSelected) {
    buttonStyle = styles.selectedContainer;
    textAndIconColor = COLOURS.white;
  }

  const iconElement = getIcon(viewModel.iconToUse, undefined, textAndIconColor);

  const handlePress = () => {
    viewModel.toggleSelected();
    if (!viewModel.pending) {
      viewModel.onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle]}
      onPress={handlePress}
      disabled={viewModel.pending}
    >
      {iconElement}
      <Text style={[TEXT.regular, { color: textAndIconColor }]}>{viewModel.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
    borderRadius: 2,
    padding: UNIT / 2,
  },
  unselectedContainer: {
    backgroundColor: COLOURS.secondary,
  },
  selectedContainer: {
    backgroundColor: COLOURS.primary,
  },
  pendingContainer: {
    backgroundColor: COLOURS.offwhite,
  },
});

export default BaseTextButton;