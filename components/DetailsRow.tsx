import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOURS, TEXT, UNIT } from '@/styles';
import { getIcon, IconNameType } from '@/utils/iconUtils';

interface DetailsRowProps {
  iconName: IconNameType;
  text: string;
  primaryText?: boolean;
}

const DetailsRow: React.FC<DetailsRowProps> = ({ iconName, text, primaryText = false }) => {
  const icon = getIcon(iconName);
  const textStyle = !primaryText 
    ? TEXT.regular
    : TEXT.boldPrimary

  return (
    <View style={styles.row}>
      {icon}
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