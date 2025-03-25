import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { DIVS, UNIT } from '@/styles';
import CreateEventViewModel from '@/viewModels/CreateEventViewModel';
import { PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import { Timestamp } from 'firebase/firestore';
import CalendarDateTimeSelection from './CalendarDateTimeSelection';
import TimeDurationPicker from './TimeDurationPicker';
import EventTypeSelection from './EventTypeSelection';
import MediumSelection from './MediumSelection';
import PrivacySelection from './PrivacySelection';

interface CreateEventProps {
  userId: string;
}

const CreateEvent: React.FC<CreateEventProps> = (props) => {
  const [viewModel] = useState(() => new CreateEventViewModel(props.userId));
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  // Event Type Selection State
  const [selectedEventKind, setSelectedEventKind] = useState<string | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<boolean>(false);

  // Art Medium Selection States
  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryMedium | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryMedium | null>(null);

  // Date and Time Selection States
  const [selectedTimestamp, setSelectedTimestamp] = useState<Timestamp | null>(null);
  const [startTime, setStartTime] = useState<string>('12:00'); 
  const [timeDuration, setTimeDuration] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      // await viewModel.loadData(); 
      // setLoading(viewModel.loading);
      setLoading(false);
      setError(viewModel.error);
    };

    fetchData();
  }, [props.userId, viewModel]);

  const handleEventKindSelect = (eventType: string | null) => {
    setSelectedEventKind(eventType);
    console.log('Selected Event Kind:', eventType);
  };

  const handlePrimarySelect = (primary: PrimaryMedium | null) => {
    setSelectedPrimary(primary);
    setSelectedSecondary(null);
  };

  const handleSecondarySelect = (secondary: SecondaryMedium | null) => {
    setSelectedSecondary(secondary);
    console.log('Selected Secondary:', secondary);
  };

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
      setStartTime('12:00');
    }
  };

  const handleTimeDurationChange = (duration: number) => {
    setTimeDuration(duration);
    console.log('Time Duration:', duration);
  };

  const handlePrivacyKindSelect = (isPrivate: boolean) => {
    setSelectedPrivacy(isPrivate);
    console.log('Selected Event Privacy:', isPrivate); 
  };

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
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
                <TimeDurationPicker onTimeDurationChange={handleTimeDurationChange} />
              </>
            )}
          </View>
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="privacy" addPadding expanded>
          <PrivacySelection onSelect={handlePrivacyKindSelect} />
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
  gapContainer: {
    gap: UNIT,
  },
});

export default CreateEvent;