import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from 'firebase/firestore';
import TEXT, { UNIT } from '@/styles';
import { formatDateForCalendar } from '@/utils/dateTimeUtils';
import CustomModal from '../CustomModal';
import BaseButton from '../buttons/BaseButton';

interface CalendarDateTimeSelectionProps {
  defaultDateTime?: Timestamp;
  onDateSelection: (timestamp: Timestamp | null) => void;
  disableDate?: boolean;
}

const CalendarDateTimeSelection: React.FC<CalendarDateTimeSelectionProps> = ({
  defaultDateTime,
  onDateSelection,
  disableDate,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(
    defaultDateTime ? defaultDateTime.toDate() : new Date()
  );

  const defaultDate = defaultDateTime?.toDate();

  useEffect(() => {
    if (defaultDate && selectedDateTime < defaultDate) {
      setSelectedDateTime(defaultDate);
      onDateSelection(Timestamp.fromDate(defaultDate));
    }
  }, [defaultDateTime]);

  const onDateChange = (event: any, pickedDate?: Date) => {
    if (pickedDate && defaultDate) {
      const updatedDateTime = new Date(pickedDate);
      updatedDateTime.setHours(selectedDateTime.getHours());
      updatedDateTime.setMinutes(selectedDateTime.getMinutes());

      if (updatedDateTime >= defaultDate) {
        setSelectedDateTime(updatedDateTime);
        onDateSelection(Timestamp.fromDate(updatedDateTime));
      }
    }
  };

  const onTimeChange = (event: any, pickedTime?: Date) => {
    if (pickedTime && defaultDate) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setHours(pickedTime.getHours());
      newDateTime.setMinutes(pickedTime.getMinutes());

      if (newDateTime >= defaultDate) {
        setSelectedDateTime(newDateTime);
        onDateSelection(Timestamp.fromDate(newDateTime));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Date Picker Button */}
        <CustomModal
          trigger={(showModal) => (
            <BaseButton
              state={disableDate ? 'disabled' : 'default'}
              variant="secondary"
              isFullWidth
              states={{
                default: {
                  text: formatDateForCalendar(selectedDateTime.toISOString().split('T')[0]).toLowerCase(),
                  onPress: () => showModal(),
                },
              }}
            />
          )}
        >
          <Text style={TEXT.regular}>What date will you be hosting the event?</Text>
          <DateTimePicker
            value={selectedDateTime}
            mode="date"
            minimumDate={defaultDate || new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        </CustomModal>

        {/* Time Picker Button */}
        <CustomModal
          trigger={(showModal) => (
            <BaseButton
              state="default"
              variant="secondary"
              isFullWidth
              states={{
                default: {
                  text: selectedDateTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  onPress: () => showModal(),
                },
              }}
            />
          )}
        >
          <Text style={TEXT.regular}>What time will the event start?</Text>
          <DateTimePicker
            value={selectedDateTime}
            mode='time'
            minuteInterval={15}
            minimumDate={defaultDate}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        </CustomModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: UNIT,
  },
});

export default CalendarDateTimeSelection;