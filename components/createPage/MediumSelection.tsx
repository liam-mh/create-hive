import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';
import { PrimaryMedium, primaryOptions, SecondaryMedium, secondaryOptions } from '@/types/Medium';

interface MediumSelectionProps {
  onPrimarySelect: (primary: PrimaryMedium | null) => void;
  onSecondarySelect: (secondary: SecondaryMedium | null) => void;
  selectedPrimary: PrimaryMedium | null;
  selectedSecondary: SecondaryMedium | null;
}

const MediumSelection: React.FC<MediumSelectionProps> = ({
  onPrimarySelect,
  onSecondarySelect,
  selectedPrimary,
  selectedSecondary,
}) => {
  return (
    <View style={styles.gapContainer}>
      <Text style={TEXT.regular}>what medium will you be using? pick the most dominant one.</Text>
      <View style={styles.buttonContainer}>
        {primaryOptions.map((primary) => (
          <TouchableOpacity
            key={primary}
            style={[
              styles.panelContainer,
              selectedPrimary === primary && styles.selectedButton,
            ]}
            onPress={() => onPrimarySelect(primary)}
          >
            <Text style={TEXT.regularPrimary}>{primary}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedPrimary && (
        <>
          <Text style={TEXT.boldGrey}>sub medium</Text>
          <View style={styles.buttonContainer}>
            {secondaryOptions[selectedPrimary].map((secondary) => (
              <TouchableOpacity
                key={secondary}
                style={[
                  styles.panelContainer,
                  styles.wrapPanel,
                  selectedSecondary === secondary && styles.selectedButton,
                ]}
                onPress={() => onSecondarySelect(secondary)}
              >
                <Text style={TEXT.regularPrimary}>{secondary}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  wrapPanel: {
    flex: 0,
  },
  gapContainer: {
    gap: UNIT,
  },
  selectedButton: {
    backgroundColor: `${COLOURS.primary}30`,
  },
});

export default MediumSelection;