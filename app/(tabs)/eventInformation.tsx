import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DetailsContainer from '@/components/DetailsContainer';
import DetailsRow from '@/components/DetailsRow';
import TEXT, { COLOURS, DIVS, UNIT } from '@/styles';
import EventCardViewModel from '@/viewModels/EventCardViewModel';
import ContentDropdownContainer from '@/components/ContentDropdownContainer';
import KeyValueRow from '@/components/KeyValueRow';
import TagButton from '@/components/buttons/TagButton';
import SmallMap from '@/components/SmallMap';
import EventHeader from '@/components/EventHeader';
import { EventType } from '@/models/Event';
import CustomHeader from '@/components/CustomHeader';

const eventInformation = () => {
  const router = useRouter();
  const { type, id } = useLocalSearchParams();
  const viewModel = new EventCardViewModel(id.toLocaleString());
  
  const [loading, setLoading] = useState(viewModel.loading);
  const [error, setError] = useState(viewModel.error);
  const [event, setEvent] = useState(viewModel.event);
  const [eventLocation, setEventLocation] = useState(viewModel.eventLocation);
  const [imageUri, setImageUri] = useState(viewModel.imageUri);
  const [eventDateTime, setEventDateTime] = useState(viewModel.eventDateTime);
  const [icon, setIcon] = useState(viewModel.icon);
  const [host, setHost] = useState(viewModel.host);

  useEffect(() => {
    const fetchData = async () => {
      await viewModel.fetchEventData();
      setLoading(viewModel.loading);
      setError(viewModel.error);
      setEvent(viewModel.event);
      setEventLocation(viewModel.eventLocation);
      setImageUri(viewModel.imageUri);
      setEventDateTime(viewModel.eventDateTime);
      setIcon(viewModel.icon);
      setHost(viewModel.host);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  }
  if (error) {
    return <View style={styles.contentContainer}><Text>Error: {error}</Text></View>;
  }
  if (!event) {
    return <View style={styles.contentContainer}><Text>Event not found.</Text></View>;
  }

  const defaultImage = require('@/assets/images/default-profile-photo.jpg');
  const privacyText = event.private ? 'private' : 'public';
  const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']

  return (
    <>
      <CustomHeader 
        children={
          <EventHeader
            eventId={id as string}
            eventType={event.eventType as EventType}
            isPrivate={event.private}
            userId={'FghLfeUlFYO0RMZYjzI3'}
          />
        } 
      />

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View>
            <Image
              source={imageUri ? { uri: imageUri } : defaultImage}
              style={styles.image} 
              resizeMode="cover"
            />
          </View>

          <View style={styles.sectionContainer}>
            <DetailsContainer>
              <DetailsRow iconName='cardHeading' text={event.title} primaryText={true} />
              <DetailsRow iconName='palette' text={`${event.medium.primary} - ${event.medium.secondary}`} />
              <DetailsRow iconName='calendar' text={`${eventDateTime?.date}`} />
              <DetailsRow iconName='clock' text={`${eventDateTime?.time}`} />
              <DetailsRow iconName='geoAlt' text={`${eventLocation?.toLocaleLowerCase()}`} />
              <DetailsRow iconName='person' text={`${host?.userAt.toLocaleLowerCase()}`} />
            </DetailsContainer>
          </View>

          <View style={DIVS.offwhite} />

          <View style={styles.sectionContainer}>
            <ContentDropdownContainer 
              title={'description'} 
              expanded={true}
              addPadding={true}
              children={
                <Text style={TEXT.regular}>{event.description}</Text>
              } 
            />
          </View>
          
          <View style={DIVS.offwhite} />  

          <View style={styles.sectionContainer}>
            <ContentDropdownContainer 
              title={'location'} 
              expanded={true}
              addPadding={true}
              children={
                <DetailsContainer>
                  <KeyValueRow rowType={'text'} textData={{key: 'privacy', value: privacyText}} />
                  <KeyValueRow rowType={'text'} textData={{key: 'venue', value: 'sheffield arts hall'}} />
                  <KeyValueRow rowType={'longText'} textData={{key: 'description', value: 'We will be back at the sheffield arts hall this week. In room 5'}} />
                  <ContentDropdownContainer 
                    title={'map'} 
                    expanded={true}
                    addPadding={true}
                    isPrimary={false}
                    children={
                      <SmallMap itemId={event.eventId} itemType={'event'} pinCoordinate={event.location} />
                    } 
                  />
                </DetailsContainer>
              } 
            />
          </View>

          <View style={DIVS.offwhite} />  

          <View style={styles.sectionContainer}>
            <ContentDropdownContainer 
              title={'tags'} 
              expanded={true}
              addPadding={true}
              children={
                <View style={styles.tagsContainer}>
                  {tags.map((tag, key) => (
                    <TagButton tag={tag} key={key} />
                  ))}
                </View>
              } 
            />
            
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.white,
  },
  contentContainer: {
    gap: UNIT,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UNIT,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: UNIT,
  },
  image: {
    height: UNIT*15,
  },
  sectionContainer: {
    paddingInline: UNIT,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: UNIT / 2,
  },
});

export default eventInformation;