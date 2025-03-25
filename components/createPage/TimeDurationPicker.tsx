import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';
import { formatDuration } from '@/utils/dateTimeUtils';

interface TimeDurationPickerProps {
  onTimeDurationChange: (durationMinutes: number) => void;
}

const TimeDurationPicker: React.FC<TimeDurationPickerProps> = ({ onTimeDurationChange }) => {
  const [durationMinutes, setDurationMinutes] = useState<number>(0);

  useEffect(() => {
    onTimeDurationChange(durationMinutes);
  }, [durationMinutes, onTimeDurationChange]);

  useEffect(() => {
    setDurationMinutes(60);
  },[]);

  const addMinutes = () => {
    setDurationMinutes((prevDuration) => prevDuration + 15);
  };

  const subtractMinutes = () => {
    setDurationMinutes((prevDuration) => Math.max(0, prevDuration - 15)); 
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.panelContainer,{borderColor: COLOURS.red}]} onPress={subtractMinutes}>
        <Text style={TEXT.regularError}>- 15</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[TEXT.regularPrimary, { textAlign: 'center' }]}>{formatDuration(durationMinutes)}</Text>
      </View>
      <TouchableOpacity style={[styles.panelContainer,{borderColor: COLOURS.primary}]} onPress={addMinutes}>
        <Text style={TEXT.regularPrimary}>+ 15</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  panelContainer: {
    padding: UNIT,
    borderWidth: 2,
    borderRadius: CORNERS.default,
  },
  textContainer: {
    justifyContent: 'center',
  }
});

export default TimeDurationPicker;