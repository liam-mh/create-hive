import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';
import { PrimaryMedium, primaryOptions, SecondaryMedium, secondaryOptions } from '@/types/Medium';

interface MediumSelectionProps {
  onPrimarySelect: (primary: PrimaryMedium | null) => void;
  onSecondarySelect: (secondary: SecondaryMedium | null) => void;
  regularHeading?: boolean;
}

const MediumSelection: React.FC<MediumSelectionProps> = ( props ) => {
  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(null);

  const handlePrimarySelect = (primary: PrimaryMedium) => {
    setSelectedPrimary(primary);
    props.onPrimarySelect(primary);
    setSelectedSecondary(null);
    props.onSecondarySelect(null);
  }

  const handleSecondarySelect = (secondary: SecondaryMedium) => {
    setSelectedSecondary(secondary);
    props.onSecondarySelect(secondary);
  }

  return (
    <View style={styles.gapContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -UNIT }} 
        contentContainerStyle={{ paddingHorizontal: UNIT }}
      >
        <View style={styles.buttonContainer}>
          {primaryOptions.map((primary) => (
            <TouchableOpacity
              key={primary}
              style={[
                styles.panelContainer,
                selectedPrimary === primary && styles.selectedButton,
              ]}
              onPress={() => handlePrimarySelect(primary)}
            >
              <Text style={TEXT.regularPrimary}>{primary}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedPrimary && (
        <>
          <Text style={props.regularHeading ? TEXT.regularGrey : TEXT.boldGrey}>sub medium</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -UNIT }} 
            contentContainerStyle={{ paddingHorizontal: UNIT }} 
          >
            <View style={styles.buttonContainer}>
              {secondaryOptions[selectedPrimary].map((secondary) => (
                <TouchableOpacity
                  key={secondary}
                  style={[
                    styles.panelContainer,
                    selectedSecondary === secondary && styles.selectedButton,
                  ]}
                  onPress={() => handleSecondarySelect(secondary)}
                >
                  <Text style={TEXT.regularPrimary}>{secondary}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
    overflow: 'visible'
  },
  panelContainer: {
    gap: UNIT / 2,
    alignItems: 'center',

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

export default MediumSelection;