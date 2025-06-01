import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TEXT, UNIT, CORNERS } from '@/styles';
import { ButtonProps } from '@/types/Button';
import { useButtonViewModel } from '@/viewModels/BaseButtonViewModel';

const BaseButton: React.FC<ButtonProps> = (props) => {
  const {
    isIconButton,
    isFullWidth,
    isDisabled,
    config,
    styleConfig,
    iconElement,
    handlePress,
  } = useButtonViewModel(props);

  return (
    <TouchableOpacity
      style={[
        isIconButton 
          ? styles.iconContainer 
          : styles.container,
        isFullWidth 
          ? styles.fullWidth 
          : styles.wrapContent,
        styleConfig.backgroundColor && !isIconButton && { 
          backgroundColor: styleConfig.backgroundColor 
        },
      ]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      {iconElement}
      {config.text && (
        <Text style={[
          isIconButton 
            ? TEXT.small 
            : TEXT.regular, 
          { color: styleConfig.textColor }
        ]}>
          {!isIconButton && (config.text)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: UNIT / 2,
    padding: UNIT / 2,
    borderRadius: CORNERS.small,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  wrapContent: {
    alignSelf: 'flex-start',
  },
});

export default BaseButton;