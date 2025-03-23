import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import ProfileTabEventsDisplayViewModel from '@/viewModels/ProfileTabEventsDisplayViewModel';
import EventCardReel from '../EventCardReel';
import ContentDropdownContainer from '../ContentDropdownContainer';
import { DIVS, UNIT } from '@/styles';
import { Event } from '@/models/Event';

interface ProfileTabEventsDisplayProps {
  userId: string;
}

const ProfileTabEventsDisplay: React.FC<ProfileTabEventsDisplayProps> = ( props ) => {
  const viewModel = new ProfileTabEventsDisplayViewModel(props.userId);
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);

  const [allEvents, setAllEvents] =  useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchData();
      setLoading(viewModel.loading);
      setError(viewModel.error);

      setUpcomingEvents(viewModel.upcomingEvents);
    };
    fetchData();
  }, [props.userId]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'upcoming'} 
          addPadding={true}
          expanded={true}
          children={
            <EventCardReel events={upcomingEvents} />
          }
        />
      </View>
      <View style={DIVS.offwhite} />
      <View style={styles.sectionContainer}>
        <ContentDropdownContainer 
          title={'all'} 
          addPadding={true}
          children={
            <EventCardReel events={upcomingEvents} />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: UNIT,
    overflow: 'visible',
    paddingBottom: UNIT
  },
  sectionContainer: {
    paddingInline: UNIT
  }
});

export default ProfileTabEventsDisplay;