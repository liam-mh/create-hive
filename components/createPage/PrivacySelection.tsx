import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';

interface PrivacySelectionProps {
  onSelect: (isPrivate: boolean) => void;
}

const PrivacySelection: React.FC<PrivacySelectionProps> = ( props ) => {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const iconPrivate = getIcon('lockFill', SIZES.l, COLOURS.primary);
  const iconPublic = getIcon('peopleFill', SIZES.l, COLOURS.primary);

  const handleSelect = (isPrivate: boolean) => {
    setIsPrivate(isPrivate);
    props.onSelect(isPrivate);
  };

  return (
    <View style={styles.gapContainer}>
      <Text style={TEXT.regular}>who do you want to attend your event?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.panelContainer,
            isPrivate === true && styles.selectedButton,
          ]}
          onPress={() => handleSelect(true)}
        >
          {iconPrivate}
          <Text style={TEXT.regularPrimary}>private</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panelContainer,
            isPrivate === false && styles.selectedButton,
          ]}
          onPress={() => handleSelect(false)}
        >
          {iconPublic}
          <Text style={TEXT.regularPrimary}>public</Text>
        </TouchableOpacity>
      </View>
      <Text style={TEXT.regularGrey}>{
        isPrivate
          ? 'members have to request access that is approved or declined by the host. event details will be hidden until approved'
          : 'anybody who registers can attend the event'
      }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
    flexWrap: 'wrap',
  },
  panelContainer: {
    flex: 1,
    gap: UNIT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: UNIT,
    backgroundColor: COLOURS.white,
    borderRadius: CORNERS.default,
    borderWidth: 2,
    borderColor: COLOURS.primary,
  },
  gapContainer: {
    gap: UNIT,
  },
  selectedButton: {
    backgroundColor: `${COLOURS.primary}30`,
  },
});

export default PrivacySelection;