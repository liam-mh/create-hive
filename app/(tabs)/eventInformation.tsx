import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DetailsContainer from '@/components/DetailsContainer';
import DetailsRow from '@/components/DetailsRow';
import TEXT, { COLOURS, DIVS, UNIT } from '@/styles';
import ContentDropdownContainer from '@/components/ContentDropdownContainer';
import KeyValueRow from '@/components/KeyValueRow';
import TagButton from '@/components/buttons/TagButton';
import SmallMap from '@/components/SmallMap';
import EventHeader from '@/components/EventHeader';
import { EventType } from '@/models/Event';
import CustomHeader from '@/components/CustomHeader';
import { useAuth } from '@/context/authContext';
import { useEvent } from '@/hooks/useEvent';

const eventInformation = () => {
  const { 
    type, 
    id 
  } = useLocalSearchParams();

  const eventId = Array.isArray(id) ? id[0] : id;
  if (!eventId) return <View style={styles.contentContainer}><Text>{'event not found.'}</Text></View>;

  const userId = useAuth().user!.userId;
  const {
    event,
    host,
    imageUri,
    eventLocation,
    eventDateTime,
    expired,
    icon,
    loading,
    error,
  } = useEvent(eventId);
  
  if (loading) return <View style={styles.contentContainer}><Text>Loading...</Text></View>;
  if (error || !event) return <View style={styles.contentContainer}><Text>{error || 'event not found.'}</Text></View>;

  const defaultImage = require('@/assets/images/default-event-photo.jpg');
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
            userId={userId}
            editButton={userId == event.userId ? true : false}
          />
        } 
      />

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{ alignItems: 'center' }}>
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
              <DetailsRow iconName='person' text={`${host?.userAt.toLocaleLowerCase()}`} profileLink={host?.userId}/>
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
                    expanded
                    addPadding
                    isPrimary={false}
                    children={
                      <SmallMap 
                        initialCoordinate={event.location} 
                        inputPin={{itemId: event.eventId, itemType: 'event'}}
                      />
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
    paddingBottom: UNIT
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
    width: '100%'
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