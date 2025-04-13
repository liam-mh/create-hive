import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomHeader from '@/components/CustomHeader';
import EventTypeSelection from '@/components/createPage/EventTypeSelection';
import MediumSelection from '@/components/createPage/MediumSelection';
import { getIcon } from '@/utils/iconUtils';
import TEXT, { SIZES, UNIT, COLOURS, CORNERS } from '@/styles';
import { EventType } from '@/models/Event';
import { PrimaryMedium, SecondaryMedium } from '@/types/Medium';
import SearchResultsPage from '@/components/searchPage/SearchResultsPage';

export type SearchOptions = 'event' | 'artwork' | 'user' | 'tag';

export default function Search() {
  const { tag } = useLocalSearchParams();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [searchOption, setSearchOption] = useState<SearchOptions | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [primaryMedium, setPrimaryMedium] = useState<PrimaryMedium | null>(null);
  const [secondaryMedium, setSecondaryMedium] = useState<SecondaryMedium | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);

  const iconEvent = getIcon('calendarPlus', SIZES.l, COLOURS.white);
  const iconArtwork = getIcon('paletteFill', SIZES.l, COLOURS.white);
  const iconPeople = getIcon('peopleFill', SIZES.l, COLOURS.white);
  const iconTag = getIcon('tagFill', SIZES.l, COLOURS.white);

  useEffect(() => {
    setEventType(null);
    setPrimaryMedium(null);
    setSecondaryMedium(null);
    setSearchText(null);
  }, [searchOption]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const shouldShowSearchButton =
    (searchOption === 'event' && eventType && primaryMedium && secondaryMedium) ||
    (searchOption === 'artwork' && primaryMedium && secondaryMedium) ||
    ((searchOption === 'user' || searchOption === 'tag') && !!searchText && !keyboardVisible);

  const handleSearchOptionPress = (value: SearchOptions) => {
    setSearchOption(value);
    if (value === 'artwork' || value === 'event') {
      Keyboard.dismiss();
    }
  };

  const handleSearchPress = () => {
    setLoading(true);
    bottomSheetRef.current?.close();
    setDisplaySearchResults(true);
    setLoading(false);
  };

  const handleResetSearch = () => {
    setDisplaySearchResults(false);
    setSearchOption(null);
    setEventType(null);
    setPrimaryMedium(null);
    setSecondaryMedium(null);
    setSearchText(null);
    bottomSheetRef.current?.expand();
  };
  
  const SearchOptionButton = ({
    value,
    icon,
    label,
  }: {
    value: SearchOptions;
    icon: React.ReactElement;
    label: string;
  }) => (
    <TouchableOpacity
      style={[styles.panelContainer, searchOption === value && styles.selectedButton]}
      onPress={() => handleSearchOptionPress(value)}
    >
      {icon}
      <Text style={TEXT.regularWhite}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <CustomHeader hideBackButton showSearchIcon={handleResetSearch}>
        <Text style={TEXT.h1}>search</Text>
      </CustomHeader>

      {/* Overlay to block interactions during loading */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLOURS.primary} />
        </View>
      )}

      <View style={{ flex: 1, backgroundColor: COLOURS.offwhite, width: '100%' }}>
        {displaySearchResults && (
          <SearchResultsPage 
            searchOption={searchOption!} 
            searchEventType={eventType!}
            searchMedium={{primary: primaryMedium!, secondary: secondaryMedium!}} 
            searchTerm={searchText!}
            onRefresh={handleResetSearch}
          />
        )}
      </View>

      <BottomSheet ref={bottomSheetRef} keyboardBlurBehavior="restore">
        <BottomSheetView style={styles.sheetContentContainer}>
          <Text style={[TEXT.bold, { textAlign: 'center' }]}>what would you like to search for?</Text>

          <View style={styles.buttonContainer}>
            <SearchOptionButton value="event" icon={iconEvent} label="events" />
            <SearchOptionButton value="artwork" icon={iconArtwork} label="artwork" />
            <SearchOptionButton value="user" icon={iconPeople} label="people" />
            <SearchOptionButton value="tag" icon={iconTag} label="tags" />
          </View>

          {searchOption === 'event' && (
            <>
              <Text style={TEXT.regular}>what event type?</Text>
              <EventTypeSelection onSelect={setEventType} hideDescription />
            </>
          )}

          {(searchOption === 'event' && eventType !== null) || searchOption === 'artwork' ? (
            <>
              <Text style={TEXT.regular}>what medium?</Text>
              <MediumSelection
                onPrimarySelect={setPrimaryMedium}
                onSecondarySelect={setSecondaryMedium}
                regularHeading
              />
            </>
          ) : null}

          {(searchOption === 'user' || searchOption === 'tag') && (
            <BottomSheetTextInput
              style={[TEXT.regularPrimary, styles.textInput]}
              placeholder={`search ${searchOption}s`}
              placeholderTextColor={COLOURS.darkgrey}
              onChangeText={setSearchText}
              autoCapitalize="none"
              onSubmitEditing={handleSearchPress}
              returnKeyType="search"
              editable={!loading}
            />
          )}

          {shouldShowSearchButton && (
            <TouchableOpacity
              style={[styles.panelContainer, { flex: undefined, width: '100%', marginTop: UNIT }]}
              onPress={handleSearchPress}
              disabled={loading}
            >
              <Text style={TEXT.regularWhite}>{loading ? 'searching...' : 'search'}</Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: UNIT,
    backgroundColor: COLOURS.offwhite,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: UNIT,
    width: '100%',
  },
  panelContainer: {
    flex: 1,
    gap: UNIT / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: UNIT,
    backgroundColor: COLOURS.primary,
    borderRadius: CORNERS.default,
  },
  sheetContentContainer: {
    padding: UNIT,
    gap: UNIT,
  },
  selectedButton: {
    backgroundColor: COLOURS.primaryDark,
  },
  textInput: {
    flexDirection: 'row',
    gap: UNIT,
    borderWidth: 2,
    borderColor: COLOURS.offwhite,
    borderRadius: CORNERS.default,
    padding: UNIT,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});