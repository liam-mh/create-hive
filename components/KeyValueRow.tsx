import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOURS, TEXT, UNIT } from '@/styles';
import { getIcon, IconNameType } from '@/utils/iconUtils';
import ContentDropdownContainer from './ContentDropdownContainer';

export type KeyValueOption = 'text' | 'longText' | 'bullet'

interface KeyValueRowProps {
  rowType: KeyValueOption;
  textData?: TextRowProps;
  bulletData?: BulletRowProps;
}

interface TextRowProps {
  key: string;
  value: string;
}

interface BulletRowProps {
  key: string;
  value: string[];
}

const TextRow: React.FC<TextRowProps> = ( props ) => {
  return (
    <View style={styles.row}>
      <Text style={TEXT.regularGrey}>{props.key}</Text>
      <Text style={TEXT.regular}>{props.value}</Text>
    </View>
  );
};

const LongTextRow: React.FC<TextRowProps> = ( props ) => {
  return (
    <ContentDropdownContainer 
      title={props.key} 
      addPadding={true}
      isPrimary={false}
      expanded={true}
      children={
        <Text style={TEXT.regular}>{props.value}</Text>
      } 
    />
  );
};

const BulletRow: React.FC<BulletRowProps> = ( props ) => {
  return (
    <>
      <Text style={TEXT.regularGrey}>{props.key}</Text>
      <View style={styles.bulletRow}>
        {props.value.map((bullet, index) => (
          <View key={index} style={styles.bulletItem}>
            <Text style={TEXT.regular}>•</Text>
            <Text style={TEXT.regular}>{bullet}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

const KeyValueRow: React.FC<KeyValueRowProps> = ( props ) => {
  if (props.rowType == 'text') {
    return (
      props.textData 
        ? TextRow(props.textData) 
        : null
    );
  } else if (props.rowType == 'longText') {
    return (
      props.textData 
        ? LongTextRow(props.textData) 
        : null
    );
  } else {
    return (
      props.bulletData 
        ? BulletRow(props.bulletData) 
        : null
    );
  }
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: UNIT,
    overflow: 'hidden',
  },
  bulletRow: {
    paddingStart: UNIT,
    gap: UNIT / 4,
  },
  bulletItem: {
    flexDirection: 'row',
    gap: UNIT / 2,
  }
});

export default KeyValueRow;