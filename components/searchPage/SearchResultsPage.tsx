import TEXT, { COLOURS, DIVS, UNIT } from "@/styles";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SearchOptions } from "@/app/(tabs)/search";
import { EventType } from "@/models/Event";
import { Medium } from "@/types/Medium";
import { useEffect, useState } from "react";
import { getNewArtworkByMedium } from "@/services/artworkService";
import ArtworkCard from "../ArtworkCard";

import { getUpcomingEventsByTypeAndMedium } from "@/services/eventService";
import { getUserBySearch } from "@/services/userService";
import ProfileCard from "../profilePage/ProfileCard";
import { useAuth } from "@/context/authContext";
import EventCard from "../EventCard";
import RefreshButton from "../buttons/RefreshButton";

interface SearchResultsPageProps {
  searchOption: SearchOptions;
  searchEventType?: EventType;
  searchMedium?: Medium;
  searchTerm?: string;
  onRefresh: () => void;
}

function verifyProps( props: SearchResultsPageProps ): boolean {
  if (props.searchOption === 'event') {
    return !!props.searchEventType && !!props.searchMedium;
  }
  if (props.searchOption === 'artwork') {
    return !!props.searchMedium;
  }
  if (props.searchOption === 'user' || props.searchOption === 'tag') {
    return !!props.searchTerm;
  }
  return false;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ( props ) => {

  const sessionUserId = useAuth().user!.userId;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!verifyProps(props)) {
      setError('something went wrong with the search');
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      try {
        let results: any[] = [];
  
        switch (props.searchOption) {
          case 'event':
            results = await getUpcomingEventsByTypeAndMedium(props.searchEventType!, props.searchMedium!);
            break;
          case 'artwork':
            results = await getNewArtworkByMedium(props.searchMedium!);
            break;
          case 'user':
            results = await getUserBySearch(props.searchTerm!);
            break;
          case 'tag':
            // TODO: implement tag search
            break;
        }
  
        if (results.length === 0) {
          setError('no search results');
        } else {
          setSearchResults(results);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('unable to load search results');
      } finally {
        setLoading(false);
      }
    };
  
    setLoading(true);
    setError(null);
    fetchData();
  }, [props.searchOption]);
  

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={TEXT.regularError}>{error}</Text>
        <RefreshButton onRefresh={props.onRefresh} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}> 

      {props.searchOption === 'event' && (
        searchResults.map((event) => (
          <View key={event.eventId}>
            <EventCard eventId={event.eventId} inputEvent={event} />
            <View style={DIVS.offwhite} />
          </View>
        ))
      )}

      {props.searchOption === 'artwork' && (
        searchResults.map((artwork) => (
          <View key={artwork.artworkId}>
            <ArtworkCard
              inputArtwork={artwork}
              artworkId={artwork.artworkId}
            />
            <View style={DIVS.offwhite} />
          </View>
        ))
      )}

      {props.searchOption === 'user' && (
        searchResults.map((user) => (
          <>
            <View key={user.userId} style={styles.userResultContainer}>
              <ProfileCard sessionUserId={sessionUserId} profileUserId={user.userId} minimalCard/>
            </View>
            <View style={DIVS.offwhite} />
          </>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: UNIT,
    backgroundColor: COLOURS.white
  },
  errorContainer: {
    flex: 1,
    gap: UNIT,
    backgroundColor: COLOURS.white,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  userResultContainer: {
    gap: UNIT,
    paddingInline: UNIT
  },
  
});

export default SearchResultsPage;