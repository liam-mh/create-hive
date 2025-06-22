import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TEXT, { UNIT } from '@/styles';
import { EventType } from '@/models/Event';
import SlidingTabSelector from '@/components/SlidingTabSelector';

interface Props {
  eventType: EventType | null;
  setEventType: (type: EventType | null) => void;
  hideDescription?: boolean;
}

const eventTypeDescriptions: Record<EventType, string> = {
  casual: 'connect and craft in a friendly space',
  workshop: 'educate others with practical skills',
  exhibition: 'showcase art for public viewing',
};

const tabOptions = [
  { type: 'casual', icon: 'cupHotFill' },
  { type: 'workshop', icon: 'paletteFill' },
  { type: 'exhibition', icon: 'personFill' },
] as const;

const EventTypeTabSelector: React.FC<Props> = ({
  eventType,
  setEventType,
  hideDescription,
}) => {
  const [selected, setSelected] = useState<EventType | null>(eventType);

  useEffect(() => {
    setSelected(eventType);
  }, [eventType]);

  const onSelect = (type: EventType) => {
    setSelected(type);
    setEventType?.(type);
  };

  return (
    <View style={styles.container}>
      <SlidingTabSelector
        tabs={tabOptions.map(({ type, icon }) => ({
          text: type,
          icon,
          onPress: () => onSelect(type),
        }))}
      />
      {selected && !hideDescription && (
        <Text style={TEXT.regularGrey}>{eventTypeDescriptions[selected]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: UNIT,
  },
});

export default EventTypeTabSelector;