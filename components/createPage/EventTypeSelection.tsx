import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TEXT, { COLOURS, CORNERS, SIZES, UNIT } from '@/styles';
import { getIcon } from '@/utils/iconUtils';

interface EventTypeSelectionProps {
  onSelect: (eventType: string | null) => void;
}

const EventTypeSelection: React.FC<EventTypeSelectionProps> = ( props ) => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);

  const iconCasual = getIcon('cupHotFill', SIZES.l, COLOURS.primary);
  const iconWorkshop = getIcon('brushFill', SIZES.l, COLOURS.primary);
  const iconExhibition = getIcon('easel2Fill', SIZES.l, COLOURS.primary);

  const handleEventTypeSelect = (eventType: string) => {
    setSelectedEventType(eventType);
    props.onSelect(eventType);
  };

  const getDescription = (eventType: string | null): string => {
    switch (eventType) {
      case 'casual':
        return 'casual: connect and craft in a friendly space';
      case 'workshop':
        return 'workshop: educate others with practical skills';
      case 'exhibition':
        return 'exhibition: showcase art for public viewing';
      default:
        return '';
    }
  };

  return (
    <View style={styles.gapContainer}>
      <Text style={TEXT.regular}>what kind of event would you be hosting?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.panelContainer,
            selectedEventType === 'casual' && styles.selectedButton,
          ]}
          onPress={() => handleEventTypeSelect('casual')}
        >
          {iconCasual}
          <Text style={TEXT.regularPrimary}>casual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panelContainer,
            selectedEventType === 'workshop' && styles.selectedButton,
          ]}
          onPress={() => handleEventTypeSelect('workshop')}
        >
          {iconWorkshop}
          <Text style={TEXT.regularPrimary}>workshop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panelContainer,
            selectedEventType === 'exhibition' && styles.selectedButton,
          ]}
          onPress={() => handleEventTypeSelect('exhibition')}
        >
          {iconExhibition}
          <Text style={TEXT.regularPrimary}>exhibition</Text>
        </TouchableOpacity>
      </View>
      {selectedEventType && (
        <Text style={TEXT.regularGrey}>{getDescription(selectedEventType)}</Text>
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
  gapContainer: {
    gap: UNIT,
  },
  selectedButton: {
    backgroundColor: `${COLOURS.primary}30`,
  },
});

export default EventTypeSelection;