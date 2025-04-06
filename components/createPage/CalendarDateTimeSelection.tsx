import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Timestamp } from 'firebase/firestore';
import TEXT, { COLOURS, CORNERS, UNIT } from '@/styles';
import { formatDateForCalendar } from '@/utils/dateTimeUtils';

interface CalendarDateTimeSelectionProps {
  onDateSelection: (timestamp: Timestamp | null) => void;
}

const CalendarDateTimeSelection: React.FC<CalendarDateTimeSelectionProps> = ({ onDateSelection }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('00:00');
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  useEffect(() => {
    updateTimestamp();
  }, [selectedDate, selectedTime]);

  const updateTimestamp = () => {
    const dateParts = selectedDate.split('-');
    const timeParts = selectedTime.split(':');

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    const dateObject = new Date(year, month, day, hours, minutes);
    const timestamp = Timestamp.fromDate(dateObject);
    onDateSelection(timestamp);
  };

  const handleDatePress = () => {
    setShowCalendar(!showCalendar);
    setShowTimePicker(false);
  };

  const handleTimePress = () => {
    setShowTimePicker(!showTimePicker);
    setShowCalendar(false);
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
  };

  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const handleHourPress = (hour: string) => {
    setSelectedHour(hour);
    handleTimeChange(`${hour}:${selectedMinute}`);
  };

  const handleMinutePress = (minute: string) => {
    setSelectedMinute(minute);
    handleTimeChange(`${selectedHour}:${minute}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDatePress}>
          <Text style={TEXT.regularPrimary}>{formatDateForCalendar(selectedDate).toLowerCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTimePress}>
          <Text style={TEXT.regularPrimary}>{selectedTime}</Text>
        </TouchableOpacity>
      </View>

      {showCalendar && (
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: COLOURS.white,
            calendarBackground: COLOURS.white,
            textSectionTitleColor: COLOURS.primary,
            selectedDayBackgroundColor: COLOURS.primary,
            selectedDayTextColor: COLOURS.white,
            todayTextColor: COLOURS.primary,
            dayTextColor: COLOURS.black,
            textDisabledColor: COLOURS.offwhite,
          }}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
        />
      )}

      {showTimePicker && (
        <View style={styles.timePickerContainer}>
          <Text style={TEXT.regularGrey}>hour</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {hours.map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[styles.timeButton, hour === selectedHour && styles.selectedButton]}
                onPress={() => handleHourPress(hour)}
              >
                <Text style={TEXT.regular}>{hour}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={TEXT.regularGrey}>minute</Text>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {minutes.map((minute) => (
              <TouchableOpacity
                key={minute}
                style={[styles.timeButton, minute === selectedMinute && styles.selectedButton]}
                onPress={() => handleMinutePress(minute)}
              >
                <Text style={TEXT.regular}>{minute}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: UNIT,
    borderWidth: 2,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  calendar: {
    width: '100%',
  },
  timePickerContainer: {
    borderRadius: CORNERS.default,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: UNIT * 5,
    paddingTop: UNIT
  },
  scroll: {
    flex: 1,
    marginHorizontal: UNIT / 2,
  },
  timeButton: {
    padding: UNIT / 2,
    marginVertical: UNIT / 4,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  selectedButton: {
    backgroundColor: `${COLOURS.primary}30`,
  },
});

export default CalendarDateTimeSelection;