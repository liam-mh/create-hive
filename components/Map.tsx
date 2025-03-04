import MapView, { Point, PROVIDER_DEFAULT } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react'; 
import { TEXT, SHADOWS, SIZES } from '@/styles';
import { Coordinate } from '@/types/Coordinate';
import { Region } from 'react-native-maps';
import MapFiltersDropdown from './MapFiltersDropdown';
import MarkerManager from './MarkerManager';
import useMarkers from '@/hooks/useMarkers';
import BottomSheet from '@gorhom/bottom-sheet';
import MarkerDetailsSheet from './MarkerDetailsSheet';
import { CustomMarkerProps } from '@/components/CustomMarker';
import { getCityFromCoordinates } from '@/utils/locationUtils';

const Map = () => {
  const inputLocation: Coordinate = {
    latitude: 53.380871,
    longitude: -1.4701,
  };

  const initialRegion: Region = {
    latitude: inputLocation.latitude,
    longitude: inputLocation.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async () => {
      const coordinate: Coordinate = {
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
      };

      const fetchedCity = await getCityFromCoordinates(coordinate);
      setCity(fetchedCity);
    };

    fetchCity();
  }, [currentRegion]);

  const { markers, loading, error } = useMarkers();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMarkerData, setSelectedMarkerData] = useState<CustomMarkerProps | null>(null);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
        showsPointsOfInterest={false}
        userInterfaceStyle={'light'}
        showsCompass={false}
      >
        <MarkerManager
          markers={markers}
          mapRef={mapRef}
          bottomSheetRef={bottomSheetRef}
          setSelectedMarkerData={setSelectedMarkerData} selectedMarkerData={null} />
        <SafeAreaView style={[styles.headerContainer, [SHADOWS.containerShadow]]}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={TEXT.h1}>{city?.toLocaleLowerCase()}</Text>
            <MapFiltersDropdown />
          </View>
        </SafeAreaView>
      </MapView>
      <MarkerDetailsSheet bottomSheetRef={bottomSheetRef} selectedMarkerData={selectedMarkerData} />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.s,
  },
});

export default Map;