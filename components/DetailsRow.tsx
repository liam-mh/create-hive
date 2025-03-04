import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOURS, TEXT, UNIT } from '@/styles';
import { SvgProps } from 'react-native-svg';

interface DetailsRowProps {
  Icon: React.ComponentType<SvgProps>;
  text: string;
  primaryText?: boolean;
}

const DetailsRow: React.FC<DetailsRowProps> = ({ Icon, text, primaryText = false }) => {
  const iconSize = UNIT;
  const iconFill = COLOURS.black
  const textStyle = !primaryText 
    ? TEXT.regular
    : TEXT.boldPrimary

  return (
    <View style={styles.row}>
      <Icon width={iconSize} height={iconSize} fill={iconFill} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
  },
});

export default DetailsRow;