import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileTabEventsDisplayViewModel from '@/viewModels/ProfileTabEventsDisplayViewModel';
import EventCardReel from '../EventCardReel';
import ContentDropdownContainer from '../ContentDropdownContainer';
import TEXT, { DIVS, UNIT } from '@/styles';
import { Event } from '@/models/Event';

interface ProfileTabEventsDisplayProps {
  userId: string;
}

const ProfileTabEventsDisplay: React.FC<ProfileTabEventsDisplayProps> = ({ userId }) => {
  const [viewModel] = useState(() => new ProfileTabEventsDisplayViewModel(userId));

  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchData();
      setUpcomingEvents(viewModel.upcomingEvents);

      await viewModel.fetchInitialEvents();
      setAllEvents([...viewModel.events]);
      setLoading(viewModel.loading);
      setError(viewModel.error);
    };

    fetchData();
  }, [userId]);

  const loadMoreEvents = async () => {
    if (!viewModel.lastDocument) return; 

    setIsFetchingMore(true);
    await viewModel.fetchNextPage();
    
    setAllEvents([...viewModel.events]); 
    setIsFetchingMore(false);
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
        <ContentDropdownContainer title="upcoming" addPadding expanded>
          <EventCardReel events={upcomingEvents} />
        </ContentDropdownContainer>
      </View>

      <View style={DIVS.offwhite} />

      <View style={styles.sectionContainer}>
        <ContentDropdownContainer title="all" addPadding expanded>
          <EventCardReel events={allEvents} />
          {viewModel.lastDocument && (
            <View style={styles.loadMoreContainer}>
              <Text onPress={loadMoreEvents} style={TEXT.regularPrimary}>
                {isFetchingMore ? 'Loading...' : 'Load More'}
              </Text>
            </View>
          )}
        </ContentDropdownContainer>
      </View>
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
  loadMoreContainer: {
    padding: UNIT,
    alignItems: 'center',
  },
});

export default ProfileTabEventsDisplay;