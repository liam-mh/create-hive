import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';
import BaseButtonViewModel from '@/viewModels/BaseButtonViewModel';
import { SharedButtonProps } from '@/types/SharedButtonProps';

const BaseTextButton: React.FC<SharedButtonProps> = (props) => {
  const viewModel = new BaseButtonViewModel(props);
  const [selected, setSelected] = useState(viewModel.isSelected);
  
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
  
  const iconSize = UNIT;

  const handlePress = () => {
    viewModel.toggleSelected();
    setSelected(viewModel.isSelected);
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
      {viewModel.icon && (
        selected && viewModel.iconFill
          ? <viewModel.iconFill width={iconSize} height={iconSize} fill={textAndIconColor} />
          : <viewModel.icon width={iconSize} height={iconSize} fill={textAndIconColor} />
      )}
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