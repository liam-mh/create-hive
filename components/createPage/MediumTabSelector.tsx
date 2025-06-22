import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TEXT, { UNIT } from '@/styles';
import { PrimaryMedium, primaryOptions, SecondaryMedium, secondaryOptions } from '@/types/Medium';
import SlidingTabSelector from '../SlidingTabSelector';
import GridTabSelector from '../GridTabSelector';

interface MediumTabSelectorProps {
  primary: PrimaryMedium | null;
  secondary: SecondaryMedium | null;
  setPrimary: (primary: PrimaryMedium | null) => void;
  setSecondary: (secondary: SecondaryMedium | null) => void;
  regularHeading?: boolean;
}

const MediumTabSelector: React.FC<MediumTabSelectorProps> = ({
  primary,
  secondary,
  setPrimary,
  setSecondary,
  regularHeading,
}) => {
  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(primary);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(secondary);

  useEffect(() => {
    setSelectedPrimary(primary);
    setSelectedSecondary(secondary);
  }, [primary, secondary]);

  const handlePrimarySelect = (selected: PrimaryMedium) => {
    setSelectedPrimary(selected);
    setSelectedSecondary(null);
    setPrimary(selected);
    setSecondary(null);
  };

  const handleSecondarySelect = (selected: SecondaryMedium) => {
    setSelectedSecondary(selected);
    setSecondary(selected);
  };

  return (
    <View style={styles.container}>

      {/* Primary Selector */}
      <SlidingTabSelector
        tabs={primaryOptions.map((option) => ({
          text: option,
          onPress: () => handlePrimarySelect(option),
        }))}
        initialIndex={primaryOptions.findIndex((opt) => opt === selectedPrimary)}
      />

      {/* Secondary Selector */}
      {selectedPrimary && (
        <>
          <Text style={regularHeading ? TEXT.regularGrey : TEXT.boldGrey}>sub medium</Text>
          <GridTabSelector
            columns={2}
            tabs={secondaryOptions[selectedPrimary].map((option) => ({
              text: option,
              onPress: () => handleSecondarySelect(option),
            }))}
            initialIndex={
              selectedSecondary
                ? secondaryOptions[selectedPrimary].findIndex((opt) => opt === selectedSecondary)
                : 0
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: UNIT,
  },
});

export default MediumTabSelector;