import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { COLOURS, CORNERS, DIVS, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import { Timestamp } from 'firebase/firestore';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';
import TimeDurationPicker from './TimeDurationPicker';
import EventTypeSelection from './EventTypeSelection';
import MediumSelection from './MediumSelection';

interface CreateEventProps {
  userId: string;
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(null);

  const handlePrimarySelect = (primary: PrimaryMedium | null) => {
    setSelectedPrimary(primary);
    setSelectedSecondary(null);
  };

  const handleSecondarySelect = (secondary: SecondaryMedium | null) => {
    setSelectedSecondary(secondary);
    console.log("Selected Secondary:", secondary);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setLoading(false);
    };

    fetchData();
  }, [props.userId]);

  const [selectedTimestamp, setSelectedTimestamp] = useState<Timestamp | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00'); 

  const handleDateSelection = (timestamp: Timestamp | null) => {
    setSelectedTimestamp(timestamp);
    if (timestamp) {
      const date = timestamp.toDate();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setStartTime(`${hours}:${minutes}`);
      console.log('Selected Timestamp:', date);
    } else {
      console.log('No Timestamp selected');
      setStartTime('12:00') 
    }
  };

  const [timeDuration, setTimeDuration] = useState<number>(0);

  const handleTimeDurationChange = (duration: number) => {
    setTimeDuration(duration);
    console.log('Time Duration:', duration);
  };

  const [selectedEventKind, setSelectedEventKind] = useState<string | null>(null);

  const handleEventKindSelect = (eventType: string | null) => {
    setSelectedEventKind(eventType);
    console.log("Selected Event Kind:", eventType);
  };

  if (loading) {
    return (
      <View style={styles.contentContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.contentContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="event type" addPadding expanded>
          <EventTypeSelection onSelect={handleEventKindSelect} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="art medium" addPadding expanded>
          <MediumSelection
            onPrimarySelect={handlePrimarySelect}
            onSecondarySelect={handleSecondarySelect}
            selectedPrimary={selectedPrimary}
            selectedSecondary={selectedSecondary}
          />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="date" addPadding expanded>
          <View style={styles.gapContainer}>
            <Text style={TEXT.regular}>when will you be hosting the event?</Text>
            <CalendarDateTimeSelection onDateSelection={handleDateSelection} />
            {selectedTimestamp && (
              <>
                <Text style={TEXT.boldGrey}>length</Text>
                <Text style={TEXT.regularGrey}>how long will the event run for?</Text>
                <TimeDurationPicker
                  onTimeDurationChange={handleTimeDurationChange}
                />
              </>
            )}
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    overflow: 'visible',
    paddingBottom: UNIT,
  },
  sectionContainer: {
    paddingHorizontal: UNIT,
  },
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

export default CreateEvent;