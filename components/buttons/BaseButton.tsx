import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import TEXT, { COLOURS, UNIT } from '@/styles';

interface CustomButtonProps {
  text: string;
  icon?: React.ComponentType<any>;
  iconFill?: React.ComponentType<any>;
  pending?: boolean;
  onPress: () => void;
  isSelected?: boolean;
}

const BaseButton: React.FC<CustomButtonProps> = ({
  text,
  icon: Icon,
  iconFill: IconFill,
  pending = false,
  onPress,
  isSelected = false,
}) => {
  const iconSize = UNIT;

  let buttonStyle = styles.unselectedContainer;
  let textAndIconColor = COLOURS.black;

  if (isSelected) {
    buttonStyle = styles.selectedContainer;
    textAndIconColor = COLOURS.white;
  }
  if (pending) {
    buttonStyle = styles.pendingContainer;
    textAndIconColor = COLOURS.primary;
  }

  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle]}
      onPress={pending ? undefined : onPress}
      disabled={pending}
    >
      {Icon && (
        isSelected && IconFill
          ? <IconFill width={iconSize} height={iconSize} fill={textAndIconColor} />
          : <Icon width={iconSize} height={iconSize} fill={textAndIconColor} />
      )}
      <Text style={[TEXT.regular, { color: textAndIconColor }]}>{text}</Text>
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

export default BaseButton;